# SAI-MAN Portfolio | Sai Manish Ananthula

A unique, fully playable Pac-Man-style game that doubles as an interactive portfolio website for **Sai Manish Ananthula**.

![Pac-Man Portfolio](https://img.shields.io/badge/Game-Pac--Man-yellow?style=for-the-badge&logo=arcade)
![Built with Phaser](https://img.shields.io/badge/Phaser-3-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)

## 🎮 Overview

Navigate SAI-MAN through a classic Pac-Man maze while discovering my professional experience, projects, and contact information. Move SAI-MAN into special colored zones to trigger portfolio overlays! On first visit, you'll see an intro modal with options to Start Game or View Resume.

### Features

- ✅ **Fully Playable Pac-Man Game**
  - Classic maze navigation
  - 4 AI-controlled ghosts (Blinky, Pinky, Inky, Clyde)
  - Pellets and power pellets
  - Score tracking and lives system
  - Power mode (eat ghosts when they turn blue!)

- 🎨 **Portfolio Integration**
  - **Green Zone** → Basic Details & Contact Links
  - **Magenta Zone** → Featured Projects (Trackon, Management Portal, etc.)
  - **Blue Zone** → Professional Experience (Bitsilica, Aubergine, Rejolt)
  - **Yellow Zone** → Technical Skills (Languages, DevOps, Frameworks, etc.)
  - **Cyan Zone** → Contact Information (Special: resumes game from same position)

- 🕹️ **Game Mechanics**
  - Arrow keys OR WASD for movement
  - Press **P** to pause/resume
  - Press **R** to restart after game over
  - Mobile: On-screen D-pad + swipe support
  - Intro modal appears once per browser (localStorage)
  - Contact overlay resumes game from same position (no restart)

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Phaser 3** | Game engine for 2D gameplay |
| **React 18** | UI framework and overlay system |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Styling and arcade theme |
| **Lucide React** | Modern icon system |

## 📦 Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd pacman-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will be available at `http://localhost:8080`

## 🎯 Controls

| Key | Action |
|-----|--------|
| **↑ ↓ ← →** or **W A S D** | Move SAI-MAN |
| **P** | Pause/Resume Game |
| **R** | Restart (after game over) |
| **Touch/Swipe** | Mobile controls (D-pad overlay) |

## 🎨 Customization

### Modify Portfolio Content

Edit `src/components/PortfolioOverlay.tsx` to update:
- Basic details (name, location, contact info)
- Projects (add/remove project cards)
- Experience timeline
- Skills categories
- Contact links

**Note:** The intro modal uses `localStorage` with key `saiman-visited`. Clear it to see the modal again.
**Note:** The Contact zone has special behavior - it resumes the game from the same position instead of restarting.

### Adjust Game Difficulty

In `src/game/scenes/PlayScene.ts`, modify:
```typescript
private playerSpeed = 150;  // Increase for faster Pac-Man
private ghostSpeed = 100;   // Increase for harder ghosts
```

### Change Maze Layout

Edit the `createMaze()` function in `PlayScene.ts`:
```typescript
const maze = [
  [1,1,1,1,1,...], // 1 = wall, 0 = path
  [1,0,0,0,0,...],
  // ... customize your maze
];
```

### Update Portfolio Zones

Modify `createPortfolioZones()` in `src/game/scenes/PlayScene.ts` to change zone positions or add new zones.
Zone metadata can also be stored in `src/game/maps/level1.json` for easier configuration.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── PhaserGame.tsx         # Phaser game wrapper
│   ├── PortfolioOverlay.tsx   # Portfolio content overlays (5 zones)
│   ├── IntroModal.tsx         # First-visit modal
│   ├── MobileControls.tsx     # Mobile D-pad overlay
│   └── ui/                    # Reusable UI components
├── game/
│   ├── maps/
│   │   └── level1.json        # Maze layout with zone metadata
│   └── scenes/
│       ├── BootScene.ts       # Initial boot
│       ├── PreloadScene.ts    # Asset loading
│       └── PlayScene.ts       # Main game logic (WASD, pause, zones)
├── pages/
│   └── Index.tsx              # Main page
└── index.css                  # Arcade theme styles
```

## 🌐 Deployment

### Deploy to Vercel

```bash
npm run build
npx vercel --prod
```

### Deploy to Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## 🎭 Design Philosophy

The project features a **retro arcade aesthetic** with:
- Neon yellow Pac-Man (`#FFD700`)
- Colorful ghosts (Red, Pink, Cyan, Orange)
- Dark background with glowing elements
- Monospace "Courier New" font
- Smooth animations and transitions

## 📝 Future Enhancements

- [x] WASD controls
- [x] Mobile D-pad and swipe controls
- [x] Intro modal with localStorage
- [x] Five portfolio zones with detailed resume content
- [ ] Sound effects and background music
- [ ] Better ghost AI (pathfinding)
- [ ] Multiple maze levels
- [ ] High score leaderboard with persistence

## 👨‍💻 About the Developer

**Sai Manish Ananthula**
- Full-Stack & DevOps Engineer
- Passionate about cloud technologies and automation
- Building scalable applications with modern tech stacks

### Connect

- GitHub: [@SAIEE12](https://github.com/SAIEE12)
- LinkedIn: [Sai Manish Ananthula](https://www.linkedin.com/in/sai-manish-ananthula)
- Email: saimanishsai19189@gmail.com
- Phone: +91 9959110929
- LeetCode: [sai_manish](https://leetcode.com/u/sai_manish/)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Lovable** • [Visit Lovable](https://lovable.dev)
