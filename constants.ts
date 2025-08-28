
import type { AIModel } from './types';

export const MODELS: AIModel[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Gemini',
    description: 'Google\'s fast and efficient multimodal model.',
    isLocal: false,
  },
  {
    id: 'mistral-8x7b-instruct-v0.1',
    name: 'mistral-8x7b-instruct-v0.1',
    provider: 'LM Studio',
    description: 'A local model running via LM Studio. High-performance mixture-of-experts model.',
    file: 'mistral-8x7b-instruct-v0.1-q5_K_M.gguf',
    format: 'GGUF',
    quantization: 'Q5_K_M',
    arch: 'llama',
    size: '33.23 GB',
    isLocal: true,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'OpenAI\'s latest flagship model, "omni" capable.',
    isLocal: false,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Anthropic\'s most powerful model for complex tasks.',
    isLocal: false,
  },
  {
    id: 'copilot',
    name: 'Copilot',
    provider: 'Microsoft',
    description: 'Microsoft\'s AI assistant, integrated across its ecosystem.',
    isLocal: false,
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    provider: 'DeepSeek',
    description: 'Specialized model for code generation and understanding.',
    isLocal: false,
  }
];
