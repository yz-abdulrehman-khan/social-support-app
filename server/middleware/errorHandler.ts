import { Request, Response, NextFunction } from 'express';
import { AIServiceError, ValidationError } from '../utils/errors.js';

/**
 * Global error handler middleware
 * Must be registered last in middleware chain
 */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error for monitoring
  console.error('[Error Handler]', {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Handle known error types
  if (error instanceof ValidationError) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
    });
    return;
  }

  if (error instanceof AIServiceError) {
    const retryable = typeof error.retryable === 'boolean' ? error.retryable : true;
    res.status(retryable ? 503 : 500).json({
      error: 'AI Service Error',
      message: error.message,
      retryable,
    });
    return;
  }

  // Handle OpenAI specific errors
  if (error.name === 'OpenAIError' || error.message.includes('OpenAI')) {
    const message = error.message;

    // Rate limit error
    if (message.includes('429') || message.includes('rate limit')) {
      res.status(429).json({
        error: 'Rate Limit Exceeded',
        message: 'AI service rate limit exceeded. Please try again in a moment.',
        retryable: true,
      });
      return;
    }

    // Authentication error
    if (message.includes('401') || message.includes('authentication')) {
      res.status(500).json({
        error: 'Service Configuration Error',
        message: 'AI service authentication failed. Please contact support.',
        retryable: false,
      });
      return;
    }

    // Timeout error
    if (message.includes('timeout') || message.includes('ETIMEDOUT')) {
      res.status(504).json({
        error: 'Gateway Timeout',
        message: 'AI service request timed out. Please try again.',
        retryable: true,
      });
      return;
    }

    // Generic OpenAI error
    res.status(503).json({
      error: 'AI Service Unavailable',
      message: 'AI service is temporarily unavailable. Please try again later.',
      retryable: true,
    });
    return;
  }

  // Generic server error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development'
      ? error.message
      : 'An unexpected error occurred. Please try again later.',
  });
}
