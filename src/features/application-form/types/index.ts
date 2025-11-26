export type { CompleteFormData as ApplicationData } from '@/features/application-form/validation';

// App navigation states
export type AppState = 'landing' | 'form' | 'success';

export const APP_STATES = {
  LANDING: 'landing',
  FORM: 'form',
  SUCCESS: 'success',
} as const satisfies Record<string, AppState>;

// Language types
export type Language = 'en' | 'ar';

export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
} as const satisfies Record<string, Language>;

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'ar'];
