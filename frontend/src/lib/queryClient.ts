import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Cache keys
export const QUERY_KEYS = {
  PROJECTS: 'projects',
  PROJECT: 'project',
  SCENES: 'scenes',
  SCENE: 'scene',
  SHOTS: 'shots',
  SHOT: 'shot',
  ANALYSIS: 'analysis',
  SUGGESTIONS: 'suggestions',
  CHAT: 'chat',
} as const;

// Helper functions for query invalidation
export const invalidateProjects = () => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
};

export const invalidateProject = (projectId: string) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECT, projectId] });
};

export const invalidateScenes = (projectId: string) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCENES, projectId] });
};

export const invalidateScene = (projectId: string, sceneId: string) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SCENE, projectId, sceneId] });
};

export const invalidateShots = (projectId: string, sceneId: string) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SHOTS, projectId, sceneId] });
};
