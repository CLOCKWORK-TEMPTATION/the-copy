// Stub file created by Worktree-5 to resolve type errors
// This module was referenced but missing from the codebase

export interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

export function reportWebVitals(metric: WebVitalsMetric): void {
  // Stub implementation
}

export default reportWebVitals;
