import subprocess
import datetime
import os
import re
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.chart import PieChart, BarChart, Reference, Series
from openpyxl.drawing.image import Image as OpenpyxlImage
from openpyxl.utils import get_column_letter

def auto_fit_columns(ws, max_scan_rows=40):
    for col_idx in range(1, ws.max_column + 1):
        col_letter = get_column_letter(col_idx)
        max_len = 0
        for r in range(1, min(ws.max_row + 1, max_scan_rows)):
            cell = ws.cell(row=r, column=col_idx)
            v = cell.value
            if v is not None:
                lines = str(v).split('\n')
                line_max = max(len(l) for l in lines)
                if line_max > max_len:
                    max_len = line_max
        ws.column_dimensions[col_letter].width = min(max(max_len + 3, 11), 60)

IST = datetime.timezone(datetime.timedelta(hours=5, minutes=30))

print("Step 1: Reading git commit metadata...", flush=True)
# Get commit metadata
meta_cmd = 'git --no-pager log --all --pretty=format:"%H|%h|%an|%ae|%ad|%D|%s" --date=iso-strict'
raw_meta = subprocess.check_output(meta_cmd, shell=True, text=True, encoding='utf-8').strip().split('\n')

commits_map = {}
for line in raw_meta:
    parts = line.split('|')
    if len(parts) < 7:
        continue
    h, short_h, author, email, date_str, refs = parts[0], parts[1], parts[2].strip(), parts[3].strip(), parts[4], parts[5].strip()
    msg = '|'.join(parts[6:]).strip()
    
    # Canonical developer name
    c_author = author
    low_a = author.lower()
    low_e = email.lower()
    if 'karthik' in low_a or 'karthik' in low_e:
        c_author = 'Techcitta-karthik'
    elif 'gopi' in low_e or 'ginjarapu' in low_a:
        c_author = 'ginjarapu77'
    elif 'bharath' in low_a or 'bharath' in low_e:
        c_author = 'bharath-techcitta'
    elif 'mac' in low_a or 'mac' in low_e:
        c_author = 'MAC'
        
    dt = datetime.datetime.fromisoformat(date_str).astimezone(IST)
    commits_map[h] = {
        'hash': h,
        'short_hash': short_h,
        'author': c_author,
        'raw_author': author,
        'email': email,
        'date_str': date_str,
        'dt': dt,
        'day': dt.strftime('%Y-%m-%d'),
        'time': dt.strftime('%H:%M:%S'),
        'refs': refs if refs else 'branch/internal',
        'msg': msg,
        'files_changed': 0,
        'insertions': 0,
        'deletions': 0
    }

print(f"Loaded metadata for {len(commits_map)} commits.", flush=True)

print("Step 2: Reading git diff stat (lines added / deleted)...", flush=True)
with open('scratch/complete_244_stats.txt', 'r', encoding='utf-8', errors='replace') as f:
    raw_stat = f.read().splitlines()

curr_h = None
for sline in raw_stat:
    sline = sline.strip()
    if not sline:
        continue
    if sline.startswith('HASH:'):
        curr_h = sline[5:].strip()
    elif curr_h and curr_h in commits_map:
        m_files = re.search(r'(\d+)\s+file', sline)
        m_ins = re.search(r'(\d+)\s+insertion', sline)
        m_del = re.search(r'(\d+)\s+deletion', sline)
        if m_files:
            commits_map[curr_h]['files_changed'] = int(m_files.group(1))
        if m_ins:
            commits_map[curr_h]['insertions'] = int(m_ins.group(1))
        if m_del:
            commits_map[curr_h]['deletions'] = int(m_del.group(1))

all_commits = sorted(commits_map.values(), key=lambda x: x['dt'])
print(f"Processed diff statistics for {len(all_commits)} commits.", flush=True)

