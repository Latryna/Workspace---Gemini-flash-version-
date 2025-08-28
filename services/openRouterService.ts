// openRouterService.ts
//
// This module encapsulates simple helper functions for calling the
// OpenRouter API from a TypeScript/React application.  It builds
// requests to the chat completions endpoint, sets the necessary
// authentication headers, and returns the parsed JSON response.  The
// API key can be supplied via function argument or via an
// environment variable (VITE_OPENROUTER_API_KEY).

import type { ChatMessage } from './types';

const BASE_URL: string = 'https://openrouter.ai/api/v1';

/**
 * Resolve the API key to use for OpenRouter requests.  Prefer an
 * explicit key passed by the caller; otherwise fall back to the
 * VITE_OPENROUTER_API_KEY environment variable.  Throws if no key
 * can be found.
 */
function resolveApiKey(provided?: string): string {
  const key =
    provided ||
    (import.meta as any).env?.VITE_OPENROUTER_API_KEY ||
    (typeof process !== 'undefined' && (process as any).env?.VITE_OPENROUTER_API_KEY);
  if (!key) {
    throw new Error('OpenRouter API key is missing.  Provide it via argument or environment variable.');
  }
  return key;
}

/**
 * Send a chat completion request to OpenRouter.  The message format
 * follows the OpenAI Chat API: each message should specify a
 * `role` ('system', 'user' or 'assistant') and `content`.
 *
 * @param messages Conversation history
 * @param model    Model identifier (e.g. 'gpt-4o', 'claude-3-haiku')
 * @param apiKey   Optional API key; falls back to env var
 */
export async function chatWithOpenRouter(
  messages: ChatMessage[],
  model: string,
  apiKey?: string,
): Promise<any> {
  const key = resolveApiKey(apiKey);
  const url = `${BASE_URL}/chat/completions`;
  const body = { model, messages };
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    throw new Error(`OpenRouter request failed: ${resp.status} ${resp.statusText}`);
  }
  return resp.json();
}