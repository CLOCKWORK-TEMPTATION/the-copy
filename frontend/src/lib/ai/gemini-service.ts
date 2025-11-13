/**
 * Gemini Service Module
 * Provides GeminiModel and GeminiConfig exports for compatibility
 */

// Re-export from gemini-core for compatibility
export type { GeminiConfig, GeminiModel } from './gemini-core';
export { GeminiCore, createGeminiCore } from './gemini-core';
export type { GeminiService } from './gemini-core';