# Step 3: Compute Daily Work Sessions and Active Hours
def compute_work_hours(commits_list):
    # Group commits by day
    days = {}
    for c in commits_list:
        d = c['day']
        if d not in days:
            days[d] = []
        days[d].append(c)
        
    day_summaries = []
    total_active_hours = 0.0
    total_span_hours = 0.0
    
    for d in sorted(days.keys()):
        day_c = sorted(days[d], key=lambda x: x['dt'])
        first_c = day_c[0]
        last_c = day_c[-1]
        span_sec = (last_c['dt'] - first_c['dt']).total_seconds()
        span_hr = round(span_sec / 3600.0, 1)
        
        # Session based active time calculation
        # Baseline 1.0 hr per day. If commits span time, gap <= 2.5h is continuous, gap > 2.5h starts new 0.5h session
        active_sec = 3600.0 # initial 1 hour
        if len(day_c) > 1:
            active_sec = 0.0
            for i in range(len(day_c)):
                if i == 0:
                    active_sec += 1800.0 # 30 min initial
                else:
                    gap = (day_c[i]['dt'] - day_c[i-1]['dt']).total_seconds()
                    if gap <= 9000: # <= 2.5h
                        active_sec += gap
                    else:
                        active_sec += 1800.0 # new 30 min session
            active_sec = max(3600.0, active_sec) # at least 1 hr
            
        active_hr = round(min(span_hr + 1.0, active_sec / 3600.0), 1)
        if span_hr == 0:
            active_hr = 1.0
            
        total_active_hours += active_hr
        total_span_hours += span_hr
        
        day_ins = sum(c['insertions'] for c in day_c)
        day_del = sum(c['deletions'] for c in day_c)
        day_files = sum(c['files_changed'] for c in day_c)
        
        # Branches & sample msgs
        b_set = set(c['refs'] for c in day_c if c['refs'] and c['refs'] != 'branch/internal')
        b_str = ', '.join(list(b_set)[:2]) if b_set else 'feature/internal'
        msgs = ' | '.join(list(dict.fromkeys(c['msg'] for c in day_c if c['msg']))[:3])
        
        day_summaries.append({
            'day': d,
            'commits_count': len(day_c),
            'start_time': first_c['time'],
            'end_time': last_c['time'],
            'active_hours': active_hr,
            'span_hours': span_hr,
            'insertions': day_ins,
            'deletions': day_del,
            'net_lines': day_ins - day_del,
            'files_changed': day_files,
            'branches': b_str,
            'tasks': msgs,
            'commits': day_c
        })
        
    return {
        'total_active_hours': round(total_active_hours, 1),
        'total_span_hours': round(total_span_hours, 1),
        'active_days_count': len(days),
        'days': day_summaries
    }

# Group commits by developer
dev_commits = {}
for c in all_commits:
    dev = c['author']
    if dev not in dev_commits:
        dev_commits[dev] = []
    dev_commits[dev].append(c)

dev_stats = {}
for dev, c_list in dev_commits.items():
    work = compute_work_hours(c_list)
    tot_ins = sum(c['insertions'] for c in c_list)
    tot_del = sum(c['deletions'] for c in c_list)
    tot_files = sum(c['files_changed'] for c in c_list)
    
    first_dt = c_list[0]['dt'].strftime('%Y-%m-%d %H:%M:%S')
    last_dt = c_list[-1]['dt'].strftime('%Y-%m-%d %H:%M:%S')
    email = c_list[0]['email']
    
    dev_stats[dev] = {
        'name': dev,
        'email': email,
        'commits_count': len(c_list),
        'active_days': work['active_days_count'],
        'active_hours': work['total_active_hours'],
        'span_hours': work['total_span_hours'],
        'insertions': tot_ins,
        'deletions': tot_del,
        'net_lines': tot_ins - tot_del,
        'files_changed': tot_files,
        'first_commit': first_dt,
        'last_commit': last_dt,
        'daily_breakdown': work['days'],
        'commits': c_list
    }

# Sort developers by commits / hours
sorted_devs = sorted(dev_stats.values(), key=lambda x: x['commits_count'], reverse=True)
grand_active_hours = sum(d['active_hours'] for d in sorted_devs)
grand_span_hours = sum(d['span_hours'] for d in sorted_devs)
grand_commits = sum(d['commits_count'] for d in sorted_devs)
grand_insertions = sum(d['insertions'] for d in sorted_devs)
grand_deletions = sum(d['deletions'] for d in sorted_devs)
grand_net_lines = grand_insertions - grand_deletions

print("\n--- DEVELOPER SUMMARY TABLE ---")
for d in sorted_devs:
    pct = (d['active_hours'] / grand_active_hours) * 100.0
    print(f"Dev: {d['name']:20} | Commits: {d['commits_count']:4} | Hours: {d['active_hours']:5.1f} ({pct:4.1f}%) | +Lines: {d['insertions']:8} | -Lines: {d['deletions']:8} | Net: {d['net_lines']:8}")

# Step 4: Generate Updated Matplotlib Visual Dashboard
print("\nStep 4: Generating Matplotlib Charts (Developer lines of code & hours)...")
fig, axes = plt.subplots(2, 2, figsize=(18, 12), dpi=300)
fig.patch.set_facecolor('#0d1117')

colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6']

# 1. Pie Chart: Work Hours by Developer
ax1 = axes[0, 0]
ax1.set_facecolor('#0d1117')
hours_data = [d['active_hours'] for d in sorted_devs]
labels_hours = [f"{d['name']}\n{d['active_hours']}h ({d['active_hours']/grand_active_hours*100:.1f}%)" for d in sorted_devs]
wedges, texts, autotexts = ax1.pie(
    hours_data, labels=labels_hours, autopct='%1.1f%%', startangle=140,
    colors=colors, textprops=dict(color="white", fontsize=10, weight='bold'),
    wedgeprops=dict(width=0.45, edgecolor='#1f2937', linewidth=2)
)
for at in autotexts:
    at.set_color('#111827')
    at.set_fontsize(9)
ax1.set_title("Active Coding Hours Share by Developer\n(Total: 150.8 hrs)", fontsize=13, weight='bold', color='#f3f4f6', pad=15)

# 2. Bar Chart: Lines of Code Added (+) vs Deleted (-)
ax2 = axes[0, 1]
ax2.set_facecolor('#161b22')
dev_names = [d['name'] for d in sorted_devs]
x_indices = range(len(dev_names))
bar_width = 0.35

ins_vals = [d['insertions'] for d in sorted_devs]
del_vals = [d['deletions'] for d in sorted_devs]

b1 = ax2.bar([x - bar_width/2 for x in x_indices], ins_vals, bar_width, label='Lines Added (+)', color='#10b981', edgecolor='#059669')
b2 = ax2.bar([x + bar_width/2 for x in x_indices], del_vals, bar_width, label='Lines Deleted (-)', color='#ef4444', edgecolor='#dc2626')

ax2.set_title("Pushed Code Volume: Lines Added vs Deleted", fontsize=13, weight='bold', color='#f3f4f6', pad=15)
ax2.set_xticks(x_indices)
ax2.set_xticklabels(dev_names, color='#f3f4f6', fontsize=10, weight='bold')
ax2.tick_params(colors='#9ca3af', which='both')
ax2.yaxis.set_major_formatter(ticker.FuncFormatter(lambda y, _: f'{int(y):,}'))
ax2.grid(color='#374151', linestyle='--', linewidth=0.5, alpha=0.7, axis='y')
ax2.legend(facecolor='#1f2937', edgecolor='#374151', labelcolor='white')

for rect in b1:
    h = rect.get_height()
    if h > 0:
        ax2.annotate(f"+{h:,}", (rect.get_x() + rect.get_width()/2, h),
                     textcoords="offset points", xytext=(0, 4), ha='center', fontsize=8, color='#34d399', weight='bold')
for rect in b2:
    h = rect.get_height()
    if h > 0:
        ax2.annotate(f"-{h:,}", (rect.get_x() + rect.get_width()/2, h),
                     textcoords="offset points", xytext=(0, 4), ha='center', fontsize=8, color='#f87171', weight='bold')

# 3. Bar Chart: Commits & Active Days per Developer
ax3 = axes[1, 0]
ax3.set_facecolor('#161b22')
commits_vals = [d['commits_count'] for d in sorted_devs]
b3 = ax3.bar(dev_names, commits_vals, color='#3b82f6', width=0.5, edgecolor='#2563eb')
ax3.set_title("Total Pushed Commits by Developer (244 Total)", fontsize=13, weight='bold', color='#f3f4f6', pad=15)
ax3.tick_params(colors='#9ca3af', which='both')
ax3.set_xticks(range(len(dev_names)))
ax3.set_xticklabels(dev_names, color='#f3f4f6', fontsize=10, weight='bold')
ax3.grid(color='#374151', linestyle='--', linewidth=0.5, alpha=0.7, axis='y')
for rect in b3:
    h = rect.get_height()
    ax3.annotate(f"{int(h)} commits", (rect.get_x() + rect.get_width()/2, h),
                 textcoords="offset points", xytext=(0, 4), ha='center', fontsize=9, color='#60a5fa', weight='bold')

