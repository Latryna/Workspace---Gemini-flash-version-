
import type { SVGProps } from 'react';

export interface AIModel {
  id: string;
  name: string;
  provider: 'Gemini' | 'OpenAI' | 'Anthropic' | 'DeepSeek' | 'LM Studio' | 'Microsoft';
  description: string;
  file?: string;
  format?: string;
  quantization?: string;
  arch?: string;
  size?: string;
  isLocal: boolean;
  providerIcon: React.FC<SVGProps<SVGSVGElement>>;
  openRouterId?: string;
}

export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  author: MessageAuthor;
  content: string;
  timestamp: string;
  model?: AIModel;
}

export interface GithubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  type: 'file' | 'dir';
  html_url: string;
  download_url: string | null;
}

// Types for Team Collaboration Feature
export type MemberStatus = 'Online' | 'Idle' | 'Typing...' | 'Offline';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isAI: boolean;
  status: MemberStatus;
  avatar: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ActivityItem {
  id: string;
  memberId: string;
  action: string;
  timestamp: string;
}
