import { useState, useEffect } from 'react';
import PhaserGame from '@/components/PhaserGame';
import PortfolioOverlay from '@/components/PortfolioOverlay';
import IntroModal from '@/components/IntroModal';
import MobileControls from '@/components/MobileControls';
import GameHUD from '@/components/GameHUD';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const handleGameStats = (event: Event) => {
      const customEvent = event as CustomEvent;
      setScore(customEvent.detail.score);
      setLives(customEvent.detail.lives);
    };

    window.addEventListener('gameStats', handleGameStats);
    return () => window.removeEventListener('gameStats', handleGameStats);
  }, []);

  const handleZoneTrigger = (zone: string) => {
    setActiveZone(zone);
  };

  const handleCloseOverlay = () => {
    setActiveZone(null);
  };

  const handleStartGame = () => {
    // Game starts automatically
  };

  const handleViewResume = () => {
    setActiveZone('basic-details');
  };

  const handleMobileDirection = (direction: 'up' | 'down' | 'left' | 'right') => {
    window.dispatchEvent(new CustomEvent('mobileControl', { detail: { direction } }));
  };

  const handleContactClick = () => {
    setActiveZone('contact');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden">
      <IntroModal onStartGame={handleStartGame} onViewResume={handleViewResume} />

      <header className="mb-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary arcade-glow mb-2">
          SAI-MAN
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Sai Manish Ananthula's Interactive Portfolio
        </p>
      </header>

      <div className="w-full flex items-start justify-center gap-4 max-w-7xl">
        {/* Game Section */}
        <div className="flex-shrink-0">
          <GameHUD score={score} lives={lives} />
          <div className="mt-2">
            <PhaserGame onZoneTrigger={handleZoneTrigger} />
          </div>
          <div className="mt-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>🕹️ Arrow Keys / WASD to Move</span>
              <span>⏸️ Press P to Pause</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Navigate SAI-MAN into the colored zones!
            </p>
          </div>
        </div>

        {/* Portfolio Panel */}
        <PortfolioOverlay zone={activeZone} onClose={handleCloseOverlay} />
      </div>

      <MobileControls onDirectionPress={handleMobileDirection} />
      
      <Button
        onClick={handleContactClick}
        variant="outline"
        size="sm"
        className="fixed top-4 right-4 z-30 arcade-border"
      >
        Contact
      </Button>
    </div>
  );
};

export default Index;
