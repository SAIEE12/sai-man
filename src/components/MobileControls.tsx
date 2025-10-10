import { useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';

interface MobileControlsProps {
  onDirectionPress: (direction: 'up' | 'down' | 'left' | 'right') => void;
  isPaused: boolean;
  onPauseToggle: () => void;
}

const MobileControls = ({ onDirectionPress, isPaused, onPauseToggle }: MobileControlsProps) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > 30) {
          onDirectionPress(deltaX > 0 ? 'right' : 'left');
          touchStartX = touchEndX;
          touchStartY = touchEndY;
        }
      } else {
        if (Math.abs(deltaY) > 30) {
          onDirectionPress(deltaY > 0 ? 'down' : 'up');
          touchStartX = touchEndX;
          touchStartY = touchEndY;
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartX = 0;
      touchStartY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onDirectionPress, isMobile]);

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="relative w-40 h-40 sm:w-52 sm:h-52">
        {/* Up */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 active:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
          onTouchStart={() => onDirectionPress('up')}
        >
          <ChevronUp className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
        </Button>
        
        {/* Down */}
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 active:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
          onTouchStart={() => onDirectionPress('down')}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
        </Button>
        
        {/* Left */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 active:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
          onTouchStart={() => onDirectionPress('left')}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
        </Button>
        
        {/* Right */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 active:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
          onTouchStart={() => onDirectionPress('right')}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
        </Button>

        {/* Center Pause/Play Button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-red-500 active:bg-red-600 rounded-full flex items-center justify-center transition-colors touch-manipulation shadow-lg"
          onTouchStart={onPauseToggle}
        >
          {isPaused ? (
            <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" />
          ) : (
            <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MobileControls;
