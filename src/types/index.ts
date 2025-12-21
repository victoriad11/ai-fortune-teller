export type FortuneMode = 'classic' | 'ai';

export type AppState = 'idle' | 'typing' | 'shaking' | 'revealing' | 'answered';

export interface Fortune {
  id: string;
  question: string;
  answer: string;
  mode: FortuneMode;
  timestamp: number;
}
