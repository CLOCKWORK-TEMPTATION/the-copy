// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface TaskInstruction {
  id: string;
  type: string;
  instructions: string;
}

export const TASK_INSTRUCTIONS: Record<string, TaskInstruction> = {
  character: {
    id: 'character',
    type: 'character',
    instructions: 'Analyze character development',
  },
  scene: {
    id: 'scene',
    type: 'scene',
    instructions: 'Analyze scene structure',
  },
  script: {
    id: 'script',
    type: 'script',
    instructions: 'Analyze script content',
  },
};

export function getTaskInstruction(taskType: string): TaskInstruction | undefined {
  return TASK_INSTRUCTIONS[taskType];
}

export const agentIdToTaskTypeMap: Record<string, string> = {
  agent1: 'character',
  agent2: 'scene',
  agent3: 'script',
  agent4: 'general',
  agent5: 'creative',
  agent6: 'completion',
};

export default TASK_INSTRUCTIONS;
