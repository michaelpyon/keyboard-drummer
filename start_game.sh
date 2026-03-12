#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${1:-4173}"

cd "$ROOT_DIR"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required but not found."
  exit 1
fi

# Reuse an existing server on the same port if one is already running.
if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Using existing server on port $PORT"
else
  nohup python3 -m http.server "$PORT" >"$ROOT_DIR/.keyboard-drummer-server.log" 2>&1 &
  sleep 0.4
fi

URL="http://127.0.0.1:$PORT/index.html"
echo "Opening $URL"
open "$URL"
