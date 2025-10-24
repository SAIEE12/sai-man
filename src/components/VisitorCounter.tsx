import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Get current count from localStorage
    const currentCount = parseInt(localStorage.getItem('saiman-visitor-count') || '0', 10);
    const newCount = currentCount + 1;
    localStorage.setItem('saiman-visitor-count', newCount.toString());
    setCount(newCount);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-primary/20">
      <div className="flex items-center gap-2 text-primary-foreground">
        <Eye className="w-4 h-4" />
        <span className="text-sm font-medium">
          {count} {count === 1 ? 'person' : 'people'} visited Manish's profile
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
