import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const KeyboardHint = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    // 1. Automatic fade out after 6 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 6000);

    // 2. Clear after fade out animation
    let clearTimer: NodeJS.Timeout;
    if (fadeOut) {
      clearTimer = setTimeout(() => {
        setVisible(false);
      }, 600);
    }

    // 3. Listen to keyboard press to immediately hide hints
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
      if (keys.includes(e.key.toLowerCase())) {
        setFadeOut(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 4. Sequential keyboard pulsing animation to simulate press
    let keyPulseInterval: NodeJS.Timeout;
    const pulseSequence = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    let index = 0;
    
    keyPulseInterval = setInterval(() => {
      setActiveKey(pulseSequence[index]);
      index = (index + 1) % pulseSequence.length;
    }, 800);

    return () => {
      clearTimeout(timer);
      if (clearTimer) clearTimeout(clearTimer);
      clearInterval(keyPulseInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fadeOut]);

  if (!visible) return null;

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
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'UP' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                W
              </div>
              <div></div>
              
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'LEFT' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                A
              </div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'DOWN' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                S
              </div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'RIGHT' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                D
              </div>
            </div>
          </div>

          <div className="text-primary font-bold text-lg arcade-glow">OR</div>

          {/* Arrow Keys Column */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-3 font-semibold tracking-wider">ARROW KEYS</p>
            <div className="grid grid-cols-3 gap-1 w-28">
              <div></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'UP' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                <ChevronUp className="w-4 h-4" />
              </div>
              <div></div>
              
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'LEFT' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'DOWN' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded border border-primary/50 text-xs font-bold transition-all duration-200 ${
                  activeKey === 'RIGHT' ? 'bg-primary text-black scale-95 shadow-[0_0_10px_#eab308]' : 'bg-black/80 text-primary'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-primary/80 mt-6 animate-pulse tracking-wider">
          PRESS ANY KEY TO START
        </p>
      </div>
    </div>
  );
};

export default KeyboardHint;
