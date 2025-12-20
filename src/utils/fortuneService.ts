import type { FortuneMode, ThemeType } from '../types';
import { CLASSIC_FORTUNES, AI_SYSTEM_PROMPTS } from '../constants/fortunes';

export const getClassicFortune = (theme: ThemeType): string => {
  const fortunes = CLASSIC_FORTUNES[theme];
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  return fortunes[randomIndex];
};

export const getAIFortune = async (
  question: string,
  theme: ThemeType
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('OpenAI API key not found, falling back to classic fortune');
    return getClassicFortune(theme);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: AI_SYSTEM_PROMPTS[theme],
          },
          {
            role: 'user',
            content: `Question: ${question}`,
          },
        ],
        max_tokens: 50,
        temperature: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || getClassicFortune(theme);
  } catch (error) {
    console.error('Error fetching AI fortune:', error);
    return getClassicFortune(theme);
  }
};

export const getFortune = async (
  mode: FortuneMode,
  question: string,
  theme: ThemeType
): Promise<string> => {
  if (mode === 'ai' && question.trim()) {
    return getAIFortune(question, theme);
  }
  return getClassicFortune(theme);
};
