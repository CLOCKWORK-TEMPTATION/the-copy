// Shot types enumeration
export enum ShotType {
  WIDE = 'wide',
  MEDIUM = 'medium',
  CLOSE_UP = 'close-up',
  EXTREME_CLOSE_UP = 'extreme-close-up',
}

// Project status enumeration
export enum ProjectStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

// Content types enumeration
export enum ContentType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  AUDIO = 'audio',
}

// File status enumeration
export enum FileStatus {
  UPLOADING = 'uploading',
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
  FAILED = 'failed',
}

// Analysis status enumeration
export enum AnalysisStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// Chat message types enumeration
export enum ChatMessageType {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

// Queue status enumeration
export enum QueueStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  STALLED = 'stalled',
  WAITING = 'waiting',
  COMPLETED = 'completed',
  FAILED = 'failed',
  DELAYED = 'delayed',
}

// Environment types enumeration
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}

// Cache keys enumeration
export enum CacheKey {
  PROJECTS = 'projects',
  ANALYSIS = 'analysis',
  USER_PREFERENCES = 'user-preferences',
  CHAT_HISTORY = 'chat-history',
}

// HTTP Method enumeration
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// Response status enumeration
export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

// User roles enumeration
export enum UserRole {
  ADMIN = 'admin',
  CREATOR = 'creator',
  VIEWER = 'viewer',
  GUEST = 'guest',
}

// Notification types enumeration
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

// Theme enumeration
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

// Animation types enumeration
export enum AnimationType {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  ZOOM = 'zoom',
  BOUNCE = 'bounce',
}
