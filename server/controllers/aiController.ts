import { Request, Response, NextFunction } from 'express';
import OpenAI from 'openai';
import { AIServiceError, ValidationError } from '../utils/errors.js';

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new AIServiceError('AI service is not configured', false);
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

/**
 * Controller for AI-powered features
 */
export const aiController = {
  /**
   * Rephrase text professionally for financial assistance application
   */
  async rephraseText(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { text, language } = req.body;

      // Additional server-side validation
      if (!text || text.trim().length === 0) {
        throw new ValidationError('Text cannot be empty');
      }

      if (text.length > 2000) {
        throw new ValidationError('Text is too long (max 2000 characters)');
      }

      const client = getOpenAIClient();

      const systemPrompt = language === 'ar'
        ? 'أنت مساعد كتابة محترف. مهمتك هي إعادة صياغة نص المستخدم بطريقة احترافية ومقنعة ومناسبة لطلب المساعدة المالية. اجعل النص واضحاً ومحترماً ومنظماً. احتفظ بالمعنى الأصلي ولكن حسن الأسلوب. تأكد من أن النص المعاد صياغته يتكون من 50 حرفاً على الأقل. أرجع النص المعاد صياغته فقط بدون أي تعليقات أو شروحات.'
        : 'You are a professional writing assistant. Your task is to rephrase the user\'s text in a professional, compassionate, and appropriate manner for a financial assistance application. Make it clear, respectful, and well-organized. Maintain the original meaning but improve the style and presentation. Ensure the rephrased text is at least 50 characters long. Return only the rephrased text without any comments or explanations.';

      const userPrompt = language === 'ar'
        ? `أعد صياغة النص التالي بشكل احترافي:\n\n${text}`
        : `Rephrase the following text professionally:\n\n${text}`;

      // Call OpenAI API with timeout and retry logic
      const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }, {
        timeout: 30000,
      });

      const rephrased = response.choices[0]?.message?.content?.trim();

      if (!rephrased) {
        throw new AIServiceError('Failed to generate rephrased text', true);
      }

      // Log successful request (without sensitive data)
      console.log(`[AI Rephrase] Language: ${language}, Original length: ${text.length}, Rephrased length: ${rephrased.length}`);

      res.json({
        rephrased,
        originalLength: text.length,
        rephrasedLength: rephrased.length,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Translate names between English and Arabic
   */
  async translateText(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { text, direction } = req.body;

      // Validation
      if (!text || text.trim().length === 0) {
        throw new ValidationError('Text cannot be empty');
      }

      if (text.length > 200) {
        throw new ValidationError('Name is too long (max 200 characters)');
      }

      if (!['toArabic', 'toEnglish'].includes(direction)) {
        throw new ValidationError('Invalid direction. Must be "toArabic" or "toEnglish"');
      }

      const client = getOpenAIClient();

      const systemPrompt = direction === 'toArabic'
        ? 'You are a professional translator. Translate the given English name to Arabic. Only return the Arabic translation, nothing else.'
        : 'You are a professional translator. Translate the given Arabic name to English. Only return the English translation, nothing else.';

      const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 100,
      }, {
        timeout: 20000,
      });

      const translated = response.choices[0]?.message?.content?.trim();

      if (!translated) {
        throw new AIServiceError('Failed to translate text', true);
      }

      // Log successful request
      console.log(`[AI Translate] Direction: ${direction}, Original length: ${text.length}`);

      res.json({
        translated,
        original: text,
        direction,
      });
    } catch (error) {
      next(error);
    }
  },
};
