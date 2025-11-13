// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

import { TaskType, TaskCategory } from './enums';

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

export const COMPLETION_ENHANCEMENT_OPTIONS: TaskType[] = [
  TaskType.SCENE_GENERATOR,
  TaskType.CHARACTER_VOICE,
  TaskType.WORLD_BUILDER,
  TaskType.TENSION_OPTIMIZER,
];

export const TASK_LABELS: Record<string, string> = {
  character: 'Character Analysis',
  scene: 'Scene Analysis',
  script: 'Script Analysis',
  general: 'General Analysis',
  creative: 'Creative Writing',
  completion: 'Text Completion',
  minimal: 'تحسينات بسيطة',
  moderate: 'تحسينات متوسطة',
  extensive: 'تحسينات شاملة',
};

export const TASK_CATEGORY_MAP: Partial<Record<TaskType, TaskCategory>> = {
  [TaskType.CHARACTER]: TaskCategory.ANALYSIS,
  [TaskType.SCENE]: TaskCategory.ANALYSIS,
  [TaskType.SCRIPT]: TaskCategory.ANALYSIS,
  [TaskType.GENERAL]: TaskCategory.GENERAL,
  [TaskType.CREATIVE]: TaskCategory.CREATIVE,
  [TaskType.COMPLETION]: TaskCategory.CREATIVE,
  [TaskType.ANALYSIS]: TaskCategory.ANALYSIS,
  [TaskType.INTEGRATED]: TaskCategory.INTEGRATED,
  [TaskType.ADAPTIVE_REWRITING]: TaskCategory.CREATIVE,
  [TaskType.SCENE_GENERATOR]: TaskCategory.CREATIVE,
  [TaskType.CHARACTER_VOICE]: TaskCategory.CREATIVE,
  [TaskType.WORLD_BUILDER]: TaskCategory.CREATIVE,
  [TaskType.PLOT_PREDICTOR]: TaskCategory.CREATIVE,
  [TaskType.TENSION_OPTIMIZER]: TaskCategory.CREATIVE,
  [TaskType.RHYTHM_MAPPING]: TaskCategory.ANALYSIS,
  [TaskType.CHARACTER_NETWORK]: TaskCategory.ANALYSIS,
  [TaskType.DIALOGUE_FORENSICS]: TaskCategory.ANALYSIS,
  [TaskType.THEMATIC_MINING]: TaskCategory.ANALYSIS,
  [TaskType.STYLE_FINGERPRINT]: TaskCategory.ANALYSIS,
  [TaskType.CONFLICT_DYNAMICS]: TaskCategory.ANALYSIS,
  [TaskType.CHARACTER_DEEP_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.DIALOGUE_ADVANCED_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.VISUAL_CINEMATIC_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.THEMES_MESSAGES_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.CULTURAL_HISTORICAL_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.PRODUCIBILITY_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.TARGET_AUDIENCE_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.LITERARY_QUALITY_ANALYZER]: TaskCategory.ANALYSIS,
  [TaskType.RECOMMENDATIONS_GENERATOR]: TaskCategory.CREATIVE,
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
