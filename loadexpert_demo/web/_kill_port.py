import os
import signal
import subprocess

PORT = 8010
out = subprocess.run(["netstat", "-ano"], capture_output=True, text=True).stdout
pids = set()
for line in out.splitlines():
    if f":{PORT} " in line and "LISTENING" in line:
        pids.add(int(line.split()[-1]))
for pid in pids:
    try:
        os.kill(pid, signal.SIGTERM)
        print("killed", pid)
    except Exception as e:
        print("skip", pid, e)
if not pids:
    print("no listener on", PORT)
