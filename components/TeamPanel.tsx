
import React, { useState, useEffect } from 'react';
import type { TeamMember, ActivityItem, MemberStatus } from '../types';
import { UserIcon, TitansLogoIcon, OpenAIIcon, AnthropicIcon } from './icons/Icons';

// --- Mock Data ---
const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: 'human-1', name: 'Krzysztof', role: 'Lead Developer', isAI: false, status: 'Online', avatar: UserIcon },
  { id: 'ai-gemini', name: 'Gemini 2.5', role: 'Research Assistant', isAI: true, status: 'Idle', avatar: TitansLogoIcon },
  { id: 'ai-claude', name: 'Claude 3 Opus', role: 'Code Reviewer', isAI: true, status: 'Online', avatar: AnthropicIcon },
  { id: 'ai-gpt4', name: 'GPT-4o', role: 'Documentation Writer', isAI: true, status: 'Offline', avatar: OpenAIIcon },
];

const MOCK_ACTIVITY_FEED: ActivityItem[] = [
    { id: 'act-1', memberId: 'human-1', action: 'Created a new task: "Integrate TITANS core"', timestamp: '2 minutes ago'},
    { id: 'act-2', memberId: 'ai-claude', action: 'Reviewed `geminiService.ts` and suggested improvements.', timestamp: '5 minutes ago'},
    { id: 'act-3', memberId: 'ai-gemini', action: 'Fetched the latest research papers on cognitive architectures.', timestamp: '15 minutes ago'},
    { id: 'act-4', memberId: 'human-1', action: 'Pushed changes to the `feat/team-workspace` branch.', timestamp: '28 minutes ago'},
    { id: 'act-5', memberId: 'ai-gpt4', action: 'Generated initial draft for the project README.', timestamp: '45 minutes ago'},
];
// --- End Mock Data ---


const StatusIndicator: React.FC<{ status: MemberStatus }> = ({ status }) => {
  const baseClasses = "w-2.5 h-2.5 rounded-full";
  if (status === 'Online') {
    return <div className={`${baseClasses} bg-green-500`}></div>;
  }
  if (status === 'Idle') {
    return <div className={`${baseClasses} bg-yellow-500`}></div>;
  }
  if (status === 'Offline') {
    return <div className={`${baseClasses} bg-slate-600`}></div>;
  }
  if (status === 'Typing...') {
     return (
        <div className="flex items-center gap-0.5">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
        </div>
    );
  }
  return null;
};

const TeamPanel: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [scratchpadContent, setScratchpadContent] = useState(
    '// Shared notes and code snippets...\n\nfunction setupTitansCore() {\n  console.log("Initializing TITANS AGI core systems...");\n}'
  );

  // Simulate dynamic status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTeam(prevTeam => {
        const randomIndex = Math.floor(Math.random() * prevTeam.length);
        const member = prevTeam[randomIndex];
        if (member.status !== 'Offline' && member.isAI) {
          const newStatus: MemberStatus = Math.random() > 0.66 ? 'Typing...' : 'Online';
          const updatedMember = { ...member, status: newStatus };
          const newTeam = [...prevTeam];
          newTeam[randomIndex] = updatedMember;
          return newTeam;
        }
        return prevTeam;
      });
    }, 3000); // Change status every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getMemberById = (id: string) => team.find(m => m.id === id);

  return (
    <div className="flex-1 flex bg-slate-800/50">
      {/* Left Column: Team Members */}
      <div className="w-72 border-r border-slate-700/80 flex flex-col">
        <header className="p-4 border-b border-slate-700/80">
          <h2 className="text-lg font-semibold">Team Members ({team.length})</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
                {team.map(member => (
                    <li key={member.id} className="p-2 flex items-center gap-3 rounded-md hover:bg-slate-700/30">
                        <div className="relative">
                            <member.avatar className={`w-9 h-9 p-1 rounded-full ${member.isAI ? 'bg-indigo-900/50 text-indigo-300' : 'bg-slate-600 text-slate-300'}`} />
                            <div className="absolute -bottom-0.5 -right-0.5 border-2 border-slate-800 rounded-full">
                                <StatusIndicator status={member.status} />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-gray-200">{member.name}</p>
                            <p className="text-xs text-gray-400">{member.role}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>

      {/* Right Column: Workspace & Activity */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center p-4 border-b border-slate-700/80">
          <h1 className="text-xl font-semibold">Collaborative Workspace</h1>
        </header>
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
            {/* Shared Scratchpad */}
            <div>
                <h3 className="font-semibold mb-2 text-gray-300">Shared Scratchpad</h3>
                <textarea
                    value={scratchpadContent}
                    onChange={(e) => setScratchpadContent(e.target.value)}
                    className="w-full h-64 bg-slate-900/70 p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                    placeholder="Type anything here..."
                />
            </div>
            
            {/* Activity Feed */}
            <div>
                <h3 className="font-semibold mb-2 text-gray-300">Activity Feed</h3>
                <div className="space-y-3">
                    {MOCK_ACTIVITY_FEED.map(activity => {
                        const member = getMemberById(activity.memberId);
                        if (!member) return null;
                        return (
                            <div key={activity.id} className="flex items-start gap-3 text-sm">
                                <member.avatar className="w-6 h-6 flex-shrink-0 mt-0.5 text-gray-400" />
                                <div className="flex-1">
                                    <p className="text-gray-300">
                                        <span className="font-semibold text-white">{member.name}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPanel;
