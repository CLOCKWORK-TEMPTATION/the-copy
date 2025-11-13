/**
 * Gemini Core Module
 * Provides core functionality for Google Gemini AI integration
 */

export enum GeminiModel {
  FLASH = 'gemini-1.5-flash',
  PRO = 'gemini-pro',
}

export interface GeminiConfig {
  apiKey: string;
  model?: GeminiModel | string;
  temperature?: number;
  maxTokens?: number;
  defaultModel?: GeminiModel;
  maxRetries?: number;
  timeout?: number;
  systemInstruction?: string;
}

export interface GeminiService {
  generateContent(prompt: string, options?: Partial<GeminiConfig>): Promise<string>;
  generateContentStream(prompt: string, options?: Partial<GeminiConfig>): AsyncIterableIterator<string>;
  getCostEstimate(prompt: string, model?: GeminiModel): number;
}

export class GeminiCore implements GeminiService {
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = {
      model: GeminiModel.PRO,
      temperature: 0.7,
      maxTokens: 2048,
      ...config,
    };
  }

  async generateContent(prompt: string, options?: Partial<GeminiConfig>): Promise<string> {
    // Implementation would use the actual Gemini API
    // This is a stub for now
    const mergedConfig = { ...this.config, ...options };
    return `Generated content for: ${prompt} (model: ${mergedConfig.model})`;
  }

  async* generateContentStream(prompt: string, options?: Partial<GeminiConfig>): AsyncIterableIterator<string> {
    // Implementation would use the actual Gemini API with streaming
    // This is a stub for now
    const mergedConfig = { ...this.config, ...options };
    yield `Streaming content for: ${prompt} (model: ${mergedConfig.model})`;
  }

  getCostEstimate(prompt: string, model?: GeminiModel): number {
    const selectedModel = model || this.config.model as GeminiModel;
    const basePrice = selectedModel === GeminiModel.PRO ? 0.001 : 0.0001;
    const tokenCount = prompt.length / 4; // Rough estimate
    return basePrice * tokenCount;
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
    model: GeminiModel.FLASH,
    ...config,
  });
  yield* core.generateContentStream(prompt);
}

// Factory function to create Gemini service instances
export function getGeminiService(config: GeminiConfig): GeminiService {
  return new GeminiCore(config);
}

// Default export
export default GeminiCore;
