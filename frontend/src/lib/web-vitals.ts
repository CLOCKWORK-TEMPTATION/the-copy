/**
 * Web Vitals monitoring and reporting
 */

export interface WebVitalsMetric {
  name: string;
  value: number;
  delta?: number;
  id: string;
  navigationType?: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  entries: PerformanceEntry[];
}

export interface WebVitalsReport {
  metrics: WebVitalsMetric[];
  timestamp: number;
  url: string;
}

export function reportWebVitals(metric: WebVitalsMetric): void {
  // Report to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital: ${metric.name}`, metric);
  }
}

export function initializeWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Initialize web vitals monitoring
  // This would typically use the web-vitals library
  // For now, we'll create a stub implementation
  console.log('Web Vitals monitoring initialized');
}

export function getWebVitalsReport(): WebVitalsReport {
  return {
    metrics: [],
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : '',
  };
}

// Export types for external usage
export type { WebVitalsMetric as Metric };
export type { WebVitalsReport as Report };

// Default export
export default {
  reportWebVitals,
  initializeWebVitals,
  getWebVitalsReport,
};
