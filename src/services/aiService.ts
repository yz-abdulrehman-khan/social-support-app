import {
  rephraseText as apiRephraseText,
  translateToArabic as apiTranslateToArabic,
  translateToEnglish as apiTranslateToEnglish,
  APIError,
} from './apiClient';
import { LANGUAGES, type Language } from '@/features/application-form/types';

export class AIService {
  static async rephraseText(text: string, language: Language = LANGUAGES.EN): Promise<string> {
    if (!text || text.trim().length === 0) {
      return '';
    }

    try {
      return await apiRephraseText(text, language);
    } catch (error) {
      console.error('AI writing error:', error);

      if (error instanceof APIError) {
        throw new Error(error.message);
      }

      throw new Error('Failed to generate text. Please try again.');
    }
  }

  static async translateToArabic(text: string): Promise<string> {
    if (!text || text.trim().length === 0) {
      return '';
    }

    try {
      return await apiTranslateToArabic(text);
    } catch (error) {
      console.error('Translation to Arabic failed:', error);
      return '';
    }
  }

  static async translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim().length === 0) {
      return '';
    }

    try {
      return await apiTranslateToEnglish(text);
    } catch (error) {
      console.error('Translation to English failed:', error);
      return '';
    }
  }
}
