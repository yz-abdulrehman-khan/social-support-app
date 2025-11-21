import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, use a backend API instead
});

export async function rephraseText(userInput: string, language: 'en' | 'ar' = 'en'): Promise<string> {
  if (!userInput || userInput.trim().length === 0) {
    return '';
  }

  const systemPrompt = language === 'ar'
    ? 'أنت مساعد كتابة محترف. مهمتك هي إعادة صياغة نص المستخدم بطريقة احترافية ومقنعة ومناسبة لطلب المساعدة المالية. اجعل النص واضحاً ومحترماً ومنظماً. احتفظ بالمعنى الأصلي ولكن حسن الأسلوب. تأكد من أن النص المعاد صياغته يتكون من 50 حرفاً على الأقل. أرجع النص المعاد صياغته فقط بدون أي تعليقات أو شروحات.'
    : 'You are a professional writing assistant. Your task is to rephrase the user\'s text in a professional, compassionate, and appropriate manner for a financial assistance application. Make it clear, respectful, and well-organized. Maintain the original meaning but improve the style and presentation. Ensure the rephrased text is at least 50 characters long. Return only the rephrased text without any comments or explanations.';

  const userPrompt = language === 'ar'
    ? `أعد صياغة النص التالي بشكل احترافي:\n\n${userInput}`
    : `Rephrase the following text professionally:\n\n${userInput}`;

  try {
    const response = await openai.chat.completions.create({
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
    });

    return response.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('AI writing error:', error);
    throw new Error('Failed to generate text. Please try again.');
  }
}
