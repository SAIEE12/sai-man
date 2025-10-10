import { Button } from './ui/button';
import { Card } from './ui/card';

interface ZoneModalProps {
  zoneName: string;
  onOpen: () => void;
  onContinue: () => void;
}

const ZoneModal = ({ zoneName, onOpen, onContinue }: ZoneModalProps) => {
  const getZoneDisplayName = (zone: string) => {
    switch (zone) {
      case 'basic-details':
        return 'Basic Details';
      case 'projects':
        return 'Projects';
      case 'experience':
        return 'Experience';
      case 'skills':
        return 'Skills';
      case 'contact':
        return 'Contact';
      default:
        return 'Zone';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-11/12 max-w-md p-6 arcade-border text-center">
        <h2 className="text-2xl font-bold text-primary arcade-glow mb-4">
          {getZoneDisplayName(zoneName)}
        </h2>
        <p className="text-foreground mb-6">
          Would you like to view the details or continue playing?
        </p>
        <div className="flex flex-col gap-3">
          <Button
            onClick={onOpen}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Open Details
          </Button>
          <Button
            onClick={onContinue}
            variant="outline"
            className="w-full h-12 arcade-border hover:bg-accent"
          >
            Continue Playing
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ZoneModal;
