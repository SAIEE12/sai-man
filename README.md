# SAI-MAN — Interactive Portfolio

> **Sai Manish Ananthula** · Python Full Stack Developer · [saimanish.vercel.app](https://saimanish.vercel.app)

An interactive **Pac-Man-style portfolio game** built with Phaser 3 + React. Navigate the maze, collect pellets, and explore my skills, experience, and projects — all while dodging `FastAPI`, `React`, `Docker`, and `Jenkins` ghosts.

---

## 📁 Project Structure

```
sai-man/
├── frontend/          # React + Phaser 3 + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # UI components (HUDs, modals, overlays)
│   │   ├── data/          # Portfolio content & DevOps data maps
│   │   ├── game/          # Phaser scenes & game logic
│   │   ├── hooks/         # Custom React hooks
│   │   └── pages/         # Index page (root orchestrator)
│   ├── public/            # Static assets (favicon, sounds, images)
│   ├── index.html
│   └── package.json
│
├── backend/           # FastAPI + Python
│   ├── app/
│   │   ├── main.py        # FastAPI app, CORS, router registration
│   │   ├── routers/       # API route handlers
│   │   │   └── contact.py # POST /api/v1/contact
│   │   ├── schemas/       # Pydantic request/response models
│   │   └── models/        # DB models (SQLAlchemy — future)
│   ├── requirements.txt
│   ├── .env.example       # Copy to .env and fill credentials
│   └── start.sh           # Quick dev server launcher
│
├── Makefile           # Convenience commands (make dev-frontend, etc.)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- Python ≥ 3.11

### Frontend (Vite dev server on port 8080)

```bash
cd frontend
npm install
npm run dev
```

### Backend (FastAPI on port 8000)

```bash
cd backend
cp .env.example .env    # fill in your SMTP credentials
bash start.sh
```

**API Docs:** http://localhost:8000/docs

### Or use the Makefile

```bash
make install        # install all dependencies
make dev-frontend   # start React/Phaser game
make dev-backend    # start FastAPI server
make build          # production build
```

---

## 🎮 How to Play

| Key | Action |
|---|---|
| `↑↓←→` / `WASD` | Move Pac-Man |
| `T` | Open DevOps terminal |
| `P` | Pause / Resume |
| `R` | Restart game |
| `ESC` | Close overlay / skip intro |

Navigate into the coloured zones to open portfolio sections. Collect all pellets to win!

---

## 🛠 Tech Stack

### Frontend
- **Phaser 3** — game engine
- **React 18 + TypeScript** — UI layer & overlays
- **Vite** — build tooling
- **Tailwind CSS + shadcn/ui** — design system

### Backend
- **FastAPI** — REST API framework
- **Pydantic v2** — data validation & schemas
- **Uvicorn** — ASGI server
- **Python 3.11+**

---

## 👨‍💻 About Manish

**Sai Manish Ananthula** — Python Full Stack Developer · Software Engineer @ Bitsilica Pvt. Ltd.

- 📧 [saimanishmail@gmail.com](mailto:saimanishmail@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/sai-manish-ananthula)
- 🐙 [GitHub](https://github.com/SAIEE12)
- 📞 +91 9959110929

## 📄 License

MIT License
