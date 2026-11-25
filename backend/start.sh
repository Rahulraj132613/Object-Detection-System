#!/usr/bin/env bash
set -e

PORT=${PORT:-8000}
HOST=${HOST:-0.0.0.0}

echo "Starting AI Object Detection & Recognition FastAPI backend on $HOST:$PORT..."
exec uvicorn app.main:app --host "$HOST" --port "$PORT"
