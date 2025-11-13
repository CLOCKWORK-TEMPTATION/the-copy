// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface Project {
  id: string;
  title: string;
  name?: string;
  description?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

export const useProjectStore = () => {
  return {
    projects: [] as Project[],
    currentProject: null as Project | null,
    loading: false,
    error: null as string | null,
    fetchProjects: async () => {},
    setCurrentProject: (project: Project | null) => {},
    createProject: async (data: Partial<Project>) => {},
    updateProject: async (id: string, data: Partial<Project>) => {},
    deleteProject: async (id: string) => {},
  };
};

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

export default useProjectStore;
