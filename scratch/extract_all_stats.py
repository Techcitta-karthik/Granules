import subprocess
import time

hashes = subprocess.check_output('git rev-list --all', shell=True, text=True).strip().split()
print(f"Total commits to process: {len(hashes)}", flush=True)

all_output = []
batch_size = 20

t0 = time.time()
for i in range(0, len(hashes), batch_size):
    batch = hashes[i:i+batch_size]
    cmd = ['git', '--no-pager', 'show', '--shortstat', '--no-patch', '--format=HASH:%H'] + batch
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, encoding='utf-8', errors='replace')
    all_output.append(res.stdout)
    print(f"Processed batch {i//batch_size + 1}/{(len(hashes)+batch_size-1)//batch_size} ({len(batch)} commits)...", flush=True)

t1 = time.time()
print(f"Completed all {len(hashes)} commits in {t1-t0:.2f} seconds!", flush=True)

with open('scratch/complete_244_stats.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(all_output))

print("Successfully written to scratch/complete_244_stats.txt", flush=True)
