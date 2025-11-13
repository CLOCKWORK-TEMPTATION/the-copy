/**
 * Gemini Core Module
 * Provides core functionality for Google Gemini AI integration
 */

export interface GeminiConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GeminiModel {
  generateContent(prompt: string): Promise<string>;
  generateContentStream(prompt: string): AsyncIterableIterator<string>;
}

export class GeminiCore implements GeminiModel {
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = {
      model: 'gemini-pro',
      temperature: 0.7,
      maxTokens: 2048,
      ...config,
    };
  }

  async generateContent(prompt: string): Promise<string> {
    // Implementation would use the actual Gemini API
    // This is a stub for now
    return `Generated content for: ${prompt}`;
  }

  async* generateContentStream(prompt: string): AsyncIterableIterator<string> {
    // Implementation would use the actual Gemini API with streaming
    // This is a stub for now
    yield `Streaming content for: ${prompt}`;
  }
}

// Export utility functions
export function toText(response: any): string {
  if (typeof response === 'string') return response;
  if (response?.text) return response.text;
  if (response?.content) return response.content;
  return JSON.stringify(response);
}

export function createGeminiCore(config: GeminiConfig): GeminiCore {
  return new GeminiCore(config);
}

// Streaming function for Flash model
export async function* streamFlash(prompt: string, config?: Partial<GeminiConfig>): AsyncIterableIterator<string> {
  const core = new GeminiCore({
    apiKey: config?.apiKey || '',
    model: 'gemini-1.5-flash',
    ...config,
  });
  yield* core.generateContentStream(prompt);
}

// Default export
export default GeminiCore;
