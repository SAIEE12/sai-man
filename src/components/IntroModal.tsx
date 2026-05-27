import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Gamepad2, FileText } from 'lucide-react';

interface IntroModalProps {
  onStartGame: () => void;
  onViewResume: () => void;
}

const IntroModal = ({ onStartGame, onViewResume }: IntroModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('saiman-visited');
    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem('saiman-visited', 'true');
    }
  }, []);

  if (!isVisible) return null;

  const handleStartGame = () => {
    setIsVisible(false);
    onStartGame();
  };

  const handleViewResume = () => {
    setIsVisible(false);
    onViewResume();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="relative w-full max-w-lg m-4 p-8 arcade-border text-center">
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-primary arcade-glow mb-4">
            SAI-MAN
          </h1>
          <p className="text-xl text-foreground leading-relaxed mb-4">
            🎮 If you want to know about <span className="text-primary font-bold">Sai Manish</span>, let's play a game!
          </p>
          <p className="text-sm text-muted-foreground border-t border-border/40 pt-4 px-2 italic max-w-sm mx-auto leading-relaxed">
            "Full-stack dev building scalable APIs, React apps & DevOps pipelines at Bitsilica."
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Button
            onClick={handleStartGame}
            className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90 arcade-glow"
          >
            <Gamepad2 className="mr-2 h-6 w-6" />
            Start Game
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full h-14 text-lg arcade-border hover:bg-accent"
          >
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleViewResume}
            >
              <FileText className="mr-2 h-6 w-6" />
              View Resume
            </a>
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          This modal appears only once per browser
        </p>
      </Card>
    </div>
  );
};

export default IntroModal;
