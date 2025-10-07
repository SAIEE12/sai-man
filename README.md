# PAC-PORT | Interactive Pac-Man Portfolio

A unique, fully playable Pac-Man game that doubles as an interactive portfolio website for **Sai Manish Ananthula**.

![Pac-Man Portfolio](https://img.shields.io/badge/Game-Pac--Man-yellow?style=for-the-badge&logo=arcade)
![Built with Phaser](https://img.shields.io/badge/Phaser-3-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)

## 🎮 Overview

Navigate through a classic Pac-Man maze while discovering my professional experience, projects, and contact information. Move Pac-Man into special colored zones to trigger portfolio overlays!

### Features

- ✅ **Fully Playable Pac-Man Game**
  - Classic maze navigation
  - 4 AI-controlled ghosts (Blinky, Pinky, Inky, Clyde)
  - Pellets and power pellets
  - Score tracking and lives system
  - Power mode (eat ghosts when they turn blue!)

- 🎨 **Portfolio Integration**
  - **Green Zone** → About Me & Skills
  - **Magenta Zone** → Featured Projects
  - **Cyan Zone** → Contact Information

- 🕹️ **Game Mechanics**
  - Arrow keys for movement
  - Press **P** to pause/resume
  - Press **R** to restart after game over
  - Responsive design (works on desktop and mobile)

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
| **↑ ↓ ← →** | Move Pac-Man |
| **P** | Pause/Resume Game |
| **R** | Restart (after game over) |

## 🎨 Customization

### Modify Portfolio Content

Edit `src/components/PortfolioOverlay.tsx` to update:
- Your name and title
- Skills and technologies
- Project descriptions
- Contact links (GitHub, LinkedIn, Email, Resume)

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

Modify `createPortfolioZones()` to change zone positions or add new zones.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── PhaserGame.tsx        # Phaser game wrapper
│   ├── PortfolioOverlay.tsx  # Portfolio content overlays
│   └── ui/                   # Reusable UI components
├── game/
│   └── scenes/
│       ├── BootScene.ts      # Initial boot
│       ├── PreloadScene.ts   # Asset loading
│       └── PlayScene.ts      # Main game logic
├── pages/
│   └── Index.tsx             # Main page
└── index.css                 # Arcade theme styles
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

- [ ] Add sound effects and background music
- [ ] Mobile touch controls / virtual joystick
- [ ] Multiple maze levels
- [ ] High score leaderboard
- [ ] Animation improvements
- [ ] More portfolio sections

## 👨‍💻 About the Developer

**Sai Manish Ananthula**
- Full-Stack & DevOps Engineer
- Passionate about cloud technologies and automation
- Building scalable applications with modern tech stacks

### Connect

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Sai Manish Ananthula](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Lovable** • [Visit Lovable](https://lovable.dev)
