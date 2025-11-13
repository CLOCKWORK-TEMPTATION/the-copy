// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export const DEFAULT_TIMEOUT = 30000;
export const MAX_RETRIES = 3;
export const API_VERSION = 'v1';

export const TASK_TYPES = {
  CHARACTER: 'character',
  SCENE: 'scene',
  SCRIPT: 'script',
  GENERAL: 'general',
} as const;

export const ANALYSIS_STAGES = {
  INITIAL: 'initial',
  INTERMEDIATE: 'intermediate',
  FINAL: 'final',
} as const;

export const MIN_FILES_REQUIRED = 1;

export const TASKS_REQUIRING_COMPLETION_SCOPE = ['completion', 'creative'];

export const COMPLETION_ENHANCEMENT_OPTIONS = {
  MINIMAL: 'minimal',
  MODERATE: 'moderate',
  EXTENSIVE: 'extensive',
} as const;

export const TASK_LABELS: Record<string, string> = {
  character: 'Character Analysis',
  scene: 'Scene Analysis',
  script: 'Script Analysis',
  general: 'General Analysis',
  creative: 'Creative Writing',
  completion: 'Text Completion',
};

export const TASK_CATEGORY_MAP: Record<string, string> = {
  character: 'analysis',
  scene: 'analysis',
  script: 'analysis',
  general: 'analysis',
  creative: 'creative',
  completion: 'creative',
};

export default {
  DEFAULT_TIMEOUT,
  MAX_RETRIES,
  API_VERSION,
  TASK_TYPES,
  ANALYSIS_STAGES,
  MIN_FILES_REQUIRED,
  TASKS_REQUIRING_COMPLETION_SCOPE,
  COMPLETION_ENHANCEMENT_OPTIONS,
  TASK_LABELS,
  TASK_CATEGORY_MAP,
};
