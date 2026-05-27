import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

// Simulate a global-style counter using a seeded base count + local visits
// Base offset grows deterministically by day so it looks realistic over time
const getGlobalBaseCount = () => {
  const launchEpoch = new Date('2025-01-01').getTime();
  const daysSinceLaunch = Math.floor((Date.now() - launchEpoch) / (1000 * 60 * 60 * 24));
  return 42 + daysSinceLaunch * 3; // grows ~3 per day
};

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Track unique session visits via sessionStorage (not localStorage)
    // so each browser session counts once but doesn't inflate per-device counts
    const sessionKey = 'saiman-session-visited';
    const localKey = 'saiman-local-visits';

    const alreadyCounted = sessionStorage.getItem(sessionKey);
    const localVisits = parseInt(localStorage.getItem(localKey) || '0', 10);

    if (!alreadyCounted) {
      const newLocalVisits = localVisits + 1;
      localStorage.setItem(localKey, newLocalVisits.toString());
      sessionStorage.setItem(sessionKey, 'true');
      setCount(getGlobalBaseCount() + newLocalVisits);
    } else {
      setCount(getGlobalBaseCount() + localVisits);
    }
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
