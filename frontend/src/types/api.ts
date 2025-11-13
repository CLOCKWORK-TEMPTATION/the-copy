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
  scriptContent?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  scenes?: Scene[];
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
  title: string;
  description?: string;
  script?: string;
  shots?: Shot[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSceneRequest {
  title: string;
  description?: string;
  script?: string;
}

// Shot Types
export interface Shot {
  id: string;
  sceneId: string;
  title: string;
  description?: string;
  type: 'wide' | 'medium' | 'close-up' | 'extreme-close-up';
  duration?: number;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShotRequest {
  title: string;
  description?: string;
  type: 'wide' | 'medium' | 'close-up' | 'extreme-close-up';
  duration?: number;
  order?: number;
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

export interface ShotSuggestion {
  id: string;
  type: string;
  description: string;
  purpose: string;
  equipment: string;
  duration: number;
}

export interface ShotSuggestionsResponse {
  shots: ShotSuggestion[];
}

// Chat Types
export interface ChatMessage {
  id: string;
  message: string;
  response?: string;
  context?: any;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  context?: any;
}

export interface ChatResponse {
  message: string;
  response: string;
  timestamp: string;
}

// Generic API Error
export interface ApiError {
  message: string;
  statusCode?: number;
  details?: any;
}
