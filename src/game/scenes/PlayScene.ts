import Phaser from 'phaser';

interface GhostConfig {
  color: number;
  startX: number;
  startY: number;
  name: string;
}

export default class PlayScene extends Phaser.Scene {
  private player?: Phaser.GameObjects.Arc;
  private ghosts: Phaser.GameObjects.Arc[] = [];
  private pellets: Phaser.GameObjects.Arc[] = [];
  private powerPellets: Phaser.GameObjects.Arc[] = [];
  private walls: Phaser.GameObjects.Rectangle[] = [];
  private score = 0;
  private lives = 3;
  private scoreText?: Phaser.GameObjects.Text;
  private livesText?: Phaser.GameObjects.Text;
  private gameOver = false;
  private isPaused = false;
  private pauseText?: Phaser.GameObjects.Text;
  private controlsText?: Phaser.GameObjects.Text;
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

  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create maze
    this.createMaze();

    // Create player (Pac-Man)
    this.player = this.add.circle(
      this.tileSize * 1.5,
      this.tileSize * 1.5,
      12,
      0xFFD700
    );

    // Create ghosts
    this.createGhosts();

    // Create pellets
    this.createPellets();

    // Create portfolio zones
    this.createPortfolioZones();

    // UI
    this.scoreText = this.add.text(16, 16, 'SCORE: 0', {
      fontSize: '20px',
      color: '#FFD700',
      fontFamily: 'Courier New',
    });

    this.livesText = this.add.text(16, 46, 'LIVES: 3', {
      fontSize: '20px',
      color: '#FFD700',
      fontFamily: 'Courier New',
    });

    this.controlsText = this.add.text(width - 16, 16, 'Press P to Pause', {
      fontSize: '16px',
      color: '#FFD700',
      fontFamily: 'Courier New',
      align: 'right'
    });
    this.controlsText.setOrigin(1, 0);

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

    // Listen for resume game event from React
    window.addEventListener('resumeGame', this.handleResumeGame.bind(this));

    // Listen for mobile controls
    window.addEventListener('mobileControl', this.handleMobileControl.bind(this) as EventListener);

    // Animate Pac-Man mouth
    this.time.addEvent({
      delay: 100,
      callback: this.animateMouth,
      callbackScope: this,
      loop: true
    });

