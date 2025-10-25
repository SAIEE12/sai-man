import { useState, useEffect } from 'react';
import PhaserGame from '@/components/PhaserGame';
import PortfolioOverlay from '@/components/PortfolioOverlay';
import IntroModal from '@/components/IntroModal';
import MobileControls from '@/components/MobileControls';
import GameHUD from '@/components/GameHUD';
import MusicToggle from '@/components/MusicToggle';
import ZoneModal from '@/components/ZoneModal';
import VisitorCounter from '@/components/VisitorCounter';
import WinModal from '@/components/WinModal';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isMusicMuted, setIsMusicMuted] = useState(() => {
    const saved = localStorage.getItem('saiman-music-muted');
    return saved ? JSON.parse(saved) : false;
  });
  const [isPaused, setIsPaused] = useState(false);
  const [pendingZone, setPendingZone] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  useEffect(() => {
    const handleGameStats = (event: Event) => {
      const customEvent = event as CustomEvent;
      setScore(customEvent.detail.score);
      setLives(customEvent.detail.lives);
    };

    const handleGameWin = (event: Event) => {
      const customEvent = event as CustomEvent;
      setScore(customEvent.detail.score);
      setShowWinModal(true);
    };

    window.addEventListener('gameStats', handleGameStats);
    window.addEventListener('gameWin', handleGameWin);
    return () => {
      window.removeEventListener('gameStats', handleGameStats);
      window.removeEventListener('gameWin', handleGameWin);
    };
  }, []);

  const handleZoneTrigger = (zone: string) => {
    if (isMobile) {
      setPendingZone(zone);
    } else {
      setActiveZone(zone);
    }
  };

  const handleCloseOverlay = () => {
    setActiveZone(null);
    setPendingZone(null);
  };

  const handleOpenZoneDetails = () => {
    if (pendingZone) {
      setActiveZone(pendingZone);
      setPendingZone(null);
      setIsPaused(true);
      window.dispatchEvent(new CustomEvent('pauseGame'));
    }
  };

  const handleContinuePlaying = () => {
    setPendingZone(null);
  };

  const handleMusicToggle = () => {
    setIsMusicMuted(!isMusicMuted);
    window.dispatchEvent(new CustomEvent('toggleMusic', { detail: { muted: !isMusicMuted } }));
  };

  const handlePauseToggle = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    window.dispatchEvent(new CustomEvent(newPausedState ? 'pauseGame' : 'resumeGame'));
  };

  const handleStartGame = () => {
    // Game starts automatically
  };

  const handleViewResume = () => {
    setActiveZone('basic-details');
  };

  const handleMobileDirection = (direction: 'up' | 'down' | 'left' | 'right') => {
    console.log('📱 Mobile direction pressed:', direction);
    const event = new CustomEvent('mobileControl', { 
      detail: { direction },
      bubbles: true 
    });
    window.dispatchEvent(event);
  };

  const handleContactClick = () => {
    setActiveZone('contact');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <IntroModal onStartGame={handleStartGame} onViewResume={handleViewResume} />
      
      {/* Zone Modal for Mobile */}
      {pendingZone && (
        <ZoneModal
          zoneName={pendingZone}
          onOpen={handleOpenZoneDetails}
          onContinue={handleContinuePlaying}
        />
      )}

      {/* Win Modal */}
      {showWinModal && (
        <WinModal score={score} onClose={() => setShowWinModal(false)} />
      )}

      {/* Visitor Counter */}
      <VisitorCounter />
      
      <div className="flex flex-col lg:flex-row min-h-screen w-full">
        {/* Game Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-4xl">
            <GameHUD score={score} lives={lives} />
            <div className="relative w-full" style={{ aspectRatio: '20/13' }}>
              <PhaserGame onZoneTrigger={handleZoneTrigger} />
            </div>
            {isMobile && (
              <div className="flex justify-center mt-4 gap-4">
                <MusicToggle isMuted={isMusicMuted} onToggle={handleMusicToggle} isMobile />
              </div>
            )}
            <MobileControls 
              onDirectionPress={handleMobileDirection}
              isPaused={isPaused}
              onPauseToggle={handlePauseToggle}
            />
          </div>
        </div>

        {/* Portfolio Overlay */}
        <PortfolioOverlay zone={activeZone} onClose={handleCloseOverlay} />
      </div>

      {/* Desktop Music Toggle */}
      {!isMobile && <MusicToggle isMuted={isMusicMuted} onToggle={handleMusicToggle} />}

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
