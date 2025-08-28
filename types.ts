
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
}

export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  author: MessageAuthor;
  content: string;
  timestamp: string;
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
