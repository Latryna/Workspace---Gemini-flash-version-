
import React, { useState, useRef, useEffect } from 'react';
import type { AIModel, ChatMessage } from '../types';
import { MessageAuthor } from '../types';
import ChatMessageComponent from './ChatMessage';
import { SendIcon, CopyIcon, CodeIcon, ChevronDownIcon } from './icons/Icons';
import { streamChatResponse } from '../services/geminiService';

interface MainPanelProps {
  selectedModel: AIModel;
}

const developerLogs = [
  "2025-08-28 01:16:24 [DEBUG] llama_context: flash_attn      = 0",
  "2025-08-28 01:16:24 [DEBUG] llama_context: kv_unified      = false",
  "2025-08-28 01:16:24 [DEBUG] llama_context: freq_scale      = 1.0",
  "2025-08-28 01:16:24 [DEBUG] llama_context: n_ctx_train (32768) -- the full capacity of the model will not be utilized",
  "2025-08-28 01:16:24 [DEBUG] llama_context: CUDA0 KV buffer size =   272.00 MiB",
  "2025-08-28 01:16:24 [DEBUG] llama_kv_cache_unified:   CPU KV buffer size =   240.00 MiB",
  "2025-08-28 01:16:24 [DEBUG] llama_context: warming up the model with an empty run - please wait... (--no-warmup to disable)",
];

const MainPanel: React.FC<MainPanelProps> = ({ selectedModel }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const userMessage: ChatMessage = {
      author: MessageAuthor.USER,
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const aiMessagePlaceholder: ChatMessage = {
        author: MessageAuthor.AI,
        content: '▋',
        timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, aiMessagePlaceholder]);

    let fullResponse = '';
    try {
        const stream = streamChatResponse(input, newMessages, selectedModel.id);
        for await (const chunk of stream) {
            fullResponse += chunk;
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].content = fullResponse + '▋';
                return updated;
            });
        }
    } catch (error) {
        fullResponse = error instanceof Error ? error.message : "An unknown error occurred.";
    } finally {
        setIsLoading(false);
        setMessages(prev => {
            const finalMessages = [...prev];
            finalMessages[finalMessages.length - 1].content = fullResponse;
            return finalMessages;
        });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="flex-1 flex flex-col bg-slate-800/50">
      <header className="flex items-center justify-between p-4 border-b border-slate-700/80">
        <h1 className="text-xl font-semibold">Rozszerzenia</h1>
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Wybierz model do załadowania (Ctrl + L)</span>
            <ChevronDownIcon />
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessageComponent key={index} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-slate-700/80">
         <div className="bg-slate-700/50 rounded-lg p-1 flex items-start">
             <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${selectedModel.name}...`}
                className="flex-1 bg-transparent p-2 focus:outline-none resize-none"
                rows={1}
                disabled={isLoading}
             />
             <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 rounded-md bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
             >
                <SendIcon />
             </button>
         </div>
      </div>
      
      <div className="border-t border-slate-700/80">
        <button 
          onClick={() => setShowLogs(!showLogs)} 
          className="w-full flex justify-between items-center p-2 bg-slate-900/50 hover:bg-slate-900"
        >
          <span className="font-semibold text-sm">Developer Logs</span>
          <ChevronDownIcon className={`transform transition-transform ${showLogs ? '' : '-rotate-90'}`} />
        </button>
        {showLogs && (
          <div className="bg-black p-4 h-48 overflow-y-auto font-mono text-xs text-gray-400">
            {developerLogs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPanel;
