import React, { useState, useEffect } from 'react';
import { Activity, GitBranch } from 'lucide-react';

const PipelineHUD: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState(3);

  // Simulate subtle updates to visitor telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next > 0 && next < 10 ? next : prev;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 hidden md:flex flex-col w-56 bg-black/85 border border-cyan-500/30 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md font-mono text-[11px] leading-relaxed">
      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-1.5 mb-2">
        <div className="flex items-center gap-1 text-cyan-400 font-bold tracking-wider">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          <span>DEPLOYMENT PIPELINE</span>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      </div>

      <div className="space-y-1.5 text-gray-300">
        <div className="flex justify-between">
          <span className="text-gray-500">Pipeline Status:</span>
          <span className="text-green-400 font-bold px-1.5 py-0.2 bg-green-950/30 border border-green-500/30 rounded text-[9px] uppercase animate-pulse">
            Passing
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Branch:</span>
          <span className="text-cyan-400 font-bold">origin/resign_01</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Last Deploy:</span>
          <span className="text-gray-300">2 mins ago</span>
        </div>
        <div className="flex justify-between items-center border-t border-cyan-500/10 pt-1.5 mt-1.5">
          <span className="text-gray-500 flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            Active Users:
          </span>
          <span className="text-white font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            {activeUsers} online
          </span>
        </div>
      </div>
    </div>
  );
};

export default PipelineHUD;
