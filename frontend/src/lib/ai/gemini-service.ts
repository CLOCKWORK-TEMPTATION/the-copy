/**
 * Gemini Service Module
 * Provides GeminiModel and GeminiConfig exports for compatibility
 */

// Re-export from gemini-core for compatibility
export { GeminiModel } from './gemini-core';
export type { GeminiConfig, GeminiService } from './gemini-core';
export { GeminiCore, createGeminiCore, getGeminiService } from './gemini-core';
