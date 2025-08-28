
import React from 'react';
import { UserIcon, SettingsIcon, TitansLogoIcon } from './icons/Icons';

const StatusBar: React.FC = () => {
  return (
    <div className="h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-4 text-sm text-gray-400">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <TitansLogoIcon className="w-4 h-4" />
          <span>LM Studio 0.3.23 (Build 3)</span>
        </div>
        <div className="flex items-center gap-2">
            <button className="hover:text-white">User</button>
            <button className="hover:text-white">Power User</button>
            <button className="bg-indigo-600 text-white px-2 py-0.5 rounded">Developer</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-blue-400">New!</span>
        <span>openai/gpt-oss</span>
        <div className="w-px h-4 bg-slate-700"></div>
        <span>RAM: 15.05 GB</span>
        <div className="w-px h-4 bg-slate-700"></div>
        <span>CPU: 0.00 %</span>
        <div className="flex items-center gap-2">
            <button className="hover:text-white"><UserIcon /></button>
            <button className="hover:text-white"><SettingsIcon /></button>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
