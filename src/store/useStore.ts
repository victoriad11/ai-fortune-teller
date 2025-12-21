import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Fortune, FortuneMode } from '../types';

interface AppStore {
  // UI State
  appState: AppState;
  setAppState: (state: AppState) => void;

  // Settings
  mode: FortuneMode;
  setMode: (mode: FortuneMode) => void;

  // Current question/answer
  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
  currentAnswer: string;
  setCurrentAnswer: (answer: string) => void;

  // History
  fortunes: Fortune[];
  addFortune: (fortune: Fortune) => void;
  clearHistory: () => void;

  // Accessibility
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;

  // Reset
  reset: () => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      appState: 'idle',
      mode: 'classic',
      currentQuestion: '',
      currentAnswer: '',
      fortunes: [],
      reducedMotion: false,

      // Actions
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
