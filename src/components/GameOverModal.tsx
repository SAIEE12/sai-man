import { useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Skull, RotateCcw } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal = ({ score, onRestart }: GameOverModalProps) => {
  // Save high score to localStorage
  useEffect(() => {
    const currentHigh = parseInt(localStorage.getItem('saiman-high-score') || '0', 10);
    if (score > currentHigh) {
      localStorage.setItem('saiman-high-score', score.toString());
    }
  }, [score]);

  const highScore = parseInt(localStorage.getItem('saiman-high-score') || '0', 10);
  const isNewRecord = score > 0 && score >= highScore;

  const handleRestart = () => {
    // Dispatch resume event to unblock Phaser before restart
    window.dispatchEvent(new CustomEvent('restartGame'));
    onRestart();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-11/12 max-w-md p-8 arcade-border text-center space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Skull className="w-16 h-16 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
          <h2 className="text-4xl font-bold text-red-500 font-mono tracking-widest"
            style={{ textShadow: '0 0 20px rgba(239,68,68,0.8)' }}>
            GAME OVER
          </h2>
        </div>

        <div className="space-y-2">
          <p className="text-lg text-muted-foreground font-mono">
            Process terminated by ghost collision
          </p>
          <div className="flex justify-center gap-8 pt-2">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Score</p>
              <p className="text-2xl font-bold text-primary font-mono arcade-glow">
                {score.toString().padStart(6, '0')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">High Score</p>
              <p className="text-2xl font-bold text-yellow-400 font-mono">
                {Math.max(score, highScore).toString().padStart(6, '0')}
              </p>
            </div>
          </div>
          {isNewRecord && (
            <p className="text-yellow-400 font-bold text-sm font-mono animate-pulse arcade-glow">
              🏆 NEW HIGH SCORE!
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleRestart}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono tracking-widest arcade-glow"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            RESTART
          </Button>
          <p className="text-[11px] text-gray-600 font-mono">
            Press <span className="text-primary">R</span> to restart anytime
          </p>
        </div>
      </Card>
    </div>
  );
};

export default GameOverModal;
