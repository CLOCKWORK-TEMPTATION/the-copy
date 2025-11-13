/**
 * Gemini Service Module
 * Provides GeminiModel and GeminiConfig exports for compatibility
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

// Re-export from gemini-core for compatibility
export { GeminiConfig, GeminiModel } from './gemini-core';
