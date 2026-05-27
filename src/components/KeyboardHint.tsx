import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const KeyboardHint = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Effect 1: Auto-fade after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Effect 2: Remove from DOM after fade animation completes
  useEffect(() => {
    if (!fadeOut) return;
    const timer = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(timer);
  }, [fadeOut]);

  // Effect 3: Immediately hide on arrow/WASD press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
      if (keys.includes(e.key.toLowerCase())) {
        setFadeOut(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Effect 4: Sequential key pulse animation
  useEffect(() => {
    const sequence = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    let index = 0;
    const interval = setInterval(() => {
      setActiveKey(sequence[index]);
      index = (index + 1) % sequence.length;
    }, 800);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const keyClass = (key: string) =>
    `flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
      activeKey === key
        ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]'
        : 'bg-black/80 text-primary'
    }`;

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-500 pointer-events-none z-20 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col items-center p-6 bg-card/95 border-2 border-primary/80 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-bounce-subtle">
        <h3 className="text-xl font-bold text-primary mb-5 arcade-glow tracking-wider">
          HOW TO PLAY
        </h3>

        <div className="flex gap-12 items-center">
          {/* WASD Column */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-3 font-semibold tracking-wider">WASD KEYS</p>
            <div className="grid grid-cols-3 gap-1 w-28">
              <div></div>
              <div className={keyClass('UP')}>W</div>
              <div></div>
              <div className={keyClass('LEFT')}>A</div>
              <div className={keyClass('DOWN')}>S</div>
              <div className={keyClass('RIGHT')}>D</div>
            </div>
          </div>

          <div className="text-primary font-bold text-lg arcade-glow">OR</div>

          {/* Arrow Keys Column */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-3 font-semibold tracking-wider">ARROW KEYS</p>
            <div className="grid grid-cols-3 gap-1 w-28">
              <div></div>
              <div className={keyClass('UP')}><ChevronUp className="w-4 h-4" /></div>
              <div></div>
              <div className={keyClass('LEFT')}><ChevronLeft className="w-4 h-4" /></div>
              <div className={keyClass('DOWN')}><ChevronDown className="w-4 h-4" /></div>
              <div className={keyClass('RIGHT')}><ChevronRight className="w-4 h-4" /></div>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-1 text-center">
          <p className="text-[10px] text-muted-foreground font-mono">
            <span className="text-primary font-bold">T</span> — Terminal &nbsp;|&nbsp;
            <span className="text-primary font-bold">P</span> — Pause &nbsp;|&nbsp;
            <span className="text-primary font-bold">R</span> — Restart
          </p>
          <p className="text-xs text-primary/80 mt-2 animate-pulse tracking-wider">
            PRESS ANY KEY TO START
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardHint;
