interface GameHUDProps {
  score: number;
  lives: number;
}

const GameHUD = ({ score, lives }: GameHUDProps) => {
  return (
    <div className="arcade-border rounded-lg p-3 bg-card">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-lg">SCORE:</span>
          <span className="text-primary arcade-glow text-2xl font-mono">
            {score.toString().padStart(6, '0')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-lg">LIVES:</span>
          <div className="flex gap-1">
            {Array.from({ length: lives }).map((_, i) => (
              <span key={i} className="text-2xl">💛</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
