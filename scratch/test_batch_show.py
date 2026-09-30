import subprocess
import time
import re

t0 = time.time()
hashes = subprocess.check_output('git rev-list --all', shell=True, text=True).strip().split()
print(f"Total hashes: {len(hashes)}")

cmd = ['git', '--no-pager', 'show', '--shortstat', '--format=HASH:%H'] + hashes
res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
t1 = time.time()
print(f"git show on all 244 commits took {t1-t0:.2f} seconds!")
print(f"Output lines: {len(res.stdout.splitlines())}")

# Write to scratch/complete_shortstat.txt
with open('scratch/complete_shortstat.txt', 'w', encoding='utf-8') as f:
    f.write(res.stdout)
print("Saved to scratch/complete_shortstat.txt")
