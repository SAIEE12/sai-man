import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal } from 'lucide-react';
import TooltipText from './TooltipText';
import { funnyContainers, fakeCommits } from '../data/devopsData';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'devops' | 'recruiter';
  onModeChange: (newMode: 'devops' | 'recruiter') => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

const TerminalOverlay: React.FC<TerminalOverlayProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on load / open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim();
    if (!cleanCmd) return;

    let output: React.ReactNode = null;
    const lowerCmd = cleanCmd.toLowerCase();

    if (lowerCmd === 'help') {
      output = (
        <div className="space-y-1 text-gray-300">
          <p className="text-cyan-400 font-bold">Available commands:</p>
          <p><span className="text-yellow-400">whoami</span>      - Display basic details</p>
          <p><span className="text-yellow-400">skills</span>      - Display grouped tech stack</p>
          <p><span className="text-yellow-400">experience</span>  - Display job history</p>
          <p><span className="text-yellow-400">projects</span>    - Display projects</p>
          <p><span className="text-yellow-400">contact</span>     - Display email, phone & social profiles</p>
          <p><span className="text-yellow-400">sudo hire-me</span> - Launch email system client</p>
          <p><span className="text-yellow-400">docker ps</span>    - Easter egg showing funny containers</p>
          <p><span className="text-yellow-400">git log --oneline</span> - Easter egg showing fake commits</p>
          <p><span className="text-yellow-400">export MODE=recruiter</span> - Switch theme to Plain English</p>
          <p><span className="text-yellow-400">export MODE=devops</span>    - Switch theme to DevOps jargon</p>
          <p><span className="text-yellow-400">clear</span>       - Clear terminal history</p>
        </div>
      );
    } else if (lowerCmd === 'whoami') {
      output = (
        <div className="space-y-2 text-gray-300">
          <p><span className="text-cyan-400 font-bold">Name:</span> Sai Manish Ananthula</p>
          <p><span className="text-cyan-400 font-bold">Role:</span> <TooltipText text="Python Full Stack Developer" mode={mode} /></p>
          <p><span className="text-cyan-400 font-bold">Location:</span> Hyderabad, India</p>
          <p className="text-justify leading-relaxed"><span className="text-cyan-400 font-bold">Profile:</span> <TooltipText text="Python Full Stack Developer at Bitsilica. Skilled in building REST APIs with FastAPI, Flask and PostgreSQL. Handled DevOps container orchestration with Docker and automated build systems with Jenkins." mode={mode} /></p>
        </div>
      );
    } else if (lowerCmd === 'skills') {
      output = (
        <div className="space-y-2 text-gray-300">
          <p className="text-cyan-400 font-bold">// Grouped skill list</p>
          <p><span className="text-yellow-400 font-bold">Backend:</span> <TooltipText text="FastAPI, Flask, Python" mode={mode} /></p>
          <p><span className="text-yellow-400 font-bold">Frontend:</span> <TooltipText text="React.js, TypeScript" mode={mode} /></p>
          <p><span className="text-yellow-400 font-bold">Databases:</span> <TooltipText text="PostgreSQL, MongoDB, SQLite, Supabase" mode={mode} /></p>
          <p><span className="text-yellow-400 font-bold">DevOps:</span> <TooltipText text="Docker, Jenkins, AWS, DigitalOcean, Nginx" mode={mode} /></p>
          <p><span className="text-yellow-400 font-bold">Auth & ORM:</span> <TooltipText text="SQLAlchemy, RBAC, RLS" mode={mode} /></p>
        </div>
      );
    } else if (lowerCmd === 'experience') {
      output = (
        <div className="space-y-4 text-gray-300 text-sm">
          <div>
            <p className="text-cyan-400 font-bold font-mono">Python Full Stack Developer @ Bitsilica (2024 - Present)</p>
            <p className="text-xs text-gray-500 font-mono">Hyderabad, India // Full-time</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 leading-relaxed text-justify">
              <li><TooltipText text="Designed and built modular REST APIs with SQLAlchemy ORM, establishing clean data access layers across multiple enterprise-grade applications." mode={mode} /></li>
              <li><TooltipText text="Managed PostgreSQL schema design and migrations with robust backend validation logic." mode={mode} /></li>
              <li><TooltipText text="Containerised application stacks with Docker and configured Jenkins CI/CD pipelines." mode={mode} /></li>
            </ul>
          </div>
        </div>
      );
    } else if (lowerCmd === 'projects') {
      output = (
        <div className="space-y-4 text-gray-300 text-sm">
          <div className="border border-cyan-500/20 p-3 rounded bg-gray-950/40">
            <p className="text-cyan-400 font-bold">SAI-MAN Portfolio [Featured]</p>
            <p className="text-xs text-gray-400 mt-1"><TooltipText text="Interactive Pac-Man portfolio built with Phaser 3, React.js and TypeScript." mode={mode} /></p>
            <p className="text-xs text-yellow-500/80 font-mono mt-1">Repo: github.com/SAIEE12/sai-man</p>
          </div>
          <div className="border border-cyan-500/20 p-3 rounded bg-gray-950/40">
            <p className="text-cyan-400 font-bold">FastAPI Server Dashboard</p>
            <p className="text-xs text-gray-400 mt-1"><TooltipText text="Scalable REST APIs designed for real-time monitoring and container stats." mode={mode} /></p>
            <p className="text-xs text-yellow-500/80 font-mono mt-1">Tech: FastAPI · Docker · PostgreSQL</p>
          </div>
        </div>
      );
    } else if (lowerCmd === 'contact') {
      output = (
        <div className="space-y-2 text-gray-300">
          <p><span className="text-cyan-400 font-bold">Email:</span> saimanishmail@gmail.com</p>
          <p><span className="text-cyan-400 font-bold">Phone:</span> +91 9959110929</p>
          <p><span className="text-cyan-400 font-bold">GitHub:</span> github.com/SAIEE12</p>
          <p><span className="text-cyan-400 font-bold">LinkedIn:</span> linkedin.com/in/sai-manish-ananthula</p>
        </div>
      );
    } else if (lowerCmd === 'sudo hire-me') {
      output = <span className="text-green-400">Opening mail client... Permission granted! [sudo] user: guest approved.</span>;
      setTimeout(() => {
        window.location.href = 'mailto:saimanishmail@gmail.com?subject=Job Opportunity - Python Full Stack Developer';
      }, 800);
    } else if (lowerCmd === 'docker ps') {
      output = (
        <div className="space-y-2 font-mono text-xs text-gray-300">
          <p className="text-yellow-400 font-bold flex gap-4">
            <span>CONTAINER ID</span>
            <span>IMAGE</span>
            <span>STATUS</span>
            <span>NAMES</span>
          </p>
          {funnyContainers.map(c => (
            <p key={c.id} className="flex gap-4">
              <span className="text-cyan-400">{c.id}</span>
              <span className="w-40 truncate">{c.image}</span>
              <span className="w-36 truncate">{c.status}</span>
              <span className="text-green-400 font-semibold">{c.name}</span>
            </p>
          ))}
        </div>
      );
    } else if (lowerCmd === 'git log --oneline') {
      output = (
        <div className="space-y-1.5 font-mono text-xs text-gray-300">
          {fakeCommits.map(c => (
            <p key={c.hash}>
              <span className="text-yellow-500 font-bold">{c.hash}</span>
              <span className="text-gray-500 font-bold"> - </span>
              <span className="text-gray-300">{c.message}</span>
            </p>
          ))}
        </div>
      );
    } else if (lowerCmd === 'export mode=recruiter') {
      onModeChange('recruiter');
      output = <span className="text-green-400">Environment variable updated: MODE=recruiter (Recruiter Plain English mode enabled!)</span>;
    } else if (lowerCmd === 'export mode=devops') {
      onModeChange('devops');
      output = <span className="text-cyan-400">Environment variable updated: MODE=devops (DevOps tech-jargon mode active.)</span>;
    } else if (lowerCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      output = <span className="text-red-400">command not found: {cleanCmd}. Type "help" for a list of commands.</span>;
    }

    setHistory(prev => [...prev, { command: cleanCmd, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xs font-mono p-4">
      <div className="w-full max-w-4xl bg-black border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col h-[550px]">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-gray-950 rounded-t-xl">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400 font-bold tracking-wider">guest@saiman-os: /home/guest</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 rounded-full"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Terminal Screen Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent">
          <p className="text-xs text-gray-500">// Welcome to saiman-os interactive portal. Type <span className="text-cyan-400 font-bold">help</span> to begin.</p>
          
          {history.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-400 font-bold">guest@saiman-os:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <div className="text-sm pl-4 border-l border-cyan-500/10 py-1">
                {item.output}
              </div>
            </div>
          ))}

          {/* Active Command Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 text-sm pt-2">
            <span className="text-green-400 font-bold flex-shrink-0">guest@saiman-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent text-white border-none outline-none focus:ring-0 p-0 font-mono caret-cyan-400"
              placeholder='Type a command (e.g. "help")...'
            />
          </form>
          <div ref={terminalEndRef} />
        </div>

        {/* Help footer */}
        <div className="px-4 py-2 border-t border-cyan-500/20 bg-gray-950 text-[10px] text-gray-500 flex justify-between rounded-b-xl">
          <span>Active Session: guest // Mode: {mode.toUpperCase()}</span>
          <span>Press ESC or click X to close</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalOverlay;
