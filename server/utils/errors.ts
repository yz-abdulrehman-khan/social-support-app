/**
 * Custom error classes for better error handling
 */

/**
 * Validation error for invalid request data
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * AI Service error for OpenAI API failures
 */
export class AIServiceError extends Error {
  retryable: boolean;

  constructor(message: string, retryable: boolean = true) {
    super(message);
    this.name = 'AIServiceError';
    this.retryable = retryable;
  }
}

/**
 * Network error for connection issues
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}
