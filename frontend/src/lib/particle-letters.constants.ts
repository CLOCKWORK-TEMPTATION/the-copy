// Particle letter constants for animation
// This module defines constants for rendering text as particles

export const PARTICLE_COUNT = 1000;
export const PARTICLE_SIZE = 2;
export const PARTICLE_SPEED = 0.5;
export const PARTICLE_LIFE = 100;

export const LETTER_CONFIGS = {
  spacing: 10,
  size: 48,
  font: 'Arial',
} as const;

// Typography metrics
export const BASELINE = 0.2;
export const STROKE_WIDTH = 0.04;
export const X_HEIGHT = 0.5;
export const ASCENDER_HEIGHT = 0.7;
export const DESCENDER_DEPTH = -0.3;
export const ARABIC_HEIGHT = 0.6;

// Letter positions on canvas
export const LETTER_POSITIONS = {
  T: -2.8,
  H: -2.4,
  E: -2.0,
  C: -1.2,
  O: -0.8,
  P: -0.4,
  Y: 0.0,
  DASH: 0.8,
  ALEF: 2.6,
  LAM: 3.0,
  NOON: 3.4,
  SEEN: 3.8,
  KHAA: 4.4,
  TAA_MARBOUTA: 4.9,
} as const;

// Sampling bounds for particle generation
export const SAMPLING_BOUNDS = {
  minX: -3.0,
  maxX: 5.2,
  minY: -0.5,
  maxY: 1.0,
} as const;

// Particle density thresholds
export const PARTICLE_THRESHOLDS = {
  english: 0.02,
  arabic: 0.025,
} as const;

export default {
  PARTICLE_COUNT,
  PARTICLE_SIZE,
  PARTICLE_SPEED,
  PARTICLE_LIFE,
  LETTER_CONFIGS,
  BASELINE,
  STROKE_WIDTH,
  X_HEIGHT,
  ASCENDER_HEIGHT,
  DESCENDER_DEPTH,
  ARABIC_HEIGHT,
  LETTER_POSITIONS,
  SAMPLING_BOUNDS,
  PARTICLE_THRESHOLDS,
};