# 4. Horizontal Bar Chart: Net Code Contribution
ax4 = axes[1, 1]
ax4.set_facecolor('#161b22')
net_vals = [d['net_lines'] for d in sorted_devs]
y_indices = range(len(dev_names))
b4 = ax4.barh(y_indices, net_vals, color='#8b5cf6', height=0.45, edgecolor='#7c3aed')
ax4.set_yticks(y_indices)
ax4.set_yticklabels(dev_names, color='#f3f4f6', fontsize=10, weight='bold')
ax4.set_title("Net Code Added (Insertions - Deletions)", fontsize=13, weight='bold', color='#f3f4f6', pad=15)
ax4.tick_params(colors='#9ca3af', which='both')
ax4.xaxis.set_major_formatter(ticker.FuncFormatter(lambda x, _: f'{int(x):,} lines'))
ax4.grid(color='#374151', linestyle='--', linewidth=0.5, alpha=0.7, axis='x')
for rect in b4:
    w = rect.get_width()
    ax4.annotate(f" {w:,} lines", (w, rect.get_y() + rect.get_height()/2),
                 va='center', ha='left', fontsize=9, color='#c084fc', weight='bold')

plt.tight_layout(pad=3.0)
chart_img_path = 'granules_developer_visual_dashboard.png'
plt.savefig(chart_img_path, facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()
print(f"Saved visualization image: {chart_img_path}")

# Step 5: Build Comprehensive Excel Workbook with Separate Developer Sheets
print("\nStep 5: Generating Excel Workbook with Separate Developer Sheets...")
wb = Workbook()

# Colors and styles
DARK_HEADER = PatternFill(start_color="0A2540", end_color="0A2540", fill_type="solid")
TEAL_HEADER = PatternFill(start_color="0E7490", end_color="0E7490", fill_type="solid")
BLUE_CARD = PatternFill(start_color="1E3A8A", end_color="1E3A8A", fill_type="solid")
GREEN_CARD = PatternFill(start_color="065F46", end_color="065F46", fill_type="solid")
PURPLE_CARD = PatternFill(start_color="4C1D95", end_color="4C1D95", fill_type="solid")
ORANGE_CARD = PatternFill(start_color="78350F", end_color="78350F", fill_type="solid")

ZEBRA_FILL = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
WHITE_FILL = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")
TOTAL_FILL = PatternFill(start_color="E2E8F0", end_color="E2E8F0", fill_type="solid")

FONT_TITLE = Font(name="Calibri", size=16, bold=True, color="0A2540")
FONT_SUBTITLE = Font(name="Calibri", size=11, italic=True, color="475569")
FONT_SECTION = Font(name="Calibri", size=13, bold=True, color="0E7490")
FONT_HEADER = Font(name="Calibri", size=10, bold=True, color="FFFFFF")
FONT_BOLD = Font(name="Calibri", size=10, bold=True, color="0F172A")
FONT_REGULAR = Font(name="Calibri", size=10, color="1E293B")
FONT_CODE = Font(name="Consolas", size=9, color="0F172A")
FONT_CARD_TITLE = Font(name="Calibri", size=9, bold=True, color="CBD5E1")
FONT_CARD_NUM = Font(name="Calibri", size=18, bold=True, color="FFFFFF")

BORDER_THIN = Border(
    left=Side(style='thin', color='CBD5E1'),
    right=Side(style='thin', color='CBD5E1'),
    top=Side(style='thin', color='CBD5E1'),
    bottom=Side(style='thin', color='CBD5E1')
)
BORDER_TOTAL = Border(
    top=Side(style='thin', color='0F172A'),
    bottom=Side(style='double', color='0F172A')
)

# ----------------- SHEET 1: Team Overview & Visual Dashboard -----------------
ws_overview = wb.active
ws_overview.title = "Team Overview & Dashboard"
ws_overview.views.sheetView[0].showGridLines = True

ws_overview.merge_cells("A1:K1")
ws_overview["A1"] = "GRANULES INDIA WEBSITE — PROJECT CODE & WORK AUDIT (SORTED BY DEVELOPER)"
ws_overview["A1"].font = FONT_TITLE
ws_overview["A1"].alignment = Alignment(horizontal="left", vertical="center")

ws_overview.merge_cells("A2:K2")
ws_overview["A2"] = f"Repository Inception: 2026-08-26 15:16 IST | Analyzed: 244 Commits across All Branches | Cutoff: 2026-09-30 23:45 IST"
ws_overview["A2"].font = FONT_SUBTITLE

# KPI Cards
kpi_data = [
    ("TOTAL COMMITS", f"{grand_commits}", BLUE_CARD, "B4:C5"),
    ("EST. ACTIVE HOURS", f"{grand_active_hours:.1f} hrs", GREEN_CARD, "D4:E5"),
    ("TOTAL LINES ADDED (+)", f"{grand_insertions:,}", PURPLE_CARD, "F4:G5"),
    ("NET CODE BASE LINES", f"{grand_net_lines:,}", ORANGE_CARD, "H4:I5")
]

for title, val, fill, rng in kpi_data:
    tl, br = rng.split(':')
    ws_overview.merge_cells(rng)
    cell = ws_overview[tl]
    cell.value = f"{title}\n{val}"
    cell.fill = fill
    cell.font = FONT_CARD_NUM
    cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

# Table 1: Developer Comparison Table
ws_overview["A7"] = "1. DEVELOPER WORK & CODE CONTRIBUTION SUMMARY (SORTED BY COMMITS / ACTIVITY)"
ws_overview["A7"].font = FONT_SECTION

headers_overview = [
    "Developer Name", "Email Address", "Commits Pushed", "Active Days",
    "Est. Active Hours", "Share of Hours (%)", "Lines Added (+)", "Lines Deleted (-)",
    "Net Lines Changed", "Files Changed", "Active Date Range"
]

for col_idx, h in enumerate(headers_overview, 1):
    c = ws_overview.cell(row=8, column=col_idx, value=h)
    c.fill = DARK_HEADER
    c.font = FONT_HEADER
    c.alignment = Alignment(horizontal="center", vertical="center")

row_idx = 9
for d in sorted_devs:
    pct = round((d['active_hours'] / grand_active_hours) * 100.0, 1)
    date_rng = f"{d['first_commit'][:10]} to {d['last_commit'][:10]}"
    row_vals = [
        d['name'], d['email'], d['commits_count'], d['active_days'],
        d['active_hours'], f"{pct}%", d['insertions'], d['deletions'],
        d['net_lines'], d['files_changed'], date_rng
    ]
    fill = ZEBRA_FILL if row_idx % 2 == 0 else WHITE_FILL
    for col_idx, val in enumerate(row_vals, 1):
        c = ws_overview.cell(row=row_idx, column=col_idx, value=val)
        c.fill = fill
        c.font = FONT_REGULAR
        c.border = BORDER_THIN
        if col_idx in [3, 4, 5, 7, 8, 9, 10]:
            c.alignment = Alignment(horizontal="right")
        elif col_idx in [6, 11]:
            c.alignment = Alignment(horizontal="center")
        else:
            c.alignment = Alignment(horizontal="left")
    row_idx += 1

# Grand Total Row
total_vals = [
    "TOTAL TEAM", "All Contributors", grand_commits, 36,
    grand_active_hours, "100.0%", grand_insertions, grand_deletions,
    grand_net_lines, sum(d['files_changed'] for d in sorted_devs), "2026-08-26 to 2026-09-30"
]
for col_idx, val in enumerate(total_vals, 1):
    c = ws_overview.cell(row=row_idx, column=col_idx, value=val)
    c.fill = TOTAL_FILL
    c.font = FONT_BOLD
    c.border = BORDER_TOTAL
    if col_idx in [3, 4, 5, 7, 8, 9, 10]:
        c.alignment = Alignment(horizontal="right")
    elif col_idx in [6, 11]:
        c.alignment = Alignment(horizontal="center")
    else:
        c.alignment = Alignment(horizontal="left")

# Add Native Excel Pie Chart for Work Hours
chart_pie = PieChart()
chart_pie.title = "Developer Active Hours Distribution"
labels_ref = Reference(ws_overview, min_col=1, min_row=9, max_row=8+len(sorted_devs))
data_ref = Reference(ws_overview, min_col=5, min_row=8, max_row=8+len(sorted_devs))
chart_pie.add_data(data_ref, titles_from_data=True)
chart_pie.set_categories(labels_ref)
chart_pie.width = 16
chart_pie.height = 10
ws_overview.add_chart(chart_pie, "B16")

# Add Native Excel Bar Chart for Lines Added
chart_bar = BarChart()
chart_bar.title = "Lines of Code Pushed (Insertions vs Deletions)"
chart_bar.type = "col"
chart_bar.y_axis.title = "Lines of Code"
data_lines = Reference(ws_overview, min_col=7, min_row=8, max_col=8, max_row=8+len(sorted_devs))
chart_bar.add_data(data_lines, titles_from_data=True)
chart_bar.set_categories(labels_ref)
chart_bar.width = 18
chart_bar.height = 10
ws_overview.add_chart(chart_bar, "I16")

# Embed Matplotlib Dashboard Image
if os.path.exists(chart_img_path):
    img = OpenpyxlImage(chart_img_path)
    img.width = 1100
    img.height = 730
    ws_overview.add_image(img, "A35")

# Auto-adjust column widths for Overview
auto_fit_columns(ws_overview)

# ----------------- CREATE SEPARATE SHEETS FOR EACH DEVELOPER -----------------
for dev_info in sorted_devs:
    dev_name = dev_info['name']
    print(f"Building dedicated sheet for {dev_name}...")
    ws_dev = wb.create_sheet(title=dev_name[:31]) # Excel sheet title max 31 chars
    ws_dev.views.sheetView[0].showGridLines = True
    
    # Title
    ws_dev.merge_cells("A1:J1")
    ws_dev["A1"] = f"DEVELOPER WORK & PUSHED CODE AUDIT — {dev_name.upper()}"
    ws_dev["A1"].font = FONT_TITLE
    
    ws_dev.merge_cells("A2:J2")
    ws_dev["A2"] = f"Email: {dev_info['email']} | Active Days: {dev_info['active_days']} | Total Commits: {dev_info['commits_count']} | Active Hours: {dev_info['active_hours']}h"
    ws_dev["A2"].font = FONT_SUBTITLE
    
    # Developer KPI Cards
    dev_kpis = [
        ("TOTAL COMMITS", f"{dev_info['commits_count']}", BLUE_CARD, "B4:C5"),
        ("ACTIVE CODING HOURS", f"{dev_info['active_hours']} hrs", GREEN_CARD, "D4:E5"),
        ("LINES ADDED (+)", f"{dev_info['insertions']:,}", PURPLE_CARD, "F4:G5"),
        ("LINES DELETED (-)", f"{dev_info['deletions']:,}", ORANGE_CARD, "H4:I5")
    ]
    for title, val, fill, rng in dev_kpis:
        tl, br = rng.split(':')
        ws_dev.merge_cells(rng)
        cell = ws_dev[tl]
        cell.value = f"{title}\n{val}"
        cell.fill = fill
        cell.font = FONT_CARD_NUM
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        
    # Section 1: Daily Work Log
    ws_dev["A7"] = f"1. CHRONOLOGICAL WORK SESSIONS & DAILY TIMINGS ({dev_name})"
    ws_dev["A7"].font = FONT_SECTION
    
    day_headers = [
        "Date", "Commits Count", "First Commit Time (IST)", "Last Commit Time (IST)",
        "Active Work Hours", "Daily Span (Hrs)", "Lines Added (+)", "Lines Deleted (-)",
        "Net Lines", "Branches", "Primary Tasks Completed"
    ]
    for col_idx, h in enumerate(day_headers, 1):
        c = ws_dev.cell(row=8, column=col_idx, value=h)
        c.fill = TEAL_HEADER
        c.font = FONT_HEADER
        c.alignment = Alignment(horizontal="center", vertical="center")
        
    r_idx = 9
    for d_log in dev_info['daily_breakdown']:
        fill = ZEBRA_FILL if r_idx % 2 == 0 else WHITE_FILL
        row_vals = [
            d_log['day'], d_log['commits_count'], d_log['start_time'], d_log['end_time'],
            d_log['active_hours'], d_log['span_hours'], d_log['insertions'], d_log['deletions'],
            d_log['net_lines'], d_log['branches'], d_log['tasks']
        ]
        for col_idx, val in enumerate(row_vals, 1):
            c = ws_dev.cell(row=r_idx, column=col_idx, value=val)
            c.fill = fill
            c.font = FONT_REGULAR
            c.border = BORDER_THIN
            if col_idx in [2, 5, 6, 7, 8, 9]:
                c.alignment = Alignment(horizontal="right")
            elif col_idx in [1, 3, 4]:
                c.alignment = Alignment(horizontal="center")
            else:
                c.alignment = Alignment(horizontal="left")
        r_idx += 1
        
    # Day total row
    dev_tot_vals = [
        "TOTAL", dev_info['commits_count'], "-", "-",
        dev_info['active_hours'], dev_info['span_hours'], dev_info['insertions'], dev_info['deletions'],
        dev_info['net_lines'], "-", "All tasks combined"
    ]
    for col_idx, val in enumerate(dev_tot_vals, 1):
        c = ws_dev.cell(row=r_idx, column=col_idx, value=val)
        c.fill = TOTAL_FILL
        c.font = FONT_BOLD
        c.border = BORDER_TOTAL
        if col_idx in [2, 5, 6, 7, 8, 9]:
            c.alignment = Alignment(horizontal="right")
        elif col_idx in [1, 3, 4]:
            c.alignment = Alignment(horizontal="center")
        else:
            c.alignment = Alignment(horizontal="left")
            
    # Section 2: Full Commit-by-Commit Code Audit
    r_idx += 3
    ws_dev.cell(row=r_idx, column=1, value=f"2. COMPLETE PUSHED COMMITS & CODE DIFF LOG ({len(dev_info['commits'])} Commits)").font = FONT_SECTION
    r_idx += 1
    
    commit_headers = [
        "#", "Commit Hash", "Date (IST)", "Time (IST)", "Branch / Target Ref",
        "Files Changed", "Lines Added (+)", "Lines Deleted (-)", "Net Code Changed", "Pushed Commit Message"
    ]
    for col_idx, h in enumerate(commit_headers, 1):
        c = ws_dev.cell(row=r_idx, column=col_idx, value=h)
        c.fill = DARK_HEADER
        c.font = FONT_HEADER
        c.alignment = Alignment(horizontal="center", vertical="center")
        
    r_idx += 1
    for c_idx, commit in enumerate(dev_info['commits'], 1):
        fill = ZEBRA_FILL if r_idx % 2 == 0 else WHITE_FILL
        net_c = commit['insertions'] - commit['deletions']
        c_vals = [
            c_idx, commit['short_hash'], commit['day'], commit['time'], commit['refs'],
            commit['files_changed'], commit['insertions'], commit['deletions'], net_c, commit['msg']
        ]
        for col_idx, val in enumerate(c_vals, 1):
            c = ws_dev.cell(row=r_idx, column=col_idx, value=val)
            c.fill = fill
            c.font = FONT_CODE if col_idx == 2 else FONT_REGULAR
            c.border = BORDER_THIN
            if col_idx in [1, 6, 7, 8, 9]:
                c.alignment = Alignment(horizontal="right")
            elif col_idx in [2, 3, 4]:
                c.alignment = Alignment(horizontal="center")
            else:
                c.alignment = Alignment(horizontal="left")
        r_idx += 1
        
    # Auto-adjust column widths
    auto_fit_columns(ws_dev)

# ----------------- SHEET: All Commits Master Log -----------------
ws_all = wb.create_sheet(title="All Commits Master Log")
ws_all.views.sheetView[0].showGridLines = True
ws_all.merge_cells("A1:K1")
ws_all["A1"] = "REPOSITORY MASTER COMMIT LOG (ALL 244 COMMITS ACROSS ALL BRANCHES)"
ws_all["A1"].font = FONT_TITLE

master_headers = [
    "#", "Commit Hash", "Developer", "Date (IST)", "Time (IST)", "Branch / Target Ref",
    "Files Changed", "Lines Added (+)", "Lines Deleted (-)", "Net Code Changed", "Commit Message"
]
for col_idx, h in enumerate(master_headers, 1):
    c = ws_all.cell(row=3, column=col_idx, value=h)
    c.fill = DARK_HEADER
    c.font = FONT_HEADER
    c.alignment = Alignment(horizontal="center", vertical="center")

r_idx = 4
for c_idx, commit in enumerate(all_commits, 1):
    fill = ZEBRA_FILL if r_idx % 2 == 0 else WHITE_FILL
    net_c = commit['insertions'] - commit['deletions']
    c_vals = [
        c_idx, commit['short_hash'], commit['author'], commit['day'], commit['time'],
        commit['refs'], commit['files_changed'], commit['insertions'], commit['deletions'],
        net_c, commit['msg']
    ]
    for col_idx, val in enumerate(c_vals, 1):
        c = ws_all.cell(row=r_idx, column=col_idx, value=val)
        c.fill = fill
        c.font = FONT_CODE if col_idx == 2 else FONT_REGULAR
        c.border = BORDER_THIN
        if col_idx in [1, 7, 8, 9, 10]:
            c.alignment = Alignment(horizontal="right")
        elif col_idx in [2, 4, 5]:
            c.alignment = Alignment(horizontal="center")
        else:
            c.alignment = Alignment(horizontal="left")
    r_idx += 1

auto_fit_columns(ws_all)

excel_out = "granules_project_developer_reports.xlsx"
wb.save(excel_out)
print(f"Generated comprehensive Excel workbook: {excel_out}")

# Step 6: Generate Individual CSV for each developer and Master Visual CSV
print("\nStep 6: Generating Developer-Specific CSVs...")
for dev_info in sorted_devs:
    d_name = dev_info['name']
    csv_fname = f"granules_work_{d_name}.csv"
    with open(csv_fname, 'w', encoding='utf-8') as f:
        f.write(f"DEVELOPER WORK & CODE REPORT: {d_name}\n")
        f.write(f"Email,{dev_info['email']}\n")
        f.write(f"Total Commits,{dev_info['commits_count']}\n")
        f.write(f"Active Coding Hours,{dev_info['active_hours']}\n")
        f.write(f"Total Span Hours,{dev_info['span_hours']}\n")
        f.write(f"Lines Added (+),{dev_info['insertions']}\n")
        f.write(f"Lines Deleted (-),{dev_info['deletions']}\n")
        f.write(f"Net Lines Changed,{dev_info['net_lines']}\n")
        f.write(f"Active Date Range,{dev_info['first_commit']} to {dev_info['last_commit']}\n\n")
        
        f.write("--- 1. DAILY SESSIONS LOG ---\n")
        f.write("Date,Commits Count,Start Time (IST),End Time (IST),Active Work Hours,Daily Span (Hrs),Lines Added,Lines Deleted,Net Lines,Branches,Primary Tasks\n")
        for d_log in dev_info['daily_breakdown']:
            f.write(f'"{d_log["day"]}",{d_log["commits_count"]},"{d_log["start_time"]}","{d_log["end_time"]}",{d_log["active_hours"]},{d_log["span_hours"]},{d_log["insertions"]},{d_log["deletions"]},{d_log["net_lines"]},"{d_log["branches"]}","{d_log["tasks"].replace(chr(34), chr(39))}"\n')
            
        f.write("\n--- 2. ALL PUSHED COMMITS ---\n")
        f.write("#,Commit Hash,Date (IST),Time (IST),Branch / Target Ref,Files Changed,Lines Added (+),Lines Deleted (-),Net Code Changed,Commit Message\n")
        for idx, c in enumerate(dev_info['commits'], 1):
            net = c['insertions'] - c['deletions']
            clean_msg = c['msg'].replace('"', "'")
            f.write(f'{idx},"{c["short_hash"]}","{c["day"]}","{c["time"]}","{c["refs"]}",{c["files_changed"]},{c["insertions"]},{c["deletions"]},{net},"{clean_msg}"\n')
    print(f"Generated {csv_fname}")

# Generate Combined Sorted Visual CSV
csv_combined = "granules_project_by_developer_visual.csv"
with open(csv_combined, 'w', encoding='utf-8') as f:
    f.write("=" * 100 + "\n")
    f.write("GRANULES INDIA WEBSITE - DEVELOPER CODE & WORK HOURS REPORT (SORTED BY DEVELOPER)\n")
    f.write("=" * 100 + "\n\n")
    
    f.write("--- 1. DEVELOPER SUMMARY & CODE LINES ---\n")
    f.write("Developer,Email,Commits,Active Days,Active Hours,Hours Share (%),VISUAL HOURS BAR,Lines Added (+),Lines Deleted (-),Net Lines Changed\n")
    for d in sorted_devs:
        pct = round((d['active_hours'] / grand_active_hours) * 100.0, 1)
        bar_len = int(round(pct / 4))
        bar_str = "[" + "█" * bar_len + "░" * (25 - bar_len) + f"] {pct}%"
        f.write(f'"{d["name"]}","{d["email"]}",{d["commits_count"]},{d["active_days"]},{d["active_hours"]},"{pct}%","{bar_str}",{d["insertions"]},{d["deletions"]},{d["net_lines"]}\n')
    f.write(f'"TOTAL TEAM","",244,36,{grand_active_hours},"100.0%","[█████████████████████████] 100%",{grand_insertions},{grand_deletions},{grand_net_lines}\n\n')
    
    for d in sorted_devs:
        f.write(f"--- DEVELOPER: {d['name']} ({d['commits_count']} Commits, {d['active_hours']}h, +{d['insertions']:,} / -{d['deletions']:,} Lines) ---\n")
        f.write("#,Commit Hash,Date (IST),Time (IST),Branch,Files Changed,Lines Added (+),Lines Deleted (-),Net Lines,Commit Message\n")
        for idx, c in enumerate(d['commits'], 1):
            net = c['insertions'] - c['deletions']
            clean_msg = c['msg'].replace('"', "'")
            f.write(f'{idx},"{c["short_hash"]}","{c["day"]}","{c["time"]}","{c["refs"]}",{c["files_changed"]},{c["insertions"]},{c["deletions"]},{net},"{clean_msg}"\n')
        f.write("\n")
print(f"Generated combined sorted visual CSV: {csv_combined}")
print("ALL GENERATIONS COMPLETED SUCCESSFULLY!")
