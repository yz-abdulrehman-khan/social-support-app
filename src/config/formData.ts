/**
 * Form data configuration
 * Contains static dropdown options and form field data
 *
 * Note: These values are currently frontend-only. In a production environment,
 * some of these (like emirates, marital status options) could be fetched from
 * a backend API to allow for dynamic updates without code deployment.
 */

// Gender options
export const GENDER_OPTIONS = ['male', 'female'] as const;

// UAE Emirates list
export const UAE_EMIRATES = [
  'Abu Dhabi',
  'Dubai',
  'Sharjah',
  'Ajman',
  'Umm Al Quwain',
  'Ras Al Khaimah',
  'Fujairah',
] as const;

// Marital status options
export const MARITAL_STATUS_OPTIONS = [
  'single',
  'married',
  'divorced',
  'widowed',
] as const;

// Employment status options
export const EMPLOYMENT_STATUS_OPTIONS = [
  'employed',
  'selfEmployed',
  'unemployed',
  'retired',
  'student',
] as const;

// Housing status options
export const HOUSING_STATUS_OPTIONS = [
  'owned',
  'rented',
  'family-owned',
  'government',
  'other',
] as const;

// Type exports for TypeScript
export type Gender = typeof GENDER_OPTIONS[number];
export type Emirates = typeof UAE_EMIRATES[number];
export type MaritalStatus = typeof MARITAL_STATUS_OPTIONS[number];
export type EmploymentStatus = typeof EMPLOYMENT_STATUS_OPTIONS[number];
export type HousingStatus = typeof HOUSING_STATUS_OPTIONS[number];
