// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// UI Constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const SUPPORTED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  document: ['application/pdf', 'text/plain', 'text/markdown'],
};

// Shot Types
export const SHOT_TYPES = [
  { value: 'wide', label: 'Wide Shot', description: 'Full scene view' },
  { value: 'medium', label: 'Medium Shot', description: 'Upper body view' },
  { value: 'close-up', label: 'Close-up', description: 'Face or object detail' },
  { value: 'extreme-close-up', label: 'Extreme Close-up', description: 'Very detailed view' },
];

// Project Status
export const PROJECT_STATUS = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;

// Default Values
export const DEFAULT_SCENE_DURATION = 60; // seconds
export const DEFAULT_SHOT_DURATION = 10; // seconds
export const MAX_SCENES_PER_PROJECT = 100;
export const MAX_SHOTS_PER_SCENE = 50;

// Local Storage Keys
export const LOCAL_STORAGE_KEYS = {
  PROJECTS: 'the-copy-projects',
  USER_PREFERENCES: 'the-copy-user-preferences',
  ANALYSIS_CACHE: 'the-copy-analysis-cache',
  CHAT_HISTORY: 'the-copy-chat-history',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  AUTHENTICATION_FAILED: 'Authentication failed. Please login again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed size.',
  UNSUPPORTED_FILE_TYPE: 'Unsupported file type.',
  INVALID_INPUT: 'Invalid input provided.',
  PERMISSION_DENIED: 'Permission denied.',
  RESOURCE_NOT_FOUND: 'Requested resource not found.',
  OPERATION_FAILED: 'Operation failed. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: 'Project created successfully!',
  SCENE_ADDED: 'Scene added successfully!',
  SHOT_ADDED: 'Shot added successfully!',
  ANALYSIS_COMPLETE: 'Analysis completed successfully!',
  FILE_UPLOADED: 'File uploaded successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
} as const;

// Animation Constants
export const ANIMATION_DURATION = {
  FAST: 200, // ms
  NORMAL: 300, // ms
  SLOW: 500, // ms
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  DEFAULT_PAGE: 1,
} as const;

// Cache TTL
export const CACHE_TTL = {
  ANALYSIS: 3600000, // 1 hour in ms
  PROJECTS: 900000, // 15 minutes in ms
  SCENES: 600000, // 10 minutes in ms
  SHOTS: 300000, // 5 minutes in ms
} as const;
