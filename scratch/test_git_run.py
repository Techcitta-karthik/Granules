import subprocess
import os
import time

t0 = time.time()
env = os.environ.copy()
env['PAGER'] = 'cat'
env['GIT_PAGER'] = 'cat'

cmd = ['git', '--no-pager', 'log', '--all', '--shortstat', '--pretty=format:COMMIT:%H|%an|%ae|%ad|%s', '--date=iso-strict']
res = subprocess.run(
    cmd,
    stdin=subprocess.DEVNULL,
    capture_output=True,
    text=True,
    encoding='utf-8',
    errors='replace',
    env=env
)
t1 = time.time()
print(f"Subprocess finished in {t1-t0:.2f} seconds with exit code {res.returncode}")
print(f"Stdout length: {len(res.stdout)} chars, lines: {len(res.stdout.splitlines())}")
