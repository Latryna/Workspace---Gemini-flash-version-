
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';
import LegalPanel from './components/LegalPanel';
import type { AIModel } from './types';
import { MODELS } from './constants';

const App: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel>(MODELS[0]);
  const [activeView, setActiveView] = useState('chat');

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-900 text-gray-300">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        {activeView === 'chat' ? (
          <>
            <MainPanel selectedModel={selectedModel} />
            <RightPanel selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
          </>
        ) : (
           <LegalPanel />
        )}
      </div>
      <StatusBar />
    </div>
  );
};

export default App;
