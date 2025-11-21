import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, use a backend API instead
});

export async function translateToArabic(text: string): Promise<string> {
  if (!text || text.trim().length === 0) {
    return '';
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate the given English name to Arabic. Only return the Arabic translation, nothing else.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Translation error:', error);
    return '';
  }
}

export async function translateToEnglish(text: string): Promise<string> {
  if (!text || text.trim().length === 0) {
    return '';
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate the given Arabic name to English. Only return the English translation, nothing else.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Translation error:', error);
    return '';
  }
}
