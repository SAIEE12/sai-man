import React, { useState, useEffect, useRef } from 'react';

interface LogMessage {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'EVENT';
  message: string;
}

const LogStreamHUD: React.FC = () => {
  const [logs, setLogs] = useState<LogMessage[]>([
    { timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Sai Manish OS log stream initiated.' },
    { timestamp: new Date().toLocaleTimeString(), level: 'INFO', message: 'Type "T" at any time to open Devops Terminal.' }
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGameLog = (e: Event) => {
      const customEvent = e as CustomEvent<LogMessage>;
      setLogs(prev => {
        const updated = [...prev, customEvent.detail];
        // Keep only last 15 logs to prevent excessive DOM nodes
        if (updated.length > 15) {
          return updated.slice(updated.length - 15);
        }
        return updated;
      });
    };

    window.addEventListener('gameLog', handleGameLog);
    return () => window.removeEventListener('gameLog', handleGameLog);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:flex flex-col w-80 bg-black/85 border border-cyan-500/30 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md font-mono text-[11px] leading-relaxed">
      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-1.5 mb-2">
        <span className="text-cyan-400 font-bold tracking-wider">// SYSTEM LOG STREAM</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      </div>

      <div className="h-28 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-2 items-start text-gray-300">
            <span className="text-gray-500 font-semibold flex-shrink-0">[{log.timestamp}]</span>
            {log.level === 'INFO' && (
              <span className="text-cyan-400 font-bold flex-shrink-0">[INFO]</span>
            )}
            {log.level === 'WARN' && (
              <span className="text-red-400 font-bold flex-shrink-0">[WARN]</span>
            )}
            {log.level === 'EVENT' && (
              <span className="text-green-400 font-bold flex-shrink-0">[EVNT]</span>
            )}
            <span className="break-all">{log.message}</span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default LogStreamHUD;
