export type FortuneMode = 'classic' | 'ai';

export type ThemeType = 'career' | 'romance' | 'meme' | 'tarot' | 'general';

export type AppState = 'idle' | 'typing' | 'shaking' | 'revealing' | 'answered';

export interface Fortune {
  id: string;
  question: string;
  answer: string;
  mode: FortuneMode;
  theme: ThemeType;
  timestamp: number;
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  emoji: string;
  gradient: string[];
  ballColor: string;
  glowColor: string;
}
