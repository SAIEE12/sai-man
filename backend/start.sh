#!/bin/bash
# Convenience script to start the FastAPI dev server

cd "$(dirname "$0")"

if [ ! -d ".venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv .venv
fi

source .venv/bin/activate
pip install -r requirements.txt --quiet

echo "Starting SAI-MAN backend on http://localhost:8000"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
