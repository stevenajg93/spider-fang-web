#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-}"
if [ -z "$PORT" ]; then
  if nc -z localhost 3001 >/dev/null 2>&1; then PORT=3001; else PORT=3000; fi
fi

EMAIL="instant-$(date +%s)@example.com"
JSON='{"name":"Spider Fang Tester","email":"'"$EMAIL"'","company":"Spider Fang","prompt":"A cinematic agency site with hero video, services grid, case studies, and a bold contact section."}'

echo "POST http://localhost:$PORT/api/generate   ($EMAIL)"
RESP="$(curl -sS -X POST "http://localhost:$PORT/api/generate" -H "Content-Type: application/json" --data "$JSON" || true)"
echo "$RESP"

python3 - <<PY
import json, os, webbrowser
data = json.loads(os.environ.get("RESP","{}"))
url = data.get("previewUrl","")
port = os.environ.get("PORT","3000")
if url and url.startswith("/"):
    url = f"http://localhost:{port}{url}"
if url:
    print("Opening:", url)
    try:
        webbrowser.open(url)
    except Exception:
        print(url)
else:
    print("No previewUrl returned.")
PY
