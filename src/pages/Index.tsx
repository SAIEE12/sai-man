import { useState } from 'react';
import PhaserGame from '@/components/PhaserGame';
import PortfolioOverlay from '@/components/PortfolioOverlay';
import IntroModal from '@/components/IntroModal';
import MobileControls from '@/components/MobileControls';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const handleZoneTrigger = (zone: string) => {
    setActiveZone(zone);
  };

  const handleCloseOverlay = () => {
    setActiveZone(null);
    // Emit event to resume game (except for contact zone)
    if (activeZone !== 'contact') {
      window.dispatchEvent(new CustomEvent('resumeGame'));
    }
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <IntroModal onStartGame={handleStartGame} onViewResume={handleViewResume} />

      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary arcade-glow mb-2">
          SAI-MAN
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Sai Manish Ananthula's Interactive Portfolio
        </p>
      </header>

      <div className="w-full max-w-4xl relative">
        <Button
          onClick={handleContactClick}
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 z-30 arcade-border"
        >
          Contact
        </Button>
        <PhaserGame onZoneTrigger={handleZoneTrigger} />
      </div>

      <div className="mt-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>🕹️ Arrow Keys / WASD to Move</span>
          <span>⏸️ Press P to Pause</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Navigate SAI-MAN into the colored zones to explore my portfolio!
          <br />
          <span className="text-accent">Green = Details</span> • 
          <span className="text-secondary"> Magenta = Projects</span> • 
          <span className="text-accent"> Cyan = Contact</span>
        </p>
      </div>

      <MobileControls onDirectionPress={handleMobileDirection} />
      <PortfolioOverlay zone={activeZone} onClose={handleCloseOverlay} />
    </div>
  );
};

export default Index;
