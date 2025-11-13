// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface GeminiConfig {
  apiKey?: string;
  model?: string;
}

export interface GeminiResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export async function generateText(prompt: string, config?: GeminiConfig): Promise<GeminiResponse> {
  return {
    text: '',
    usage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    },
  };
}

export async function generateStream(prompt: string, config?: GeminiConfig): Promise<ReadableStream> {
  return new ReadableStream();
}

export function toText(response: GeminiResponse | string): string {
  if (typeof response === 'string') {
    return response;
  }
  return response.text;
}

export default {
  generateText,
  generateStream,
  toText,
};
