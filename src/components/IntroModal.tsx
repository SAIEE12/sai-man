import { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface IntroModalProps {
  onStartGame: () => void;
  onViewResume: () => void;
}

interface LogLine {
  type: 'ok' | 'warn' | 'info' | 'text';
  text: string;
}

const bootLogs: LogLine[] = [
  { type: 'info', text: 'Initializing Sai Manish OS Boot Sequence...' },
  { type: 'ok', text: 'Started CPU microcode updates.' },
  { type: 'ok', text: 'Mounted security kernel modules (/sys/kernel/security).' },
  { type: 'ok', text: 'Detected Python Runtime Engine v3.11.2.' },
  { type: 'ok', text: 'Loaded FastAPI kernel modules.' },
  { type: 'ok', text: 'Loaded React.js Frontend engine.' },
  { type: 'ok', text: 'Started PostgreSQL Database adapter.' },
  { type: 'ok', text: 'Connected Bitsilica workspace mount point.' },
  { type: 'ok', text: 'Initialized Docker daemon container manager.' },
  { type: 'warn', text: 'CI/CD pipeline webhook: SSL certification auto-bypass is active.' },
  { type: 'ok', text: 'Started Jenkins Automated Deploy Agent.' },
  { type: 'ok', text: 'Started Nginx reverse proxy service.' },
  { type: 'ok', text: 'Configured SQLAlchemy ORM mapping layers.' },
  { type: 'info', text: 'System load: 0.12, Memory usage: 4.8GB / 16.0GB.' },
  { type: 'ok', text: 'Loading Pac-Man interactive game assets...' },
  { type: 'ok', text: 'Created maze walls, pellets, and power pellets.' },
  { type: 'ok', text: 'Spawned Blinky, Pinky, Inky, and Clyde.' },
  { type: 'info', text: 'Terminal session successfully established.' },
];

const IntroModal = ({ onStartGame, onViewResume }: IntroModalProps) => {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [bootFinished, setBootFinished] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentLineIndex = 0;
    const interval = setInterval(() => {
      if (currentLineIndex < bootLogs.length) {
        setLines((prev) => [...prev, bootLogs[currentLineIndex]]);
        currentLineIndex++;
        // Keep scrolling terminal
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        clearInterval(interval);
        setBootFinished(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Listen to Enter or Escape keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && bootFinished) {
        onStartGame();
      } else if (e.key === 'Escape') {
        onViewResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootFinished, onStartGame, onViewResume]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 font-mono p-4">
      {/* Skip Hint */}
      <div className="absolute top-4 right-4 text-xs text-gray-500 hover:text-cyan-400 cursor-pointer flex items-center gap-1 z-10 transition-colors" onClick={onViewResume}>
        <span>[ ESC ] SKIP TO RESUME</span>
        <FileText className="w-3.5 h-3.5" />
      </div>

      <div className="w-full max-w-3xl bg-black border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col h-[500px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/20 bg-gray-950 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400 font-bold tracking-wider">saiman-os-boot.service</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
        </div>

        {/* Terminal Log Output */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
          {lines.map((line, idx) => (
            <div key={idx} className="text-sm leading-relaxed tracking-wide flex items-start gap-3">
              {line.type === 'ok' && (
                <span className="text-green-400 font-bold flex-shrink-0">[  OK  ]</span>
              )}
              {line.type === 'warn' && (
                <span className="text-yellow-500 font-bold flex-shrink-0">[ WARN ]</span>
              )}
              {line.type === 'info' && (
                <span className="text-cyan-400 font-bold flex-shrink-0">[ INFO ]</span>
              )}
              <span className="text-gray-300">{line.text}</span>
            </div>
          ))}

          {/* Welcome and Login Prompts */}
          {bootFinished && (
            <div className="mt-6 pt-4 border-t border-cyan-500/20 space-y-2 animate-in fade-in duration-500">
              <p className="text-cyan-400 font-bold text-base">Welcome to Sai Manish OS v1.0.0 (LTS-DevOps)!</p>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>saiman-os login:</span>
                <span className="text-green-400 font-bold">guest</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span>password:</span>
                <span className="text-gray-500">********</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400 animate-pulse mt-4">
                <span>guest@saiman-os:~$</span>
                <span className="text-white font-bold">Press [ ENTER ] or click below to log in and start...</span>
              </div>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Footer Action */}
        <div className="p-4 border-t border-cyan-500/20 bg-gray-950 rounded-b-lg flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[10px] text-gray-500">System architecture: Linux x86_64 // Node v20</span>
          {bootFinished ? (
            <Button
              onClick={onStartGame}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold tracking-widest font-mono text-sm px-6 h-10 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              LOG_IN <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <span className="text-xs text-cyan-500 animate-pulse">Booting modules...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
