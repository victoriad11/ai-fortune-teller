import type { FortuneMode } from '@/types';

export interface FortuneData {
  question: string;
  answer: string;
  mode: FortuneMode;
}

export type ShareStatus = 'idle' | 'success' | 'error';
