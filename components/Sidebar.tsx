
import React from 'react';
import { TitansLogoIcon, ChatIcon, SearchIcon, FolderIcon, LegalIcon, SettingsIcon, TeamIcon } from './icons/Icons';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { view: 'chat', icon: <ChatIcon />, label: 'Chat' },
    { view: 'team', icon: <TeamIcon />, label: 'Team Workspace' },
    { view: 'search', icon: <SearchIcon />, label: 'Search' },
    { view: 'files', icon: <FolderIcon />, label: 'Files' },
    { view: 'legal', icon: <LegalIcon />, label: 'Legal Docs' },
    { view: 'settings', icon: <SettingsIcon />, label: 'Settings' },
  ];

  return (
    <div className="w-16 bg-slate-950 flex flex-col items-center py-4 space-y-6 border-r border-slate-800">
      <div className="p-2 rounded-lg bg-indigo-600">
        <TitansLogoIcon />
      </div>
      <nav className="flex flex-col items-center space-y-4">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view)}
            className={`p-3 rounded-lg transition-colors duration-200 ${
              activeView === item.view
                ? 'bg-slate-700/50 text-white'
                : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
            }`}
            title={item.label}
            aria-current={activeView === item.view ? 'page' : undefined}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
