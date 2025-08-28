
import React from 'react';
import type { ChatMessage } from '../types';
import { MessageAuthor } from '../types';
import { UserIcon, TitansLogoIcon } from './icons/Icons';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 flex-shrink-0 bg-indigo-600 rounded-full flex items-center justify-center">
          <TitansLogoIcon className="w-5 h-5" />
        </div>
      )}
      <div className={`max-w-xl p-3 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-slate-700/80 text-gray-300 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-2 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>{message.timestamp}</p>
      </div>
      {isUser && (
        <div className="w-8 h-8 flex-shrink-0 bg-slate-600 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageComponent;
