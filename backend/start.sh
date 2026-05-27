#!/bin/bash
# Convenience script to start the FastAPI dev server with graceful fallback

cd "$(dirname "$0")"

USE_VENV=false

# Try creating venv if it doesn't exist
if [ ! -d ".venv" ]; then
  echo "Attempting to create virtual environment..."
  python3 -m venv .venv 2>/dev/null
fi

# Check if activation script exists
if [ -f ".venv/bin/activate" ]; then
  echo "Activating virtual environment (.venv)..."
  source .venv/bin/activate
  pip install -r requirements.txt --quiet
  USE_VENV=true
else
  echo "⚠️  Virtual environment activation script not found (missing python3-venv on Ubuntu)."
  echo "🚀 Falling back to global system python installation..."
  python3 -m pip install -r requirements.txt --quiet --user 2>/dev/null || pip install -r requirements.txt --quiet
fi

echo "Starting SAI-MAN backend on http://localhost:8000"
if [ "$USE_VENV" = true ]; then
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
else
  python3 -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 2>/dev/null || uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
fi
