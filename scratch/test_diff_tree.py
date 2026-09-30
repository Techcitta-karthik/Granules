import subprocess
import time
import re

hashes = subprocess.check_output('git rev-list --all', shell=True, text=True).strip().split()
print(f"Total commits: {len(hashes)}", flush=True)

t0 = time.time()
results = {}

# Use git log --no-walk with --shortstat!
# git log --no-walk --shortstat --format=HASH:%H
cmd = ['git', '--no-pager', 'log', '--no-walk', '--shortstat', '--format=HASH:%H'] + hashes
res = subprocess.run(cmd, stdout=subprocess.PIPE, text=True, encoding='utf-8', errors='replace')

t1 = time.time()
print(f"git log --no-walk --shortstat finished in {t1-t0:.2f} seconds!", flush=True)
lines = res.stdout.splitlines()
print(f"Total lines: {len(lines)}")
for l in lines[:15]:
    print(l)

with open('scratch/complete_diff_tree.txt', 'w', encoding='utf-8') as f:
    f.write(res.stdout)
