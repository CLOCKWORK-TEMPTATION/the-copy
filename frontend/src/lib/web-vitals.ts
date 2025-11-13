import { Metric } from 'web-vitals';

// Web Vitals configuration and reporting
export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

// Types for web vitals metrics
export interface WebVitalsMetrics {
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  ttfb: number; // Time to First Byte
}

// Simplified metric reporter for development
export const logWebVitals = (metric: Metric) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });
  }
};

// Get performance rating
export const getPerformanceRating = (metric: Metric): 'good' | 'needs-improvement' | 'poor' => {
  return metric.rating || 'needs-improvement';
};
