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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <IntroModal onStartGame={handleStartGame} onViewResume={handleViewResume} />
      
      <div className="flex flex-col lg:flex-row min-h-screen w-full">
        {/* Game Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-4xl">
            <GameHUD score={score} lives={lives} />
            <div className="relative w-full" style={{ aspectRatio: '20/13' }}>
              <PhaserGame onZoneTrigger={handleZoneTrigger} />
            </div>
            <MobileControls onDirectionPress={handleMobileDirection} />
          </div>
        </div>

        {/* Portfolio Overlay */}
        <PortfolioOverlay zone={activeZone} onClose={handleCloseOverlay} />
      </div>

      {/* Contact Button */}
      <Button
        onClick={handleContactClick}
        variant="outline"
        size="sm"
        className="fixed top-2 right-2 sm:top-4 sm:right-4 px-4 py-2 sm:px-6 sm:py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm sm:text-base rounded-lg shadow-lg transition-all z-50"
      >
        Contact
      </Button>
    </div>
  );
};

export default Index;
