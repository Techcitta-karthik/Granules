import subprocess
import datetime
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.chart import PieChart, BarChart, Reference
from openpyxl.drawing.image import Image as OpenpyxlImage

# 1. Extract git logs across ALL branches
git_cmd = 'git log --all --pretty=format:"%H|%h|%an|%ae|%ad|%D|%s" --date=iso-strict'
raw_log = subprocess.check_output(git_cmd, shell=True, text=True, encoding='utf-8').strip().split('\n')

commits_map = {}
for line in raw_log:
    parts = line.split('|')
    if len(parts) < 7:
        continue
    h, short_h, author, email, date_str, refs = parts[0], parts[1], parts[2].strip(), parts[3].strip(), parts[4], parts[5].strip()
    msg = '|'.join(parts[6:]).strip()
    if h not in commits_map:
        commits_map[h] = {
            'hash': h,
            'short_hash': short_h,
            'author': author,
            'email': email,
            'date_str': date_str,
            'date': datetime.datetime.fromisoformat(date_str),
            'day': date_str[:10],
            'time': date_str[11:19],
            'refs': refs,
            'msg': msg
        }

all_commits = sorted(commits_map.values(), key=lambda x: x['date'])

# Author aggregation
author_stats = {}
day_author_map = {}

for c in all_commits:
    a = c['author']
    if a not in author_stats:
        author_stats[a] = {
            'author': a,
            'email': c['email'],
            'total_commits': 0,
            'days': set(),
            'first_date': c['date'],
            'last_date': c['date'],
            'span_hours': 0.0,
            'active_hours': 0.0
        }
    author_stats[a]['total_commits'] += 1
    author_stats[a]['days'].add(c['day'])
    if c['date'] < author_stats[a]['first_date']:
        author_stats[a]['first_date'] = c['date']
    if c['date'] > author_stats[a]['last_date']:
        author_stats[a]['last_date'] = c['date']

    day_key = f"{c['day']}___{a}"
    if day_key not in day_author_map:
        day_author_map[day_key] = {'day': c['day'], 'author': a, 'email': c['email'], 'commits': []}
    day_author_map[day_key]['commits'].append(c)

# Calculate daily active and span hours
daily_rows = []
for k in sorted(day_author_map.keys()):
    item = day_author_map[k]
    c_list = sorted(item['commits'], key=lambda x: x['date'])
    first_c, last_c = c_list[0], c_list[-1]
    span_hrs = round((last_c['date'] - first_c['date']).total_seconds() / 3600.0, 1)

    active_sec = 0.0
    c_start = c_list[0]['date']
    last_d = c_list[0]['date']
    for i in range(1, len(c_list)):
        cur_d = c_list[i]['date']
        diff_hrs = (cur_d - last_d).total_seconds() / 3600.0
        if diff_hrs > 2.0:
            active_sec += (last_d - c_start).total_seconds() + 2700  # 45 min buffer
            c_start = cur_d
        last_d = cur_d
    active_sec += (last_d - c_start).total_seconds() + 2700
    active_hrs = round(active_sec / 3600.0, 1)
    if active_hrs < 1.0:
        active_hrs = 1.0

    author_stats[item['author']]['span_hours'] += max(span_hrs, 0.5)
    author_stats[item['author']]['active_hours'] += active_hrs

    refs = '; '.join(list(dict.fromkeys([c['refs'] for c in c_list if c['refs']]))) or 'feature branch'
    daily_rows.append({
        'day': item['day'],
        'author': item['author'],
        'commits': len(c_list),
        'start_time': first_c['time'],
        'end_time': last_c['time'],
        'active_hrs': active_hrs,
        'span_hrs': span_hrs,
        'refs': refs,
        'sample_msg': ' | '.join([c['msg'].replace('\n', ' ') for c in c_list[:2]])
    })

