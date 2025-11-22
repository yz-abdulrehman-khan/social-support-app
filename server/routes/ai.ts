import { Router, Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';
import { aiController } from '../controllers/aiController.js';
import { validateRequest } from '../middleware/validation.js';
import { rephraseSchema, translateSchema } from '../validators/aiSchemas.js';

export const aiRouter = Router();

// Rate limiting: 20 requests per minute per IP
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: {
    error: 'Too Many Requests',
    message: 'You have exceeded the rate limit. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for health checks
  skip: (req) => req.path === '/health',
});

// Apply rate limiting to all AI routes
aiRouter.use(aiRateLimiter);

/**
 * POST /api/ai/rephrase
 * Rephrases user input text professionally using GPT-3.5-turbo
 *
 * Request body:
 * {
 *   "text": "user input text",
 *   "language": "en" | "ar"
 * }
 *
 * Response:
 * {
 *   "rephrased": "professionally rephrased text",
 *   "originalLength": 123,
 *   "rephrasedLength": 156
 * }
 */
aiRouter.post(
  '/rephrase',
  validateRequest(rephraseSchema),
  aiController.rephraseText
);

/**
 * POST /api/ai/translate
 * Translates names between English and Arabic
 *
 * Request body:
 * {
 *   "text": "name to translate",
 *   "direction": "toArabic" | "toEnglish"
 * }
 *
 * Response:
 * {
 *   "translated": "translated name",
 *   "original": "original name"
 * }
 */
aiRouter.post(
  '/translate',
  validateRequest(translateSchema),
  aiController.translateText
);

/**
 * GET /api/ai/health
 * Health check for AI service
 */
aiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'AI API',
    openai: !!process.env.OPENAI_API_KEY,
  });
});
