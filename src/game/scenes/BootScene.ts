import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Boot scene - minimal setup
  }

  create() {
    this.scene.start('PreloadScene');
  }
}