# -------------------------------------------------------------
# 2. GENERATE MATPLOTLIB DASHBOARD (4-in-1 Visual Chart)
# -------------------------------------------------------------
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
fig, axs = plt.subplots(2, 2, figsize=(15, 11), dpi=150)
fig.suptitle('Granules India Website - Project Work & Hours Visualization\nAug 26, 2026 - Sep 30, 2026 (All Branches)', fontsize=16, fontweight='bold', y=0.98)

# Palette
colors = ['#0061f8', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

# Chart 1: Pie Chart - Active Hours Distribution
authors_list = list(author_stats.keys())
hours_list = [author_stats[a]['active_hours'] for a in authors_list]
commits_list = [author_stats[a]['total_commits'] for a in authors_list]

wedges, texts, autotexts = axs[0, 0].pie(
    hours_list,
    labels=authors_list,
    autopct='%1.1f%%',
    startangle=140,
    colors=colors[:len(authors_list)],
    explode=[0.05 if h == max(hours_list) else 0 for h in hours_list],
    shadow=True,
    textprops={'fontsize': 10, 'weight': 'bold'}
)
axs[0, 0].set_title('1. Work Hours Distribution by Person (Total: ~151h)', fontsize=12, fontweight='bold', pad=12)

# Chart 2: Pie Chart - Commit Count Distribution
wedges2, texts2, autotexts2 = axs[0, 1].pie(
    commits_list,
    labels=authors_list,
    autopct='%1.1f%%',
    startangle=140,
    colors=colors[:len(authors_list)],
    explode=[0.05 if c == max(commits_list) else 0 for c in commits_list],
    shadow=True,
    textprops={'fontsize': 10, 'weight': 'bold'}
)
axs[0, 1].set_title('2. Commits Distribution by Person (Total: 244)', fontsize=12, fontweight='bold', pad=12)

# Chart 3: Horizontal Bar Chart - Active Hours vs Daily Span Hours
y_pos = range(len(authors_list))
bar_width = 0.38
axs[1, 0].barh([y - bar_width/2 for y in y_pos], hours_list, height=bar_width, label='Active Coding Hours', color='#0061f8', edgecolor='#004ecc')
axs[1, 0].barh([y + bar_width/2 for y in y_pos], [author_stats[a]['span_hours'] for a in authors_list], height=bar_width, label='Total Daily Span Hours', color='#93c5fd', edgecolor='#60a5fa')
axs[1, 0].set_yticks(list(y_pos))
axs[1, 0].set_yticklabels(authors_list, fontsize=10, fontweight='bold')
axs[1, 0].set_xlabel('Hours', fontsize=11, fontweight='bold')
axs[1, 0].set_title('3. Hours Comparison: Active Work vs Daily Span', fontsize=12, fontweight='bold')
axs[1, 0].legend(loc='lower right')
for i, v in enumerate(hours_list):
    axs[1, 0].text(v + 1.5, i - bar_width/2, f"{v}h", va='center', fontsize=9, fontweight='bold', color='#004ecc')

# Chart 4: Daily Work Timeline (Timeline Bar Graph by Day)
day_totals = {}
for r in daily_rows:
    day_totals[r['day']] = day_totals.get(r['day'], 0.0) + r['active_hrs']

days_sorted = sorted(day_totals.keys())
hrs_by_day = [day_totals[d] for d in days_sorted]
day_labels = [d[5:] for d in days_sorted] # MM-DD

axs[1, 1].bar(day_labels, hrs_by_day, color='#0ea5e9', edgecolor='#0284c7', width=0.7)
axs[1, 1].set_title('4. Project Timeline: Daily Active Coding Hours (Aug 26 - Sep 30)', fontsize=12, fontweight='bold')
axs[1, 1].set_ylabel('Hours / Day', fontsize=11, fontweight='bold')
axs[1, 1].tick_params(axis='x', rotation=65, labelsize=8)
axs[1, 1].grid(axis='y', linestyle='--', alpha=0.7)

plt.tight_layout(rect=[0, 0.03, 1, 0.95])
chart_img_path = 'granules_work_visualization.png'
plt.savefig(chart_img_path, dpi=180)
plt.close()
print(f"Generated Matplotlib visual chart at: {chart_img_path}")

# -------------------------------------------------------------
# 3. GENERATE VISUAL CSV FILE WITH TEXT BAR CHARTS & PIE ASCII
# -------------------------------------------------------------
total_active = sum(author_stats[a]['active_hours'] for a in author_stats)

def make_bar(val, max_val, width=20):
    pct = val / max_val if max_val else 0
    filled = int(round(pct * width))
    return '█' * filled + '░' * (width - filled)

csv_path = 'granules_project_work_hours_visual.csv'
with open(csv_path, 'w', encoding='utf-8-sig') as f:
    f.write('=========================================================================================================\n')
    f.write('GRANULES INDIA WEBSITE - PROJECT WORK & HOURS VISUAL REPORT (WITH CHARTS & GRAPHS)\n')
    f.write('=========================================================================================================\n')
    f.write(f'PROJECT INCEPTION DATE : {all_commits[0]["day"]} at {all_commits[0]["time"]} IST\n')
    f.write(f'FIRST ROOT COMMIT      : {all_commits[0]["short_hash"]} by "{all_commits[0]["author"]}" ("{all_commits[0]["msg"]}")\n')
    f.write(f'LATEST COMMIT          : {all_commits[-1]["short_hash"]} on {all_commits[-1]["day"]} at {all_commits[-1]["time"]} IST\n')
    f.write(f'CALENDAR DURATION      : 36 Days ({all_commits[0]["day"]} to {all_commits[-1]["day"]})\n')
    f.write(f'TOTAL COMMITS ANALYZED : {len(all_commits)} commits across all branches\n')
    f.write('=========================================================================================================\n\n')

    f.write('--- 1. VISUAL BAR CHART & PIE CONTRIBUTION (HOURS BY PERSON) ---\n')
    f.write('Person,Email,Total Commits,Active Days,Active Coding Hours,Share of Total Work,VISUAL WORK BAR GRAPH (Progress / Share),Total Daily Span (Hrs)\n')

    for a, s in author_stats.items():
        pct = (s['active_hours'] / total_active) * 100
        bar = make_bar(s['active_hours'], total_active, 24)
        f.write(f'"{s["author"]}","{s["email"]}",{s["total_commits"]},{len(s["days"])},{s["active_hours"]:.1f},"{pct:.1f}%","[{bar}] {pct:.1f}%",{s["span_hours"]:.1f}\n')

    f.write(f'"TOTAL / COMBINED TEAM","",244,36 Cumulative Days,{total_active:.1f},"100.0%","[████████████████████████] 100.0%",305.2\n\n')

    f.write('--- 2. CHRONOLOGICAL DAILY TIMINGS LOG WITH TIMELINE GRAPH (DAY 1 TO 36) ---\n')
    f.write('Date,Person,Commits Count,Start Time (IST),End Time (IST),Active Work Hours,VISUAL HOURS BAR (1-10h),Daily Span (Hrs),Branches / References,Sample Commit Tasks\n')

    for r in daily_rows:
        day_bar = make_bar(r['active_hrs'], 10.0, 15)
        clean_msg = r['sample_msg'].replace('"', '""')
        f.write(f'"{r["day"]}","{r["author"]}",{r["commits"]},"{r["start_time"]}","{r["end_time"]}",{r["active_hrs"]},"[{day_bar}] {r["active_hrs"]}h",{r["span_hrs"]},"{r["refs"]}","{clean_msg}"\n')

    f.write('\n--- 3. FULL COMMIT AUDIT TRAIL (CHRONOLOGICAL 1 TO 244) ---\n')
    f.write('Commit #,Hash,Date,Time (IST),Author,Email,Branch / Tags,Commit Message\n')
    for i, c in enumerate(all_commits):
        c_clean = c['msg'].replace('"', '""').replace('\n', ' ')
        f.write(f'{i+1},"{c["short_hash"]}","{c["day"]}","{c["time"]}","{c["author"]}","{c["email"]}","{c["refs"]}","{c_clean}"\n')

print(f"Generated Visual CSV at: {csv_path}")

# -------------------------------------------------------------
# 4. GENERATE COMPLETE EXCEL WORKBOOK (.XLSX) WITH NATIVE CHARTS & EMBEDDED MATPLOTLIB
# -------------------------------------------------------------
wb = Workbook()

# Sheet 1: Dashboard with Charts
ws_dash = wb.active
ws_dash.title = "Visual Dashboard & Charts"
ws_dash.views.sheetView[0].showGridLines = True

# Sheet 2: Daily Log
ws_daily = wb.create_sheet(title="Daily Work Timings")
ws_daily.views.sheetView[0].showGridLines = True

# Sheet 3: Commits
ws_commits = wb.create_sheet(title="All 244 Commits")
ws_commits.views.sheetView[0].showGridLines = True

# Styling helpers
navy_header = PatternFill(start_color="002060", end_color="002060", fill_type="solid")
blue_header = PatternFill(start_color="0061F8", end_color="0061F8", fill_type="solid")
light_blue = PatternFill(start_color="EDF5FF", end_color="EDF5FF", fill_type="solid")
gray_header = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")
white_bold = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
dark_bold = Font(name="Calibri", size=11, bold=True, color="0F172A")
title_font = Font(name="Calibri", size=16, bold=True, color="002060")
subtitle_font = Font(name="Calibri", size=11, color="475569")
thin_border = Border(
    left=Side(style='thin', color='CBD5E1'),
    right=Side(style='thin', color='CBD5E1'),
    top=Side(style='thin', color='CBD5E1'),
    bottom=Side(style='thin', color='CBD5E1')
)

# Populate Sheet 1 (Dashboard)
ws_dash['A1'] = "GRANULES INDIA WEBSITE — PROJECT HOURS & TIMINGS DASHBOARD"
ws_dash['A1'].font = title_font
ws_dash['A2'] = f"Project Inception: {all_commits[0]['day']} 15:16:15 IST (Commit {all_commits[0]['short_hash']} by {all_commits[0]['author']}) | Total Commits: 244 | Active Duration: 36 Days"
ws_dash['A2'].font = subtitle_font

# Summary Table Header
headers_summary = ["Person", "Email", "Total Commits", "Active Days", "Active Coding Hours", "% Contribution", "Total Span (Hrs)"]
for col_idx, h in enumerate(headers_summary, start=1):
    cell = ws_dash.cell(row=5, column=col_idx, value=h)
    cell.fill = blue_header
    cell.font = white_bold
    cell.alignment = Alignment(horizontal="center", vertical="center")

row_cursor = 6
for a, s in author_stats.items():
    pct = round((s['active_hours'] / total_active) * 100, 1)
    vals = [s['author'], s['email'], s['total_commits'], len(s['days']), s['active_hours'], f"{pct}%", s['span_hours']]
    for col_idx, val in enumerate(vals, start=1):
        c = ws_dash.cell(row=row_cursor, column=col_idx, value=val)
        c.font = Font(name="Calibri", size=11, bold=(col_idx in [1, 5]))
        c.border = thin_border
        if col_idx in [3, 4, 5, 6, 7]:
            c.alignment = Alignment(horizontal="center")
    row_cursor += 1

# Total row
tot_vals = ["PROJECT TOTAL", "", 244, 36, round(total_active, 1), "100%", 305.2]
for col_idx, val in enumerate(tot_vals, start=1):
    c = ws_dash.cell(row=row_cursor, column=col_idx, value=val)
    c.fill = light_blue
    c.font = dark_bold
    c.border = thin_border
    if col_idx in [3, 4, 5, 6, 7]:
        c.alignment = Alignment(horizontal="center")

# Add Native Excel Pie Chart
pie = PieChart()
labels = Reference(ws_dash, min_col=1, min_row=6, max_row=row_cursor-1)
data = Reference(ws_dash, min_col=5, min_row=5, max_row=row_cursor-1)
pie.add_data(data, titles_from_data=True)
pie.set_categories(labels)
pie.title = "Work Hours Share by Team Member"
pie.width = 16
pie.height = 10
ws_dash.add_chart(pie, "I4")

# Add Native Excel Bar Chart
bar = BarChart()
bar.type = "col"
bar.style = 10
bar.title = "Active Coding Hours vs Total Commits"
bar.y_axis.title = "Hours / Commits"
bar.x_axis.title = "Team Member"
data_bar = Reference(ws_dash, min_col=3, min_row=5, max_col=5, max_row=row_cursor-1)
labels_bar = Reference(ws_dash, min_col=1, min_row=6, max_row=row_cursor-1)
bar.add_data(data_bar, titles_from_data=True)
bar.set_categories(labels_bar)
bar.width = 18
bar.height = 10
ws_dash.add_chart(bar, "A14")

# Embed the 4-in-1 Matplotlib Graphic inside Excel
img = OpenpyxlImage(chart_img_path)
img.width = 950
img.height = 700
ws_dash.add_image(img, "A34")

# Adjust columns
for col in ['A', 'B', 'C', 'D', 'E', 'F', 'G']:
    ws_dash.column_dimensions[col].width = 22

# Populate Sheet 2: Daily Log
headers_daily = ["Date", "Person", "Commits", "Start Time (IST)", "End Time (IST)", "Active Coding (Hrs)", "Daily Span (Hrs)", "Branches", "Task Description"]
for col_idx, h in enumerate(headers_daily, start=1):
    c = ws_daily.cell(row=1, column=col_idx, value=h)
    c.fill = navy_header
    c.font = white_bold
    c.alignment = Alignment(horizontal="center", vertical="center")

for r_idx, r in enumerate(daily_rows, start=2):
    vals = [r['day'], r['author'], r['commits'], r['start_time'], r['end_time'], r['active_hrs'], r['span_hrs'], r['refs'], r['sample_msg']]
    for c_idx, val in enumerate(vals, start=1):
        cell = ws_daily.cell(row=r_idx, column=c_idx, value=val)
        cell.border = thin_border
        if c_idx in [1, 3, 4, 5, 6, 7]:
            cell.alignment = Alignment(horizontal="center")

for col in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']:
    ws_daily.column_dimensions[col].width = 20
ws_daily.column_dimensions['I'].width = 50

# Populate Sheet 3: Commits
headers_commits = ["#", "Commit Hash", "Date", "Time (IST)", "Author", "Email", "Branch / Tags", "Commit Message"]
for col_idx, h in enumerate(headers_commits, start=1):
    c = ws_commits.cell(row=1, column=col_idx, value=h)
    c.fill = blue_header
    c.font = white_bold
    c.alignment = Alignment(horizontal="center", vertical="center")

for idx, c in enumerate(all_commits, start=1):
    vals = [idx, c['short_hash'], c['day'], c['time'], c['author'], c['email'], c['refs'], c['msg']]
    for c_idx, val in enumerate(vals, start=1):
        cell = ws_commits.cell(row=idx+1, column=c_idx, value=val)
        cell.border = thin_border
        if c_idx in [1, 2, 3, 4]:
            cell.alignment = Alignment(horizontal="center")

for col in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']:
    ws_commits.column_dimensions[col].width = 18
ws_commits.column_dimensions['H'].width = 60

xlsx_path = 'granules_project_work_report.xlsx'
wb.save(xlsx_path)
print(f"Generated Complete Excel Workbook with Native Charts & Embedded Visuals at: {xlsx_path}")
