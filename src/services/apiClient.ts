import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class APIError extends Error {
  retryable: boolean;
  statusCode?: number;

  constructor(message: string, retryable: boolean = true, statusCode?: number) {
    super(message);
    this.name = 'APIError';
    this.retryable = retryable;
    this.statusCode = statusCode;
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      url: endpoint,
      ...options,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{
        message?: string;
        retryable?: boolean;
        error?: string;
      }>;

      if (axiosError.response) {
        const errorMessage =
          axiosError.response.data?.message ||
          axiosError.response.data?.error ||
          'An error occurred';
        const retryable = axiosError.response.data?.retryable !== false;

        throw new APIError(errorMessage, retryable, axiosError.response.status);
      }

      if (axiosError.code === 'ECONNABORTED') {
        throw new APIError(
          'Request timeout. Please try again.',
          true
        );
      }

      if (axiosError.code === 'ERR_NETWORK') {
        throw new APIError(
          'Unable to connect to server. Please check your internet connection.',
          true
        );
      }

      throw new APIError(
        axiosError.message || 'Network error occurred',
        true
      );
    }

    throw new APIError(
      'An unexpected error occurred. Please try again.',
      true
    );
  }
}

interface RephraseResponse {
  rephrased: string;
  originalLength: number;
  rephrasedLength: number;
}

interface TranslateResponse {
  translated: string;
  original: string;
  direction: 'toArabic' | 'toEnglish';
}

export async function rephraseText(
  text: string,
  language: 'en' | 'ar' = 'en'
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return '';
  }

  const response = await apiRequest<RephraseResponse>('/api/ai/rephrase', {
    method: 'POST',
    data: { text: text.trim(), language },
  });

  return response.rephrased;
}

export async function translateToArabic(text: string): Promise<string> {
  if (!text || text.trim().length === 0) {
    return '';
  }

  try {
    const response = await apiRequest<TranslateResponse>('/api/ai/translate', {
      method: 'POST',
      data: { text: text.trim(), direction: 'toArabic' },
    });

    return response.translated;
  } catch (error) {
    console.error('Translation to Arabic failed:', error);
    return '';
  }
}

export async function translateToEnglish(text: string): Promise<string> {
  if (!text || text.trim().length === 0) {
    return '';
  }

  try {
    const response = await apiRequest<TranslateResponse>('/api/ai/translate', {
      method: 'POST',
      data: { text: text.trim(), direction: 'toEnglish' },
    });

    return response.translated;
  } catch (error) {
    console.error('Translation to English failed:', error);
    return '';
  }
}