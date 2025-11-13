// Environment variables are accessed via process.env
import type {
  RequestMethod,
  CreateProjectRequest,
  UpdateProjectRequest,
  CreateCharacterRequest,
  UpdateCharacterRequest,
  CreateSceneRequest,
  UpdateSceneRequest,
  CreateShotRequest,
  UpdateShotRequest,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request<T>(
  endpoint: string,
  method: RequestMethod = RequestMethod.GET,
  body?: any,
  headers: Record<string, string> = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${method} ${endpoint}`, error);
    throw error;
  }
}

// Project API functions
export async function fetchProjects() {
  return request('/api/projects');
}

export async function getProjectScenes(projectId: string) {
  return request(`/api/projects/${projectId}/scenes`);
}

export async function getSceneShots(projectId: string, sceneId: string) {
  return request(`/api/projects/${projectId}/scenes/${sceneId}/shots`);
}

export async function analyzeScript(projectId: string, scriptText: string) {
  return request(`/api/projects/${projectId}/analyze`, RequestMethod.POST, { scriptText });
}

export async function getShotSuggestion(projectId: string, sceneId: string, shotType: string) {
  return request(`/api/projects/${projectId}/scenes/${sceneId}/suggestions`, RequestMethod.POST, { shotType });
}

export async function chatWithAI(message: string, context?: any) {
  return request('/api/ai/chat', RequestMethod.POST, { message, context });
}

// Additional project functions that are missing
export async function fetchProject(id: string) {
  return request(`/api/projects/${id}`);
}

export async function createProject(data: CreateProjectRequest) {
  return request('/api/projects', RequestMethod.POST, data);
}

export async function updateProject(id: string, data: UpdateProjectRequest) {
  return request(`/api/projects/${id}`, RequestMethod.PUT, data);
}

export async function deleteProject(id: string) {
  return request(`/api/projects/${id}`, RequestMethod.DELETE);
}

// Character functions
export async function getProjectCharacters(projectId: string) {
  return request(`/api/projects/${projectId}/characters`);
}

export async function createCharacter(projectId: string, data: CreateCharacterRequest) {
  return request(`/api/projects/${projectId}/characters`, RequestMethod.POST, data);
}

export async function updateCharacter(id: string, data: UpdateCharacterRequest) {
  return request(`/api/characters/${id}`, RequestMethod.PUT, data);
}

export async function deleteCharacter(id: string) {
  return request(`/api/characters/${id}`, RequestMethod.DELETE);
}

// Scene functions
export async function createScene(projectId: string, data: CreateSceneRequest) {
  return request(`/api/projects/${projectId}/scenes`, RequestMethod.POST, data);
}

export async function updateScene(id: string, data: UpdateSceneRequest) {
  return request(`/api/scenes/${id}`, RequestMethod.PUT, data);
}

export async function deleteScene(id: string) {
  return request(`/api/scenes/${id}`, RequestMethod.DELETE);
}

// Shot functions
export async function createShot(sceneId: string, data: CreateShotRequest) {
  return request(`/api/scenes/${sceneId}/shots`, RequestMethod.POST, data);
}

export async function updateShot(id: string, data: UpdateShotRequest) {
  return request(`/api/shots/${id}`, RequestMethod.PUT, data);
}

export async function deleteShot(id: string) {
  return request(`/api/shots/${id}`, RequestMethod.DELETE);
}

// Alias functions for compatibility
export const getProjects = fetchProjects;
export const getProject = fetchProject;
export const createProjectAlias = createProject;
export const updateProjectAlias = updateProject;
export const deleteProjectAlias = deleteProject;
export const getProjectCharactersAlias = getProjectCharacters;
export const createCharacterAlias = createCharacter;
export const updateCharacterAlias = updateCharacter;
export const deleteCharacterAlias = deleteCharacter;
export const createSceneAlias = createScene;
export const updateSceneAlias = updateScene;
export const deleteSceneAlias = deleteScene;
export const createShotAlias = createShot;
export const updateShotAlias = updateShot;
export const deleteShotAlias = deleteShot;

// Export the request function for custom API calls
export { request };
