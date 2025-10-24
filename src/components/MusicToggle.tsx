import { useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

interface MusicToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const MusicToggle = ({ isMuted, onToggle, isMobile = false }: MusicToggleProps) => {
  // Save music preference to localStorage
  useEffect(() => {
    localStorage.setItem('saiman-music-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="sm"
      className={`${
        isMobile
          ? 'w-12 h-12 sm:w-14 sm:h-14'
          : 'fixed top-2 right-20 sm:top-4 sm:right-24'
      } bg-primary/80 hover:bg-primary text-primary-foreground rounded-lg shadow-lg transition-all z-50 flex items-center justify-center`}
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
      title={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
      ) : (
        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
      )}
    </Button>
  );
};

export default MusicToggle;
