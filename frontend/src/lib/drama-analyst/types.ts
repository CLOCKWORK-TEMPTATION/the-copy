// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface Character {
  id: string;
  name: string;
  description?: string;
}

export interface Scene {
  id: string;
  title: string;
  description?: string;
  characters?: Character[];
}

export interface Script {
  id: string;
  title: string;
  scenes?: Scene[];
}

export interface AnalysisTask {
  id: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
}

export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type TaskType = 'character' | 'scene' | 'script' | 'general';
export type AgentId = string;

export interface AIRequest {
  prompt: string;
  context?: any;
  options?: any;
  agent?: string;
}

export interface AIResponse {
  text: string;
  metadata?: any;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  raw?: string;
}

export interface ProcessedFile {
  id?: string;
  name?: string;
  content?: string;
  status?: TaskStatus;
  result?: any;
  fileName?: string;
  textContent?: string;
  size?: number;
  sizeBytes?: number;
}
