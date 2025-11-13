// Redis configuration and utilities for caching

export interface CacheConfig {
  ttl: number; // Time to live in seconds
  namespace: string; // Key namespace for organization
}

// Default cache configuration
export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  ttl: 3600, // 1 hour
  namespace: 'the-copy',
};

// Cache utilities using localStorage as fallback
export class SimpleCache {
  private prefix: string;

  constructor(prefix = 'cache') {
    this.prefix = prefix;
  }

  private getStorageKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  set(key: string, value: any, ttl = DEFAULT_CACHE_CONFIG.ttl): void {
    try {
      const item = {
        value,
        expiry: Date.now() + (ttl * 1000),
      };
      localStorage.setItem(this.getStorageKey(key), JSON.stringify(item));
    } catch (error) {
      console.warn('Cache set failed:', error);
    }
  }

  get<T = any>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(this.getStorageKey(key));
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      if (Date.now() > item.expiry) {
        this.delete(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.warn('Cache get failed:', error);
      return null;
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(this.getStorageKey(key));
    } catch (error) {
      console.warn('Cache delete failed:', error);
    }
  }

  clear(): void {
    try {
      const keysToDelete: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`${this.prefix}:`)) {
          keysToDelete.push(key);
        }
      }
      keysToDelete.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }
}

// Cache keys for different data types
export const CACHE_KEYS = {
  PROJECTS: 'projects',
  PROJECT: (id: string) => `project:${id}`,
  SCENES: (projectId: string) => `scenes:${projectId}`,
  SCENE: (id: string) => `scene:${id}`,
  SHOTS: (sceneId: string) => `shots:${sceneId}`,
  SHOT: (id: string) => `shot:${id}`,
  ANALYSIS: (projectId: string) => `analysis:${projectId}`,
  SUGGESTIONS: (sceneId: string) => `suggestions:${sceneId}`,
  CHAT: 'chat',
  USER_PREFERENCES: 'user-preferences',
} as const;

// Helper functions for common cache operations
export const cache = new SimpleCache('the-copy');

export const cacheProject = (project: any, ttl = 1800): void => {
  cache.set(CACHE_KEYS.PROJECT(project.id), project, ttl);
};

export const getCachedProject = (projectId: string): any => {
  return cache.get(CACHE_KEYS.PROJECT(projectId));
};

export const cacheScenes = (projectId: string, scenes: any[], ttl = 900): void => {
  cache.set(CACHE_KEYS.SCENES(projectId), scenes, ttl);
};

export const getCachedScenes = (projectId: string): any[] => {
  return cache.get(CACHE_KEYS.SCENES(projectId)) || [];
};

export const cacheAnalysis = (projectId: string, analysis: any, ttl = 3600): void => {
  cache.set(CACHE_KEYS.ANALYSIS(projectId), analysis, ttl);
};

export const getCachedAnalysis = (projectId: string): any => {
  return cache.get(CACHE_KEYS.ANALYSIS(projectId));
};

export const clearProjectCache = (projectId?: string): void => {
  if (projectId) {
    cache.delete(CACHE_KEYS.PROJECT(projectId));
    cache.delete(CACHE_KEYS.SCENES(projectId));
    cache.delete(CACHE_KEYS.ANALYSIS(projectId));
  } else {
    cache.clear(); // Clear all cache
  }
};
