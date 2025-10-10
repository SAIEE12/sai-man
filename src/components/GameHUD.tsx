interface GameHUDProps {
  score: number;
  lives: number;
}

const GameHUD = ({ score, lives }: GameHUDProps) => {
  return (
    <div className="w-full mb-2 sm:mb-4 px-2 sm:px-4">
      <div className="bg-black border-2 border-yellow-400 rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-yellow-400 font-bold text-sm sm:text-xl">SCORE</span>
          <span className="text-white font-mono text-lg sm:text-2xl">{score.toString().padStart(6, '0')}</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-yellow-400 font-bold text-sm sm:text-xl">LIVES</span>
          <div className="flex gap-1 sm:gap-2">
            {Array.from({ length: lives }).map((_, i) => (
              <div key={i} className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-1 sm:mt-2 text-gray-400 text-xs sm:text-sm">
        Press P to Pause/Resume
      </div>
    </div>
  );
};

export default GameHUD;
