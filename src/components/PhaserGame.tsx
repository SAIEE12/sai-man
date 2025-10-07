import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import BootScene from '../game/scenes/BootScene';
import PreloadScene from '../game/scenes/PreloadScene';
import PlayScene from '../game/scenes/PlayScene';

interface PhaserGameProps {
  onZoneTrigger: (zone: string) => void;
}

const PhaserGame = ({ onZoneTrigger }: PhaserGameProps) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 640,
      height: 416,
      parent: gameRef.current,
      backgroundColor: '#0a0a1a',
      scene: [BootScene, PreloadScene, PlayScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    phaserGameRef.current = new Phaser.Game(config);

    // Listen for portfolio zone events
    const handlePortfolioZone = (event: Event) => {
      const customEvent = event as CustomEvent;
      onZoneTrigger(customEvent.detail.zone);
    };

    window.addEventListener('portfolioZone', handlePortfolioZone);

    return () => {
      window.removeEventListener('portfolioZone', handlePortfolioZone);
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [onZoneTrigger]);

  return (
    <div
      ref={gameRef}
      className="arcade-border rounded-lg overflow-hidden"
      style={{ maxWidth: '640px', margin: '0 auto' }}
    />
  );
};

export default PhaserGame;
