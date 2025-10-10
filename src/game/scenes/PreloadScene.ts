import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Create simple audio using Web Audio API
    this.createAudioAssets();
    
    // Loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);
    
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px Courier New',
        color: '#FFD700'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xFFD700, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
    });
    
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
  }

  createAudioAssets() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create pellet eat sound (short beep)
    const eatBuffer = this.createBeep(audioContext, 880, 0.05);
    this.cache.audio.add('eat', eatBuffer);
    
    // Create power pellet sound (lower beep)
    const powerBuffer = this.createBeep(audioContext, 440, 0.1);
    this.cache.audio.add('powerPellet', powerBuffer);
    
    // Create ghost eaten sound (ascending)
    const ghostBuffer = this.createAscendingTone(audioContext, 440, 880, 0.2);
    this.cache.audio.add('ghostEaten', ghostBuffer);
    
    // Create death sound (descending)
    const deathBuffer = this.createDescendingTone(audioContext, 880, 220, 0.5);
    this.cache.audio.add('death', deathBuffer);
    
    // Create background music (simple melody loop)
    const bgBuffer = this.createMelody(audioContext);
    this.cache.audio.add('bgMusic', bgBuffer);
  }

  createBeep(audioContext: AudioContext, frequency: number, duration: number): AudioBuffer {
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < buffer.length; i++) {
      data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 
                Math.exp(-3 * i / buffer.length);
    }
    
    return buffer;
  }

  createAscendingTone(audioContext: AudioContext, startFreq: number, endFreq: number, duration: number): AudioBuffer {
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < buffer.length; i++) {
      const progress = i / buffer.length;
      const freq = startFreq + (endFreq - startFreq) * progress;
      data[i] = Math.sin(2 * Math.PI * freq * i / sampleRate) * (1 - progress);
    }
    
    return buffer;
  }

  createDescendingTone(audioContext: AudioContext, startFreq: number, endFreq: number, duration: number): AudioBuffer {
    const sampleRate = audioContext.sampleRate;
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < buffer.length; i++) {
      const progress = i / buffer.length;
      const freq = startFreq - (startFreq - endFreq) * progress;
      data[i] = Math.sin(2 * Math.PI * freq * i / sampleRate) * (1 - progress);
    }
    
    return buffer;
  }

  createMelody(audioContext: AudioContext): AudioBuffer {
    const sampleRate = audioContext.sampleRate;
    const duration = 4; // 4 seconds loop
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Simple melody pattern
    const notes = [523, 587, 659, 698]; // C, D, E, F
    const noteLength = sampleRate * 0.25; // Quarter note
    
    for (let i = 0; i < buffer.length; i++) {
      const noteIndex = Math.floor(i / noteLength) % notes.length;
      const freq = notes[noteIndex];
      const envelope = Math.sin(Math.PI * (i % noteLength) / noteLength);
      data[i] = Math.sin(2 * Math.PI * freq * i / sampleRate) * envelope * 0.3;
    }
    
    return buffer;
  }

  create() {
    this.scene.start('PlayScene');
  }
}
