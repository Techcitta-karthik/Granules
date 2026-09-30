import subprocess
from datetime import datetime, timezone, timedelta

IST = timezone(timedelta(hours=5, minutes=30))

git_cmd = 'git log --all --shortstat --pretty=format:"COMMIT:%H|%an|%ae|%ad|%s" --date=iso-strict'
raw = subprocess.check_output(git_cmd, shell=True, text=True, encoding='utf-8')

commits = {}
current_commit = None

for line in raw.splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith('COMMIT:'):
        parts = line[7:].split('|', 4)
        h = parts[0]
        name = parts[1]
        email = parts[2]
        iso_date = parts[3]
        subj = parts[4] if len(parts) > 4 else ""
        
        c_name = name
        if 'karthik' in name.lower() or 'karthik' in email.lower():
            c_name = 'Techcitta-karthik'
        elif 'gopi' in email.lower() or 'ginjarapu' in name.lower():
            c_name = 'ginjarapu77'
        elif 'bharath' in name.lower() or 'bharath' in email.lower():
            c_name = 'bharath-techcitta'
        elif 'mac' in name.lower() or 'mac' in email.lower():
            c_name = 'MAC'
            
        current_commit = {
            'hash': h,
            'name': c_name,
            'email': email,
            'date_str': iso_date,
            'subject': subj,
            'files_changed': 0,
            'insertions': 0,
            'deletions': 0
        }
        commits[h] = current_commit
    elif current_commit is not None:
        # line like: " 5 files changed, 102 insertions(+), 23 deletions(-)"
        import re
        m_files = re.search(r'(\d+)\s+file', line)
        m_ins = re.search(r'(\d+)\s+insertion', line)
        m_del = re.search(r'(\d+)\s+deletion', line)
        if m_files:
            current_commit['files_changed'] = int(m_files.group(1))
        if m_ins:
            current_commit['insertions'] = int(m_ins.group(1))
        if m_del:
            current_commit['deletions'] = int(m_del.group(1))

print(f"Total unique commits parsed: {len(commits)}")

dev_stats = {}
for c in commits.values():
    d = c['name']
    if d not in dev_stats:
        dev_stats[d] = {'commits': 0, 'files': 0, 'insertions': 0, 'deletions': 0}
    dev_stats[d]['commits'] += 1
    dev_stats[d]['files'] += c['files_changed']
    dev_stats[d]['insertions'] += c['insertions']
    dev_stats[d]['deletions'] += c['deletions']

for d, s in dev_stats.items():
    net = s['insertions'] - s['deletions']
    print(f"Dev: {d:20} | Commits: {s['commits']:4} | Files: {s['files']:5} | +Lines: {s['insertions']:8} | -Lines: {s['deletions']:8} | Net: {net:8}")
