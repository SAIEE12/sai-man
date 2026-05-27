import React, { useState, useEffect } from 'react';
import { Activity, GitBranch, Star, GitFork, AlertCircle } from 'lucide-react';

interface PipelineHUDProps {
  isOverlayOpen?: boolean;
}

interface GitTelemetry {
  stars: number;
  forks: number;
  openIssues: number;
  lastCommitMessage: string;
  lastCommitTime: string;
  lastCommitSha: string;
}

const PipelineHUD: React.FC<PipelineHUDProps> = ({ isOverlayOpen = false }) => {
  const [activeUsers, setActiveUsers] = useState(3);
  const [telemetry, setTelemetry] = useState<GitTelemetry>({
    stars: 0,
    forks: 0,
    openIssues: 0,
    lastCommitMessage: 'Update workspace configs',
    lastCommitTime: new Date().toISOString(),
    lastCommitSha: '14824c1',
  });
  const [relativeTime, setRelativeTime] = useState('Just now');

  // 1. Simulate subtle updates to visitor telemetry
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

  // 2. Fetch real Git metrics from GitHub API
  useEffect(() => {
    const fetchGitTelemetry = async () => {
      try {
        // Fetch repository metadata
        const repoRes = await fetch('https://api.github.com/repos/SAIEE12/sai-man');
        let repoData = { stargazers_count: 0, forks_count: 0, open_issues_count: 0 };
        if (repoRes.ok) {
          repoData = await repoRes.json();
        }

        // Fetch latest commit metadata for resign_01 branch
        const commitRes = await fetch('https://api.github.com/repos/SAIEE12/sai-man/commits/resign_01');
        let commitData = null;
        if (commitRes.ok) {
          commitData = await commitRes.json();
        }

        setTelemetry({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          openIssues: repoData.open_issues_count,
          lastCommitMessage: commitData ? commitData.commit.message.split('\n')[0] : 'Update monorepo structures',
          lastCommitTime: commitData ? commitData.commit.committer.date : new Date().toISOString(),
          lastCommitSha: commitData ? commitData.sha.substring(0, 7) : '14824c1',
        });
      } catch (error) {
        console.warn('Failed to fetch Git telemetry from API, using default system values:', error);
      }
    };

    fetchGitTelemetry();
    // Refresh every 60 seconds
    const interval = setInterval(fetchGitTelemetry, 60000);
    return () => clearInterval(interval);
  }, []);

  // 3. Compute precise relative time for last deploy
  useEffect(() => {
    const updateRelativeTime = () => {
      const deployDate = new Date(telemetry.lastCommitTime);
      const diffMs = Date.now() - deployDate.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) {
        setRelativeTime('Just now');
      } else if (diffMins < 60) {
        setRelativeTime(`${diffMins} min${diffMins === 1 ? '' : 's'} ago`);
      } else if (diffHours < 24) {
        setRelativeTime(`${diffHours} hour${diffHours === 1 ? '' : 's'} ago`);
      } else {
        setRelativeTime(`${diffDays} day${diffDays === 1 ? '' : 's'} ago`);
      }
    };

    updateRelativeTime();
    const interval = setInterval(updateRelativeTime, 30000);
    return () => clearInterval(interval);
  }, [telemetry.lastCommitTime]);

  return (
    <div className={`fixed top-4 transition-all duration-300 z-40 hidden md:flex flex-col w-56 bg-black/85 border border-cyan-500/30 rounded-xl p-3 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md font-mono text-[11px] leading-relaxed ${
      isOverlayOpen ? 'right-[404px]' : 'right-4'
    }`}>
      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-1.5 mb-2">
        <div className="flex items-center gap-1 text-cyan-400 font-bold tracking-wider">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>LIVE DEPLOY PIPELINE</span>
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
          <span className="text-gray-500">Commit SHA:</span>
          <span className="text-gray-400 font-bold">{telemetry.lastCommitSha}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Last Deploy:</span>
          <span className="text-gray-300">{relativeTime}</span>
        </div>

        {/* Real GitHub Repository Metrics */}
        <div className="border-t border-cyan-500/10 pt-1.5 mt-1.5 space-y-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-gray-500 flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" /> Stars:
            </span>
            <span className="text-white font-bold">{telemetry.stars}</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-gray-500 flex items-center gap-1">
              <GitFork className="w-3 h-3 text-cyan-400" /> Forks:
            </span>
            <span className="text-white font-bold">{telemetry.forks}</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-gray-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-red-400" /> Issues:
            </span>
            <span className="text-white font-bold">{telemetry.openIssues}</span>
          </div>
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
