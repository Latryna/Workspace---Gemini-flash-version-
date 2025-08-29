import React, { useState } from 'react';
import type { AIModel } from '../types';
import { MODELS } from '../constants';
import { ChevronDownIcon, CopyIcon } from './icons/Icons';

interface RightPanelProps {
  selectedModel: AIModel;
  setSelectedModel: (model: AIModel) => void;
}

const InfoTab: React.FC<{ model: AIModel }> = ({ model }) => (
    <>
        <div className="p-4 border-b border-slate-700/80">
            <h3 className="font-semibold text-gray-200 mb-3">Model Information</h3>
            <div className="space-y-2 text-sm">
                <InfoRow label="Model" value={model.name} />
                {model.file && <InfoRow label="File" value={model.file} />}
                {model.format && <InfoRowPill label="Format" value={model.format} />}
                {model.quantization && <InfoRowPill label="Quantization" value={model.quantization} />}
                {model.arch && <InfoRowPill label="Arch" value={model.arch} />}
                {model.size && <InfoRow label="Size on disk" value={model.size} />}
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-semibold text-gray-200 mb-3">API Usage</h3>
            <div className="space-y-2 text-sm">
                <p>This model's API identifier</p>
                <div className="flex items-center justify-between bg-slate-900 p-2 rounded-md">
                    <span className="font-mono text-indigo-400">{model.id}</span>
                    <button className="text-gray-400 hover:text-white"><CopyIcon /></button>
                </div>
                {model.isLocal && (
                    <>
                        <p className="text-green-400 flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            The local server is reachable at this address
                        </p>
                        <div className="flex items-center justify-between bg-slate-900 p-2 rounded-md">
                            <span className="font-mono text-indigo-400">http://localhost:1234</span>
                             <button className="text-gray-400 hover:text-white"><CopyIcon /></button>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
);

const InfoRow: React.FC<{label: string, value: string}> = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400">{label}</span>
        <span className="bg-slate-700/50 px-2 py-1 rounded-md text-gray-300 truncate max-w-[60%]">{value}</span>
    </div>
);

const InfoRowPill: React.FC<{label: string, value: string}> = ({ label, value }) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400">{label}</span>
        <span className="bg-blue-900/50 text-blue-300 border border-blue-700 px-2 py-0.5 rounded-full">{value}</span>
    </div>
);

const RightPanel: React.FC<RightPanelProps> = ({ selectedModel, setSelectedModel }) => {
    const [activeTab, setActiveTab] = useState('Info');
    const tabs = ['Info', 'Context', 'Inference', 'Load'];

    return (
        <div className="w-96 bg-slate-950 flex flex-col border-l border-slate-800">
            <header className="p-4 flex justify-between items-center border-b border-slate-800">
                <h2 className="text-lg font-bold">Model</h2>
                <div className="relative">
                     <select 
                        value={selectedModel.id}
                        onChange={(e) => {
                            const newModel = MODELS.find(m => m.id === e.target.value);
                            if (newModel) setSelectedModel(newModel);
                        }}
                        className="bg-slate-700 border border-slate-600 rounded-md py-1 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                     >
                        {MODELS.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </header>

            <div className="border-b border-slate-800">
                <nav className="flex items-center p-2 space-x-2">
                    {tabs.map(tab => (
                        <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === tab ? 'bg-slate-700 text-white' : 'text-gray-400 hover:bg-slate-800'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'Info' && <InfoTab model={selectedModel} />}
                {activeTab !== 'Info' && <div className="p-4 text-gray-500">Content for {activeTab} tab.</div>}
            </div>
        </div>
    );
};

export default RightPanel;