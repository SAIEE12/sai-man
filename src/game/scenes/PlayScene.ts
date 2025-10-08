import Phaser from 'phaser';

interface GhostConfig {
  color: number;
  startX: number;
  startY: number;
  name: string;
}

export default class PlayScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Graphics;
  private ghosts: any[] = [];
  private pellets: Phaser.GameObjects.Arc[] = [];
  private powerPellets: Phaser.GameObjects.Arc[] = [];
  private walls: Phaser.GameObjects.Rectangle[] = [];
  private score = 0;
  private lives = 3;
  private gameOver = false;
  private isPaused = false;
  private pauseText?: Phaser.GameObjects.Text;
  private playerSpeed = 150;
  private ghostSpeed = 100;
  private powerMode = false;
  private powerModeTimer?: Phaser.Time.TimerEvent;
  private playerDirection = { x: 0, y: 0 };
  private tileSize = 32;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys?: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private portfolioZones: Phaser.GameObjects.Rectangle[] = [];
  private currentZone: string | null = null;
  private mouthAngle = 0;
  private mouthDirection = 1;
  private lastZoneTriggered: string | null = null;
  private playerX = 0;
  private playerY = 0;
  private ghostMode: 'scatter' | 'chase' = 'scatter';
  private ghostModeTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    // Create maze
    this.createMaze();

    // Create player (Pac-Man) with graphics for mouth animation
    this.playerX = this.tileSize * 1.5;
    this.playerY = this.tileSize * 1.5;
    this.player = this.add.graphics();
    this.drawPlayer();

    // Create ghosts
    this.createGhosts();

    // Create pellets
    this.createPellets();

    // Create portfolio zones
    this.createPortfolioZones();

    // Input - Arrow keys and WASD
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.wasdKeys = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
    
    this.input.keyboard?.on('keydown-P', () => {
      this.togglePause();
    });

    // Listen for mobile controls
    window.addEventListener('mobileControl', this.handleMobileControl.bind(this) as EventListener);

    // Animate Pac-Man mouth
    this.time.addEvent({
      delay: 100,
      callback: this.animateMouth,
      callbackScope: this,
      loop: true
    });

    // Ghost AI - toggle between scatter and chase
    this.time.addEvent({
      delay: 7000,
      callback: () => {
        this.ghostMode = this.ghostMode === 'scatter' ? 'chase' : 'scatter';
      },
      callbackScope: this,
      loop: true
    });

    // Update ghost targets frequently
    this.time.addEvent({
      delay: 500,
      callback: this.updateGhostTargets,
      callbackScope: this,
      loop: true
    });

    // Emit initial game stats
    this.emitGameStats();
  }

  private drawPlayer() {
    if (!this.player) return;
    
    this.player.clear();
    
    // Calculate rotation based on direction
    let rotation = 0;
    if (this.playerDirection.x === 1) rotation = 0;
    else if (this.playerDirection.x === -1) rotation = Math.PI;
    else if (this.playerDirection.y === -1) rotation = -Math.PI / 2;
    else if (this.playerDirection.y === 1) rotation = Math.PI / 2;

    // Draw Pac-Man with mouth animation
    this.player.fillStyle(0xFFD700, 1);
    const mouthOpen = Math.abs(this.mouthAngle) * 45; // 0 to ~22.5 degrees
    this.player.slice(this.playerX, this.playerY, 12, 
      Phaser.Math.DegToRad(mouthOpen), 
      Phaser.Math.DegToRad(360 - mouthOpen), 
      false);
    this.player.fillPath();
    this.player.setRotation(rotation);
  }

  private emitGameStats() {
    window.dispatchEvent(new CustomEvent('gameStats', {
      detail: { score: this.score, lives: this.lives }
    }));
  }

  private createMaze() {
    // Simple maze layout (1 = wall, 0 = empty)
    const maze = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,1],
      [1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,1],
      [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
      [1,0,1,1,0,1,0,1,1,0,0,1,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];

    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          const wall = this.add.rectangle(
            x * this.tileSize + this.tileSize / 2,
            y * this.tileSize + this.tileSize / 2,
            this.tileSize - 2,
            this.tileSize - 2,
            0x0000FF
          );
          this.walls.push(wall);
        }
      });
    });
  }

  private createGhosts() {
    const ghostConfigs: GhostConfig[] = [
      { color: 0xFF0000, startX: 9, startY: 5, name: 'Blinky' },
      { color: 0xFFB8FF, startX: 8, startY: 6, name: 'Pinky' },
      { color: 0x00FFFF, startX: 10, startY: 6, name: 'Inky' },
      { color: 0xFFB852, startX: 11, startY: 5, name: 'Clyde' },
    ];

    ghostConfigs.forEach(config => {
      const graphics = this.add.graphics();
      const x = config.startX * this.tileSize + this.tileSize / 2;
      const y = config.startY * this.tileSize + this.tileSize / 2;
      
      this.drawGhost(graphics, 0, 0, config.color);
      graphics.setPosition(x, y);
      
      this.ghosts.push({
        graphics,
        x,
        y,
        targetX: x,
        targetY: y,
        color: config.color,
        originalColor: config.color,
        name: config.name,
        scatterTarget: this.getScatterTarget(config.name)
      });
    });
  }

  private drawGhost(graphics: Phaser.GameObjects.Graphics, x: number, y: number, color: number) {
    graphics.clear();
    graphics.fillStyle(color, 1);
    
    // Body (semi-circle top)
    graphics.beginPath();
    graphics.arc(x, y - 2, 12, Math.PI, 0, true);
    
    // Bottom wavy part
    graphics.lineTo(12 + x, y + 8);
    graphics.lineTo(9 + x, y + 5);
    graphics.lineTo(6 + x, y + 8);
    graphics.lineTo(3 + x, y + 5);
    graphics.lineTo(0 + x, y + 8);
    graphics.lineTo(-3 + x, y + 5);
    graphics.lineTo(-6 + x, y + 8);
    graphics.lineTo(-9 + x, y + 5);
    graphics.lineTo(-12 + x, y + 8);
    graphics.lineTo(-12 + x, y - 2);
    graphics.closePath();
    graphics.fillPath();
    
    // Eyes
    graphics.fillStyle(0xFFFFFF, 1);
    graphics.fillCircle(x - 4, y - 2, 3);
    graphics.fillCircle(x + 4, y - 2, 3);
    graphics.fillStyle(0x0000FF, 1);
    graphics.fillCircle(x - 4, y - 2, 1.5);
    graphics.fillCircle(x + 4, y - 2, 1.5);
  }

  private getScatterTarget(name: string): { x: number, y: number } {
    switch (name) {
      case 'Blinky': return { x: 18 * this.tileSize, y: 1 * this.tileSize };
      case 'Pinky': return { x: 1 * this.tileSize, y: 1 * this.tileSize };
      case 'Inky': return { x: 18 * this.tileSize, y: 11 * this.tileSize };
      case 'Clyde': return { x: 1 * this.tileSize, y: 11 * this.tileSize };
      default: return { x: 10 * this.tileSize, y: 6 * this.tileSize };
    }
  }

  private createPellets() {
    for (let y = 1; y < 12; y++) {
      for (let x = 1; x < 19; x++) {
        const worldX = x * this.tileSize + this.tileSize / 2;
        const worldY = y * this.tileSize + this.tileSize / 2;
        
        // Check if position is not a wall
        const hasWall = this.walls.some(wall => 
          Math.abs(wall.x - worldX) < 5 && Math.abs(wall.y - worldY) < 5
        );
        
        if (!hasWall && Math.random() > 0.3) {
          // Power pellets at corners
          if ((x === 1 && y === 1) || (x === 18 && y === 1) || 
              (x === 1 && y === 11) || (x === 18 && y === 11)) {
            const powerPellet = this.add.circle(worldX, worldY, 8, 0xFFFFFF);
            this.powerPellets.push(powerPellet);
          } else {
            const pellet = this.add.circle(worldX, worldY, 3, 0xFFD700);
            this.pellets.push(pellet);
          }
        }
      }
    }
  }

  private createPortfolioZones() {
    // Basic details zone (top-left, green)
    const basicDetailsZone = this.add.rectangle(
      this.tileSize * 5,
      this.tileSize * 3.5,
      this.tileSize * 4,
      this.tileSize * 3,
      0x00FF00,
      0.2
    );
    (basicDetailsZone as any).zoneType = 'basic-details';
    this.portfolioZones.push(basicDetailsZone);

    // Projects zone (top-right, magenta)
    const projectsZone = this.add.rectangle(
      this.tileSize * 17,
      this.tileSize * 3.5,
      this.tileSize * 3,
      this.tileSize * 3,
      0xFF00FF,
      0.2
    );
    (projectsZone as any).zoneType = 'projects';
    this.portfolioZones.push(projectsZone);

    // Experience zone (center-left, blue)
    const experienceZone = this.add.rectangle(
      this.tileSize * 6.5,
      this.tileSize * 9.5,
      this.tileSize * 5,
      this.tileSize * 3,
      0x0000FF,
      0.2
    );
    (experienceZone as any).zoneType = 'experience';
    this.portfolioZones.push(experienceZone);

    // Skills zone (center-right, yellow)
    const skillsZone = this.add.rectangle(
      this.tileSize * 17,
      this.tileSize * 9.5,
      this.tileSize * 4,
      this.tileSize * 3,
      0xFFFF00,
      0.2
    );
    (skillsZone as any).zoneType = 'skills';
    this.portfolioZones.push(skillsZone);

    // Contact zone (bottom-center, cyan)
    const contactZone = this.add.rectangle(
      this.tileSize * 12,
      this.tileSize * 11,
      this.tileSize * 6,
      this.tileSize * 2,
      0x00FFFF,
      0.2
    );
    (contactZone as any).zoneType = 'contact';
    this.portfolioZones.push(contactZone);
  }

  private animateMouth() {
    if (!this.player || this.isPaused || this.gameOver) return;
    
    this.mouthAngle += 0.15 * this.mouthDirection;
    if (this.mouthAngle > 0.5 || this.mouthAngle < 0) {
      this.mouthDirection *= -1;
    }
    this.drawPlayer();
  }

  private updateGhostTargets() {
    if (this.isPaused || this.gameOver) return;

    this.ghosts.forEach(ghost => {
      if (this.powerMode) {
        // Run away from player
        ghost.targetX = ghost.x + (ghost.x - this.playerX);
        ghost.targetY = ghost.y + (ghost.y - this.playerY);
      } else if (this.ghostMode === 'scatter') {
        // Go to scatter corners
        ghost.targetX = ghost.scatterTarget.x;
        ghost.targetY = ghost.scatterTarget.y;
      } else {
        // Chase player with personality
        switch (ghost.name) {
          case 'Blinky': // Direct chase
            ghost.targetX = this.playerX;
            ghost.targetY = this.playerY;
            break;
          case 'Pinky': // Ambush ahead
            ghost.targetX = this.playerX + this.playerDirection.x * this.tileSize * 4;
            ghost.targetY = this.playerY + this.playerDirection.y * this.tileSize * 4;
            break;
          case 'Inky': // Patrol
            const dist = Phaser.Math.Distance.Between(ghost.x, ghost.y, this.playerX, this.playerY);
            if (dist < this.tileSize * 8) {
              ghost.targetX = this.playerX;
              ghost.targetY = this.playerY;
            } else {
              ghost.targetX = ghost.scatterTarget.x;
              ghost.targetY = ghost.scatterTarget.y;
            }
            break;
          case 'Clyde': // Random-ish
            if (Math.random() > 0.7) {
              ghost.targetX = this.playerX;
              ghost.targetY = this.playerY;
            }
            break;
        }
      }
    });
  }

  private togglePause() {
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      if (!this.pauseText) {
        this.pauseText = this.add.text(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          'PAUSED',
          {
            fontSize: '48px',
            color: '#FFD700',
            fontFamily: 'Courier New',
          }
        );
        this.pauseText.setOrigin(0.5);
      }
      this.pauseText.setVisible(true);
    } else {
      if (this.pauseText) {
        this.pauseText.setVisible(false);
      }
    }
  }


  private handleMobileControl(event: CustomEvent) {
    if (this.gameOver || this.isPaused || !this.player) return;
    
    const { direction } = event.detail;
    switch (direction) {
      case 'up':
        this.playerDirection = { x: 0, y: -1 };
        break;
      case 'down':
        this.playerDirection = { x: 0, y: 1 };
        break;
      case 'left':
        this.playerDirection = { x: -1, y: 0 };
        break;
      case 'right':
        this.playerDirection = { x: 1, y: 0 };
        break;
    }
  }

  update() {
    if (this.gameOver || this.isPaused || !this.player || !this.cursors) return;

    // Player movement - Arrow keys or WASD
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left?.isDown || this.wasdKeys?.A.isDown) {
      velocityX = -this.playerSpeed;
      this.playerDirection = { x: -1, y: 0 };
    } else if (this.cursors.right?.isDown || this.wasdKeys?.D.isDown) {
      velocityX = this.playerSpeed;
      this.playerDirection = { x: 1, y: 0 };
    }

    if (this.cursors.up?.isDown || this.wasdKeys?.W.isDown) {
      velocityY = -this.playerSpeed;
      this.playerDirection = { x: 0, y: -1 };
    } else if (this.cursors.down?.isDown || this.wasdKeys?.S.isDown) {
      velocityY = this.playerSpeed;
      this.playerDirection = { x: 0, y: 1 };
    }

    // Move player
    const newX = this.playerX + (velocityX * this.game.loop.delta) / 1000;
    const newY = this.playerY + (velocityY * this.game.loop.delta) / 1000;

    if (!this.checkWallCollision(newX, newY)) {
      this.playerX = newX;
      this.playerY = newY;
      if (this.player) {
        this.player.setPosition(this.playerX, this.playerY);
      }
    }

    // Move ghosts
    this.ghosts.forEach(ghost => {
      const angle = Math.atan2(
        ghost.targetY - ghost.y,
        ghost.targetX - ghost.x
      );
      
      const speed = this.powerMode ? this.ghostSpeed * 0.5 : this.ghostSpeed;
      const newGhostX = ghost.x + Math.cos(angle) * speed * this.game.loop.delta / 1000;
      const newGhostY = ghost.y + Math.sin(angle) * speed * this.game.loop.delta / 1000;
      
      if (!this.checkWallCollision(newGhostX, newGhostY)) {
        ghost.x = newGhostX;
        ghost.y = newGhostY;
        ghost.graphics.setPosition(newGhostX, newGhostY);
      }
    });

    // Check pellet collection
    this.pellets = this.pellets.filter(pellet => {
      const distance = Phaser.Math.Distance.Between(
        this.playerX,
        this.playerY,
        pellet.x,
        pellet.y
      );
      
      if (distance < 20) {
        this.score += 10;
        this.emitGameStats();
        pellet.destroy();
        return false;
      }
      return true;
    });

    // Check power pellet collection
    this.powerPellets = this.powerPellets.filter(pellet => {
      const distance = Phaser.Math.Distance.Between(
        this.playerX,
        this.playerY,
        pellet.x,
        pellet.y
      );
      
      if (distance < 20) {
        this.score += 50;
        this.emitGameStats();
        this.activatePowerMode();
        pellet.destroy();
        return false;
      }
      return true;
    });

    // Check ghost collision
    this.ghosts.forEach(ghost => {
      const distance = Phaser.Math.Distance.Between(
        this.playerX,
        this.playerY,
        ghost.x,
        ghost.y
      );
      
      if (distance < 20) {
        if (this.powerMode) {
          // Eat ghost
          this.score += 200;
          this.emitGameStats();
          ghost.x = 9 * this.tileSize + this.tileSize / 2;
          ghost.y = 6 * this.tileSize + this.tileSize / 2;
          ghost.graphics.setPosition(ghost.x, ghost.y);
        } else {
          // Lose life
          this.loseLife();
        }
      }
    });

    // Check portfolio zones - NO auto-pause, just trigger overlay
    this.portfolioZones.forEach(zone => {
      const distance = Phaser.Math.Distance.Between(
        this.playerX,
        this.playerY,
        zone.x,
        zone.y
      );
      
      if (distance < 50) {
        const zoneType = (zone as any).zoneType;
        if (this.lastZoneTriggered !== zoneType) {
          this.lastZoneTriggered = zoneType;
          this.currentZone = zoneType;
          this.triggerPortfolioZone(zoneType);
        }
      } else if (this.lastZoneTriggered) {
        // Reset when leaving zone area
        this.lastZoneTriggered = null;
      }
    });

    // Win condition
    if (this.pellets.length === 0 && this.powerPellets.length === 0) {
      this.winGame();
    }
  }

  private checkWallCollision(x: number, y: number): boolean {
    return this.walls.some(wall => {
      return Math.abs(wall.x - x) < this.tileSize / 2 + 10 &&
             Math.abs(wall.y - y) < this.tileSize / 2 + 10;
    });
  }

  private activatePowerMode() {
    this.powerMode = true;
    this.ghosts.forEach(ghost => {
      ghost.color = 0x0000FF;
      this.drawGhost(ghost.graphics, 0, 0, 0x0000FF);
    });

    if (this.powerModeTimer) {
      this.powerModeTimer.destroy();
    }

    this.powerModeTimer = this.time.delayedCall(10000, () => {
      this.powerMode = false;
      this.ghosts.forEach(ghost => {
        ghost.color = ghost.originalColor;
        this.drawGhost(ghost.graphics, 0, 0, ghost.originalColor);
      });
    });
  }

  private loseLife() {
    this.lives--;
    this.emitGameStats();
    
    if (this.lives <= 0) {
      this.endGame();
    } else {
      // Reset player position
      this.playerX = this.tileSize * 1.5;
      this.playerY = this.tileSize * 1.5;
      if (this.player) {
        this.player.setPosition(this.playerX, this.playerY);
      }
    }
  }

  private triggerPortfolioZone(zoneType: string) {
    // Emit custom event that will be caught by React
    window.dispatchEvent(new CustomEvent('portfolioZone', { 
      detail: { zone: zoneType } 
    }));
  }

  private winGame() {
    this.gameOver = true;
    const text = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'YOU WIN!\n\nFinal Score: ' + this.score,
      {
        fontSize: '48px',
        color: '#FFD700',
        fontFamily: 'Courier New',
        align: 'center'
      }
    );
    text.setOrigin(0.5);
  }

  private endGame() {
    this.gameOver = true;
    const text = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'GAME OVER\n\nScore: ' + this.score + '\n\nPress R to Restart',
      {
        fontSize: '48px',
        color: '#FF0000',
        fontFamily: 'Courier New',
        align: 'center'
      }
    );
    text.setOrigin(0.5);

    this.input.keyboard?.on('keydown-R', () => {
      this.scene.restart();
      this.score = 0;
      this.lives = 3;
      this.gameOver = false;
    });
  }
}
