import { useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface MobileControlsProps {
  onDirectionPress: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

const MobileControls = ({ onDirectionPress }: MobileControlsProps) => {
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
    <div className="fixed bottom-8 right-8 z-40 grid grid-cols-3 gap-2 w-48 h-48">
      <div className="col-start-2">
        <Button
          variant="outline"
          size="icon"
          className="w-full h-full arcade-border bg-background/80 backdrop-blur"
          onTouchStart={() => onDirectionPress('up')}
        >
          <ChevronUp className="h-8 w-8 text-primary" />
        </Button>
      </div>
      
      <div className="col-start-1 row-start-2">
        <Button
          variant="outline"
          size="icon"
          className="w-full h-full arcade-border bg-background/80 backdrop-blur"
          onTouchStart={() => onDirectionPress('left')}
        >
          <ChevronLeft className="h-8 w-8 text-primary" />
        </Button>
      </div>

      <div className="col-start-3 row-start-2">
        <Button
          variant="outline"
          size="icon"
          className="w-full h-full arcade-border bg-background/80 backdrop-blur"
          onTouchStart={() => onDirectionPress('right')}
        >
          <ChevronRight className="h-8 w-8 text-primary" />
        </Button>
      </div>

      <div className="col-start-2 row-start-3">
        <Button
          variant="outline"
          size="icon"
          className="w-full h-full arcade-border bg-background/80 backdrop-blur"
          onTouchStart={() => onDirectionPress('down')}
        >
          <ChevronDown className="h-8 w-8 text-primary" />
        </Button>
      </div>
    </div>
  );
};

export default MobileControls;
