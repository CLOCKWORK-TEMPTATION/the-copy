// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface GeminiServiceConfig {
  apiKey?: string;
  model?: string;
}

export class GeminiService {
  constructor(config?: GeminiServiceConfig) {}

  async generateText(prompt: string): Promise<string> {
    return '';
  }

  async generateJSON<T = any>(prompt: string): Promise<T> {
    return {} as T;
  }
}

export default new GeminiService();
