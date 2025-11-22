/**
 * Server-side validation configuration constants
 * Contains validation rules for AI service endpoints
 */

export const AI_VALIDATION_CONSTRAINTS = {
  REPHRASE_MAX_LENGTH: 2000,
  TRANSLATE_MAX_LENGTH: 200,
} as const;

export const AI_VALIDATION_MESSAGES = {
  TEXT_REQUIRED: 'Text is required',
  REPHRASE_TOO_LONG: 'Text must be less than 2000 characters',
  TRANSLATE_TOO_LONG: 'Text must be less than 200 characters',
} as const;
