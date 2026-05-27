interface GameHUDProps {
  score: number;
  lives: number;
}

const GameHUD = ({ score, lives }: GameHUDProps) => {
  const highScore = parseInt(localStorage.getItem('saiman-high-score') || '0', 10);
  const displayHigh = Math.max(score, highScore);

  return (
    <div className="w-full mb-2 sm:mb-4 px-2 sm:px-4">
      <div className="bg-black border-2 border-yellow-400 rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold text-sm sm:text-xl">SCORE</span>
            <span className="text-white font-mono text-lg sm:text-2xl">{score.toString().padStart(6, '0')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400/60 font-bold text-xs sm:text-sm">BEST</span>
            <span className="text-yellow-400/80 font-mono text-sm sm:text-lg">{displayHigh.toString().padStart(6, '0')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-yellow-400 font-bold text-sm sm:text-xl">LIVES</span>
          <div className="flex gap-1 sm:gap-2">
            {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
              <div key={i} className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full" />
            ))}
            {lives === 0 && (
              <span className="text-red-500 font-mono text-sm font-bold">---</span>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm">
        Press P to Pause/Resume &nbsp;|&nbsp; T to open Terminal
      </div>
    </div>
  );
};

export default GameHUD;