    // Ghost AI
    this.time.addEvent({
      delay: 2000,
      callback: this.updateGhostTargets,
      callbackScope: this,
      loop: true
    });
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
      const ghost = this.add.circle(
        config.startX * this.tileSize + this.tileSize / 2,
        config.startY * this.tileSize + this.tileSize / 2,
        12,
        config.color
      );
      (ghost as any).targetX = 0;
      (ghost as any).targetY = 0;
      (ghost as any).name = config.name;
      this.ghosts.push(ghost);
    });
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
    if (!this.player || this.isPaused) return;
    
    this.mouthAngle += 0.2 * this.mouthDirection;
    if (this.mouthAngle > 0.5 || this.mouthAngle < 0) {
      this.mouthDirection *= -1;
    }
  }

  private updateGhostTargets() {
    if (!this.player || this.isPaused) return;

    this.ghosts.forEach(ghost => {
      if (this.powerMode) {
        // Run away from player
        (ghost as any).targetX = ghost.x + (ghost.x - this.player!.x);
        (ghost as any).targetY = ghost.y + (ghost.y - this.player!.y);
      } else {
        // Chase player
        (ghost as any).targetX = this.player!.x;
        (ghost as any).targetY = this.player!.y;
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

  private handleResumeGame() {
    if (this.isPaused && this.currentZone !== 'contact') {
      this.isPaused = false;
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
    const newX = this.player.x + (velocityX * this.game.loop.delta) / 1000;
    const newY = this.player.y + (velocityY * this.game.loop.delta) / 1000;

    if (!this.checkWallCollision(newX, newY)) {
      this.player.setPosition(newX, newY);
    }

    // Rotate player based on direction
    if (this.playerDirection.x === 1) {
      this.player.rotation = 0;
    } else if (this.playerDirection.x === -1) {
      this.player.rotation = Math.PI;
    } else if (this.playerDirection.y === -1) {
      this.player.rotation = -Math.PI / 2;
    } else if (this.playerDirection.y === 1) {
      this.player.rotation = Math.PI / 2;
    }

    // Move ghosts
    this.ghosts.forEach(ghost => {
      const angle = Math.atan2(
        (ghost as any).targetY - ghost.y,
        (ghost as any).targetX - ghost.x
      );
      
      const speed = this.powerMode ? this.ghostSpeed * 0.5 : this.ghostSpeed;
      const newGhostX = ghost.x + Math.cos(angle) * speed * this.game.loop.delta / 1000;
      const newGhostY = ghost.y + Math.sin(angle) * speed * this.game.loop.delta / 1000;
      
      if (!this.checkWallCollision(newGhostX, newGhostY)) {
        ghost.setPosition(newGhostX, newGhostY);
      }
    });

    // Check pellet collection
    this.pellets = this.pellets.filter(pellet => {
      const distance = Phaser.Math.Distance.Between(
        this.player!.x,
        this.player!.y,
        pellet.x,
        pellet.y
      );
      
      if (distance < 20) {
        this.score += 10;
        this.scoreText?.setText(`SCORE: ${this.score}`);
        pellet.destroy();
        return false;
      }
      return true;
    });

    // Check power pellet collection
    this.powerPellets = this.powerPellets.filter(pellet => {
      const distance = Phaser.Math.Distance.Between(
        this.player!.x,
        this.player!.y,
        pellet.x,
        pellet.y
      );
      
      if (distance < 20) {
        this.score += 50;
        this.scoreText?.setText(`SCORE: ${this.score}`);
        this.activatePowerMode();
        pellet.destroy();
        return false;
      }
      return true;
    });

    // Check ghost collision
    this.ghosts.forEach(ghost => {
      const distance = Phaser.Math.Distance.Between(
        this.player!.x,
        this.player!.y,
        ghost.x,
        ghost.y
      );
      
      if (distance < 20) {
        if (this.powerMode) {
          // Eat ghost
          this.score += 200;
          this.scoreText?.setText(`SCORE: ${this.score}`);
          ghost.setPosition(
            9 * this.tileSize + this.tileSize / 2,
            6 * this.tileSize + this.tileSize / 2
          );
        } else {
          // Lose life
          this.loseLife();
        }
      }
    });

    // Check portfolio zones - pause game when entering zones
    this.portfolioZones.forEach(zone => {
      const distance = Phaser.Math.Distance.Between(
        this.player!.x,
        this.player!.y,
        zone.x,
        zone.y
      );
      
      if (distance < 50) {
        const zoneType = (zone as any).zoneType;
        if (this.lastZoneTriggered !== zoneType) {
          this.lastZoneTriggered = zoneType;
          this.currentZone = zoneType;
          
          // Pause game for all zones except contact (contact has special resume behavior)
          if (zoneType !== 'contact') {
            this.isPaused = true;
          }
          
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
      ghost.setFillStyle(0x0000FF);
    });

    if (this.powerModeTimer) {
      this.powerModeTimer.destroy();
    }

    this.powerModeTimer = this.time.delayedCall(10000, () => {
      this.powerMode = false;
      const colors = [0xFF0000, 0xFFB8FF, 0x00FFFF, 0xFFB852];
      this.ghosts.forEach((ghost, index) => {
        ghost.setFillStyle(colors[index]);
      });
    });
  }

  private loseLife() {
    this.lives--;
    this.livesText?.setText(`LIVES: ${this.lives}`);
    
    if (this.lives <= 0) {
      this.endGame();
    } else {
      // Reset player position
      this.player?.setPosition(
        this.tileSize * 1.5,
        this.tileSize * 1.5
      );
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
