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
import KeyboardHint from '@/components/KeyboardHint';

// DevOps & Terminal Additions
import TerminalOverlay from '@/components/TerminalOverlay';
import LogStreamHUD from '@/components/LogStreamHUD';
import PipelineHUD from '@/components/PipelineHUD';

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
  const [isIntroDismissed, setIsIntroDismissed] = useState(() => {
    return !!localStorage.getItem('saiman-visited');
  });

  // DevOps & Recruiter Modes
  const [mode, setMode] = useState<'devops' | 'recruiter'>(() => {
    return (localStorage.getItem('saiman-mode') as 'devops' | 'recruiter') || 'devops';
  });
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('saiman-mode', mode);
  }, [mode]);

  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  // Global key listener for terminal toggle (T)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Do not open if user is filling form inputs or text areas
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
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
    setIsIntroDismissed(true);
    localStorage.setItem('saiman-visited', 'true');
    // Game starts automatically
  };

  const handleViewResume = () => {
    setIsIntroDismissed(true);
    localStorage.setItem('saiman-visited', 'true');
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
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans">
      {!isIntroDismissed && (
        <IntroModal onStartGame={handleStartGame} onViewResume={handleViewResume} />
      )}
      
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
              {!isMobile && isIntroDismissed && <KeyboardHint />}
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
        <PortfolioOverlay zone={activeZone} onClose={handleCloseOverlay} mode={mode} />
      </div>

      {/* Desktop Music Toggle */}
      {!isMobile && <MusicToggle isMuted={isMusicMuted} onToggle={handleMusicToggle} />}

      {/* Contact Button */}
      <Button
        onClick={handleContactClick}
        variant="outline"
        size="sm"
        className="fixed top-2 left-20 sm:top-4 sm:left-24 px-4 py-2 sm:px-6 sm:py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm sm:text-base rounded-lg shadow-lg transition-all z-50 font-mono"
      >
        Contact
      </Button>

      {/* Mode Toggle Button */}
      <Button
        onClick={() => setMode(prev => prev === 'devops' ? 'recruiter' : 'devops')}
        variant="outline"
        size="sm"
        className={`fixed top-2 left-44 sm:top-4 sm:left-52 px-4 py-2 sm:px-6 sm:py-2 ${
          mode === 'devops' 
            ? 'bg-cyan-500 hover:bg-cyan-600 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
            : 'bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
        } text-white text-sm sm:text-base rounded-lg transition-all z-50 font-mono`}
      >
        {mode === 'devops' ? 'Mode: DevOps' : 'Mode: Recruiter'}
      </Button>

      {/* Interactive Command Terminal */}
      <TerminalOverlay 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
        mode={mode} 
        onModeChange={setMode} 
      />

      {/* Real-time Game Log Stream HUD */}
      <LogStreamHUD />

      {/* Simulated Server Deployment Telemetry HUD */}
      <PipelineHUD isOverlayOpen={activeZone !== null} />
    </div>
  );
};

export default Index;
