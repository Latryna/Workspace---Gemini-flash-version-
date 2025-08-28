
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';
import { MessageAuthor } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

let chat: Chat | null = null;

const initializeChat = (modelId: string, history: ChatMessage[]) => {
  const geminiHistory = history
    .filter(msg => msg.content) // Filter out empty messages
    .map(msg => ({
      role: msg.author === MessageAuthor.USER ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

  chat = ai.chats.create({
    model: 'gemini-2.5-flash', // Use supported model
    history: geminiHistory,
    config: {
      systemInstruction: `You are a helpful AI assistant in the TITANS workspace.
      You are collaborating with a human developer.
      Be concise, accurate, and provide code examples when relevant.
      The current model selected by the user is ${modelId}.`,
    },
  });
};

export async function* streamChatResponse(
  prompt: string,
  history: ChatMessage[],
  modelId: string
): AsyncGenerator<string, void, undefined> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API key is not configured.");
    }

    // Initialize or continue the chat session
    if (!chat) {
      initializeChat(modelId, history);
    }

    if (!chat) {
        throw new Error("Chat initialization failed.");
    }

    const result = await chat.sendMessageStream({ message: prompt });
    
    for await (const chunk of result) {
      yield chunk.text;
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    yield `Error: Could not retrieve response. Please check your API key and network connection. Details: ${error instanceof Error ? error.message : String(error)}`;
  }
}
