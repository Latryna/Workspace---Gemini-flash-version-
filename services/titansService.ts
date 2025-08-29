import type { AIModel, ChatMessage } from '../types';
import { MODELS } from '../constants';
import { streamChatResponse as streamGeminiResponse } from './geminiService';
import { streamChatResponse as streamOpenRouterResponse } from './openRouterService';
import { streamChatResponse as streamLmStudioResponse } from './lmStudioService';
import { streamRepoResponse } from './repoService';

async function* errorStream(message: string): AsyncGenerator<string> {
    yield message;
}

export const routeRequest = (
  prompt: string,
  history: ChatMessage[],
  selectedModel: AIModel
): { stream: AsyncGenerator<string, void, undefined>, model: AIModel } => {

  const localMatch = prompt.match(/^\[LOCAL\]\s*/i);
  const repoMatch = prompt.match(/^\[REPO\]\s*/i);
  const cloudMatch = prompt.match(/^\[CLOUD:([\w\s.-]+)\]\s*/i);

  // Default case
  let stream: AsyncGenerator<string, void, undefined>;
  let model: AIModel = selectedModel;

  if (localMatch) {
    const cleanPrompt = prompt.substring(localMatch[0].length);
    const localModel = MODELS.find(m => m.isLocal);
    if (localModel) {
      model = localModel;
      stream = streamLmStudioResponse(cleanPrompt, history, localModel.id);
    } else {
      stream = errorStream("Error: No local model configured in constants.ts.");
    }
  } else if (repoMatch) {
    const cleanPrompt = prompt.substring(repoMatch[0].length);
    const repoModel = MODELS.find(m => m.id === 'repo-agent');
    if (repoModel) {
      model = repoModel;
      stream = streamRepoResponse(cleanPrompt);
    } else {
       stream = errorStream("Error: Repo Agent not configured in constants.ts.");
    }
  } else if (cloudMatch) {
    const cleanPrompt = prompt.substring(cloudMatch[0].length);
    const modelName = cloudMatch[1].trim().toLowerCase();
    const targetModel = MODELS.find(m => m.name.toLowerCase().includes(modelName) && m.openRouterId);
    if (targetModel) {
      model = targetModel;
      stream = streamOpenRouterResponse(cleanPrompt, history, targetModel.openRouterId!);
    } else {
      stream = errorStream(`Error: Cloud model "${modelName}" not found or not configured for OpenRouter.`);
    }
  } else {
    // No tags, use the currently selected model
    if (model.isLocal) {
      stream = streamLmStudioResponse(prompt, history, model.id);
    } else if (model.provider === 'Gemini') {
      stream = streamGeminiResponse(prompt, history, model.id);
    } else if (model.openRouterId) {
      stream = streamOpenRouterResponse(prompt, history, model.openRouterId);
    } else {
      stream = errorStream(`Model provider "${model.provider}" is not configured for chat.`);
    }
  }

  return { stream, model };
};
