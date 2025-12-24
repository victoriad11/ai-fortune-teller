import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Fortune, FortuneMode } from '../types';

interface AppStore {
  appState: AppState;
  setAppState: (state: AppState) => void;

  mode: FortuneMode;
  setMode: (mode: FortuneMode) => void;

  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;

  fortunes: Fortune[];
  addFortune: (fortune: Fortune) => void;
  clearHistory: () => void;

  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;

  reset: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      appState: 'idle',
      mode: 'classic',
      currentQuestion: '',
      currentAnswer: '',
      fortunes: [],
      reducedMotion: false,

      setAppState: (appState) => set({ appState }),
      setMode: (mode) => set({ mode }),
      setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
      setCurrentAnswer: (currentAnswer) => set({ currentAnswer }),

      addFortune: (fortune) =>
        set((state) => ({
          fortunes: [fortune, ...state.fortunes].slice(0, 50), // Keep last 50
        })),

      clearHistory: () => set({ fortunes: [] }),

      setReducedMotion: (reducedMotion) => set({ reducedMotion }),

      reset: () =>
        set({
          appState: 'idle',
          currentQuestion: '',
          currentAnswer: '',
        }),
    }),
    {
      name: 'fortune-teller-storage',
      partialize: (state) => ({
        fortunes: state.fortunes,
        mode: state.mode,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
);
