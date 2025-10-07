import { useState } from 'react';
import PhaserGame from '@/components/PhaserGame';
import PortfolioOverlay from '@/components/PortfolioOverlay';

const Index = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const handleZoneTrigger = (zone: string) => {
    setActiveZone(zone);
  };

  const handleCloseOverlay = () => {
    setActiveZone(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary arcade-glow mb-2">
          PAC-PORT
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Sai Manish Ananthula's Interactive Portfolio
        </p>
      </header>

      <div className="w-full max-w-4xl">
        <PhaserGame onZoneTrigger={handleZoneTrigger} />
      </div>

      <div className="mt-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>🕹️ Arrow Keys to Move</span>
          <span>⏸️ Press P to Pause</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Navigate Pac-Man into the colored zones to explore my portfolio!
          <br />
          <span className="text-accent">Green = About</span> • 
          <span className="text-secondary"> Magenta = Projects</span> • 
          <span className="text-accent"> Cyan = Contact</span>
        </p>
      </div>

      <PortfolioOverlay zone={activeZone} onClose={handleCloseOverlay} />
    </div>
  );
};

export default Index;
