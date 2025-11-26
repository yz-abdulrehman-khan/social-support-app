/**
 * Validation configuration constants
 * Contains all validation rules, constraints, and patterns
 */

// Regex patterns for GCC phone numbers
export const PHONE_PATTERNS: Record<string, RegExp> = {
  UAE: /^\+971\s?\d{1,2}\s?\d{3}\s?\d{4}$/,
  SAU: /^\+966\s?\d{1,2}\s?\d{3}\s?\d{4}$/,
  QAT: /^\+974\s?\d{4}\s?\d{4}$/,
  BHR: /^\+973\s?\d{4}\s?\d{4}$/,
} as const;

// Combined GCC phone pattern (for general validation)
export const GCC_PHONE_PATTERN = /^\+(971|966|974|973)\s?\d{1,2}?\s?\d{3,4}\s?\d{4}$/;

// Regex patterns
export const VALIDATION_PATTERNS = {
  EMIRATES_ID: /^784-\d{4}-\d{7}-\d$/,
  UAE_PHONE: PHONE_PATTERNS.UAE,
  GCC_PHONE: GCC_PHONE_PATTERN,
  NUMERIC_ONLY: /^\d+$/,
} as const;

// Validation constraints
export const VALIDATION_CONSTRAINTS = {
  // Step 3 - Financial situation description
  FINANCIAL_SITUATION_MIN_LENGTH: 50,

  // Input field max lengths
  EMIRATES_ID_MAX_LENGTH: 18,
  UAE_PHONE_MAX_LENGTH: 17,
  GCC_PHONE_MAX_LENGTH: 17,

  // AI Service constraints
  AI_REPHRASE_MAX_LENGTH: 2000,
  AI_TRANSLATE_MAX_LENGTH: 200,

  // Number input constraints
  MIN_DEPENDENTS: 0,
  MIN_INCOME: 0,
} as const;

// Validation error message keys (i18n keys)
export const VALIDATION_MESSAGES = {
  REQUIRED: 'validation.required',
  INVALID_EMIRATES_ID: 'validation.invalidEmiratesId',
  INVALID_NATIONAL_ID: 'validation.invalidNationalId',
  INVALID_PHONE: 'validation.invalidPhone',
  INVALID_EMAIL: 'validation.invalidEmail',
  INVALID_NUMBER: 'validation.invalidNumber',
  PROVIDE_DETAILED_DESCRIPTION: 'toast.provideDetailedDescription',
  AI_TEXT_TOO_LONG: 'Text must be less than 2000 characters',
  AI_TRANSLATE_TOO_LONG: 'Text must be less than 200 characters',
  TEXT_REQUIRED: 'Text is required',
} as const;

// Helper function to validate phone by country
export const validatePhoneForCountry = (phone: string, countryCode: string): boolean => {
  const pattern = PHONE_PATTERNS[countryCode];
  if (!pattern) return false;
  return pattern.test(phone);
};
