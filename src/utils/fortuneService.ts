import type { FortuneMode } from '../types';
import { CLASSIC_FORTUNES, AI_SYSTEM_PROMPT } from '../constants/fortunes';

export const getClassicFortune = (): string => {
  const randomIndex = Math.floor(Math.random() * CLASSIC_FORTUNES.length);
  return CLASSIC_FORTUNES[randomIndex];
};

export const getAIFortune = async (question: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('OpenAI API key not found, falling back to classic fortune');
    return getClassicFortune();
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
            content: AI_SYSTEM_PROMPT,
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
    return data.choices[0]?.message?.content?.trim() || getClassicFortune();
  } catch (error) {
    console.error('Error fetching AI fortune:', error);
    return getClassicFortune();
  }
};

export const getFortune = async (
  mode: FortuneMode,
  question: string
): Promise<string> => {
  if (mode === 'ai' && question.trim()) {
    return getAIFortune(question);
  }
  return getClassicFortune();
};
