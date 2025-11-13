// Environment variables are accessed via process.env
import type {
  ApiResponse,
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  Scene,
  CreateSceneRequest,
  Shot,
  CreateShotRequest,
  ScriptAnalysis,
  ShotSuggestionsResponse,
  ChatResponse,
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

async function request<T>(
  endpoint: string,
  method: RequestMethod = 'GET',
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
export async function fetchProjects(): Promise<ApiResponse<Project[]>> {
  return request<ApiResponse<Project[]>>('/api/projects');
}

export async function getProjectScenes(projectId: string): Promise<ApiResponse<Scene[]>> {
  return request<ApiResponse<Scene[]>>(`/api/projects/${projectId}/scenes`);
}

export async function getSceneShots(sceneId: string): Promise<ApiResponse<Shot[]>> {
  return request<ApiResponse<Shot[]>>(`/api/scenes/${sceneId}/shots`);
}

export async function analyzeScript(projectId: string, scriptText: string): Promise<ApiResponse<ScriptAnalysis>> {
  return request<ApiResponse<ScriptAnalysis>>(`/api/projects/${projectId}/analyze`, 'POST', { scriptText });
}

export async function getShotSuggestion(projectId: string, sceneId: string, shotType: string): Promise<ApiResponse<ShotSuggestionsResponse>> {
  return request<ApiResponse<ShotSuggestionsResponse>>(`/api/projects/${projectId}/scenes/${sceneId}/suggestions`, 'POST', { shotType });
}

export async function chatWithAI(message: string, context?: Record<string, unknown>): Promise<ApiResponse<ChatResponse>> {
  return request<ApiResponse<ChatResponse>>('/api/ai/chat', 'POST', { message, context });
}

// Additional project functions
export async function fetchProject(id: string): Promise<ApiResponse<Project>> {
  return request<ApiResponse<Project>>(`/api/projects/${id}`);
}

export async function createProject(data: CreateProjectRequest): Promise<ApiResponse<Project>> {
  return request<ApiResponse<Project>>('/api/projects', 'POST', data);
}

export async function updateProject(id: string, data: UpdateProjectRequest): Promise<ApiResponse<Project>> {
  return request<ApiResponse<Project>>(`/api/projects/${id}`, 'PUT', data);
}

export async function deleteProject(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`/api/projects/${id}`, 'DELETE');
}

// Character functions
export async function getProjectCharacters(projectId: string): Promise<ApiResponse<any[]>> {
  return request<ApiResponse<any[]>>(`/api/projects/${projectId}/characters`);
}

export async function createCharacter(projectId: string, data: Record<string, unknown>): Promise<ApiResponse<any>> {
  return request<ApiResponse<any>>(`/api/projects/${projectId}/characters`, 'POST', data);
}

export async function updateCharacter(id: string, data: Record<string, unknown>): Promise<ApiResponse<any>> {
  return request<ApiResponse<any>>(`/api/characters/${id}`, 'PUT', data);
}

export async function deleteCharacter(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`/api/characters/${id}`, 'DELETE');
}

// Scene functions
export async function createScene(projectId: string, data: CreateSceneRequest): Promise<ApiResponse<Scene>> {
  return request<ApiResponse<Scene>>(`/api/projects/${projectId}/scenes`, 'POST', data);
}

export async function updateScene(id: string, data: Partial<CreateSceneRequest>): Promise<ApiResponse<Scene>> {
  return request<ApiResponse<Scene>>(`/api/scenes/${id}`, 'PUT', data);
}

export async function deleteScene(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`/api/scenes/${id}`, 'DELETE');
}

// Shot functions
export async function createShot(sceneId: string, data: CreateShotRequest): Promise<ApiResponse<Shot>> {
  return request<ApiResponse<Shot>>(`/api/scenes/${sceneId}/shots`, 'POST', data);
}

export async function updateShot(id: string, data: Partial<CreateShotRequest>): Promise<ApiResponse<Shot>> {
  return request<ApiResponse<Shot>>(`/api/shots/${id}`, 'PUT', data);
}

export async function deleteShot(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return request<ApiResponse<{ success: boolean }>>(`/api/shots/${id}`, 'DELETE');
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
