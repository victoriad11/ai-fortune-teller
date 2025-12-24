import { GoogleGenerativeAI } from '@google/generative-ai';
import type { FortuneMode } from '../types';
import { CLASSIC_FORTUNES, AI_SYSTEM_PROMPT, GEMINI_MODEL } from '../constants';

export type FortuneError = 'rate_limit' | 'no_api_key' | 'api_error' | null;

export interface FortuneResult {
  answer: string;
  error: FortuneError;
}

export const getClassicFortune = (): string => {
  const randomIndex = Math.floor(Math.random() * CLASSIC_FORTUNES.length);
  return CLASSIC_FORTUNES[randomIndex];
};

export const getAIFortune = async (question: string): Promise<FortuneResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('Gemini API key not found, falling back to classic fortune');
    return {
      answer: getClassicFortune(),
      error: 'no_api_key',
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.9,
      },
    });

    const prompt = `${AI_SYSTEM_PROMPT}\n\nQuestion: ${question}`;
    const result = await model.generateContent(prompt);
    const response = result.response;

    let text = '';
    try {
      text = response.text().trim();
    } catch (err) {
      console.warn('Could not extract text from response:', err);
      if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
        text = response.candidates[0].content.parts[0].text.trim();
      }
    }

    if (!text) {
      console.warn('Empty response from AI, using classic fortune');
      return {
        answer: getClassicFortune(),
        error: 'api_error',
      };
    }

    return {
      answer: text,
      error: null,
    };
  } catch (error: any) {
    console.error('Error fetching AI fortune:', error);

    // Check for rate limit error
    const errorMessage = error?.message || String(error);
    const isRateLimit =
      errorMessage.includes('429') ||
      errorMessage.includes('rate limit') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('RESOURCE_EXHAUSTED');

    return {
      answer: getClassicFortune(),
      error: isRateLimit ? 'rate_limit' : 'api_error',
    };
  }
};

export const getFortune = async (
  mode: FortuneMode,
  question: string
): Promise<FortuneResult> => {
  if (mode === 'ai' && question.trim()) {
    return getAIFortune(question);
  }
  return {
    answer: getClassicFortune(),
    error: null,
  };
};
