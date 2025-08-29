import type { ChatMessage } from '../types';
import { MessageAuthor } from '../types';

const API_URL = 'http://localhost:1234/v1/chat/completions';

export async function* streamChatResponse(
  prompt: string,
  history: ChatMessage[],
  modelId: string
): AsyncGenerator<string, void, undefined> {
  try {
    const messages = history
      .filter(msg => msg.content)
      .map(msg => ({
        role: msg.author === MessageAuthor.USER ? 'user' : 'assistant',
        content: msg.content,
      }));

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        stream: true,
        // LM Studio specific parameters can be added here if needed
        // e.g., temperature: 0.7
      }),
    });

    if (!response.ok) {
        let errorBody = 'Could not read error body.';
        try {
            errorBody = await response.text();
        } catch (e) {
            // ignore
        }
      throw new Error(`LM Studio API request failed: ${response.status} ${response.statusText}. Is the server running at ${API_URL}? Details: ${errorBody}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get response reader from LM Studio server.");
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      
      buffer += decoder.decode(value, { stream: true });
      
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.substring(6).trim();
          if (jsonStr === '[DONE]') {
            return;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch (e) {
            console.warn('Failed to parse stream chunk from LM Studio:', jsonStr);
          }
        }
      }
    }
  } catch (error) {
    console.error('LM Studio Service Error:', error);
    yield `Error: Could not retrieve response from local LM Studio server. Please ensure it is running and accessible. Details: ${error instanceof Error ? error.message : String(error)}`;
  }
}