// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

export default queryClient;
