// Enums
export enum ShotType {
  WIDE = 'wide',
  MEDIUM = 'medium',
  CLOSE_UP = 'close-up',
  EXTREME_CLOSE_UP = 'extreme-close-up',
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  scriptContent?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  scriptContent?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  scriptContent?: string;
}

// Scene Types
export interface Scene {
  id: string;
  projectId: string;
  sceneNumber: number;
  title: string;
  location: string;
  timeOfDay: string;
  characters: string[];
  description?: string | null;
  shotCount: number;
  status: string;
}

export interface CreateSceneRequest {
  projectId: string;
  sceneNumber: number;
  title: string;
  location: string;
  timeOfDay: string;
  characters: string[];
  description?: string;
  shotCount?: number;
  status?: string;
}

export interface UpdateSceneRequest {
  sceneNumber?: number;
  title?: string;
  location?: string;
  timeOfDay?: string;
  characters?: string[];
  description?: string;
  shotCount?: number;
  status?: string;
}

// Shot Types
export interface Shot {
  id: string;
  sceneId: string;
  shotNumber: number;
  shotType: string;
  cameraAngle: string;
  cameraMovement: string;
  lighting: string;
  aiSuggestion?: string | null;
}

export interface CreateShotRequest {
  sceneId: string;
  shotNumber: number;
  shotType: string;
  cameraAngle: string;
  cameraMovement: string;
  lighting: string;
  aiSuggestion?: string;
}

export interface UpdateShotRequest {
  shotNumber?: number;
  shotType?: string;
  cameraAngle?: string;
  cameraMovement?: string;
  lighting?: string;
  aiSuggestion?: string;
}

// Character Types
export interface Character {
  id: string;
  projectId: string;
  name: string;
  appearances: number;
  consistencyStatus: string;
  lastSeen?: string | null;
  notes?: string | null;
}

export interface CreateCharacterRequest {
  projectId: string;
  name: string;
  appearances?: number;
  consistencyStatus?: string;
  lastSeen?: string;
  notes?: string;
}

export interface UpdateCharacterRequest {
  name?: string;
  appearances?: number;
  consistencyStatus?: string;
  lastSeen?: string;
  notes?: string;
}

// AI Analysis Types
export interface ScriptAnalysis {
  themes: string[];
  characters: string[];
  locations: string[];
  emotionalArc: string;
  technicalComments: string;
  visualSuggestions: string[];
}

// Generic API Error
export interface ApiError {
  message: string;
  statusCode?: number;
  details?: any;
}
