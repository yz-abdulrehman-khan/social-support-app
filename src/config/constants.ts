/**
 * Application-wide constants
 * Contains UI constants, timeouts, and app configuration
 */

// UI timing constants
export const UI_CONSTANTS = {
  // Copy feedback duration
  COPY_FEEDBACK_DURATION_MS: 2000,

  // Reference number generation
  REFERENCE_NUMBER_PREFIX: 'SA',
  REFERENCE_NUMBER_TIMESTAMP_SLICE: -8, // Last 8 digits of timestamp
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  FINANCIAL_ASSISTANCE_APPLICATION: 'financialAssistanceApplication',
} as const;

// Default values
export const DEFAULT_VALUES = {
  COUNTRY: 'United Arab Emirates',
  DEFAULT_EMIRATE: 'Abu Dhabi',
  LANGUAGE: 'en' as const,
} as const;
