/**
 * Gemini Service Module
 * Provides GeminiModel and GeminiConfig exports for compatibility
 */

// Re-export from gemini-core for compatibility
export { GeminiModel } from '@/lib/ai/gemini-core';
export type { GeminiConfig, GeminiService } from '@/lib/ai/gemini-core';
export { GeminiCore, createGeminiCore, getGeminiService } from '@/lib/ai/gemini-core';
