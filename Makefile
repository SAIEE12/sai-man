.PHONY: frontend backend dev-frontend dev-backend install

## Install all dependencies
install:
	cd frontend && npm install
	cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt

## Start frontend dev server (Vite, port 8080)
dev-frontend:
	cd frontend && npm run dev

## Start backend dev server (FastAPI, port 8000)
dev-backend:
	cd backend && bash start.sh

## Build frontend for production
build:
	cd frontend && npm run build

## Run both servers concurrently (requires tmux or two terminals)
dev:
	@echo "Open two terminals and run:"
	@echo "  make dev-frontend"
	@echo "  make dev-backend"
