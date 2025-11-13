// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const projects: Project[] = [];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function addProject(project: Project): void {
  projects.push(project);
}

let currentProject: Project | null = null;

export function getCurrentProject(): Project | null {
  return currentProject;
}

export function setCurrentProject(project: Project | null): void {
  currentProject = project;
}

export function clearCurrentProject(): void {
  currentProject = null;
}

export default {
  projects,
  getProjects,
  getProject,
  addProject,
  getCurrentProject,
  setCurrentProject,
  clearCurrentProject,
};
