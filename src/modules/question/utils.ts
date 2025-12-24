import type { AppState } from '@/types';

export function isInputDisabled(appState: AppState): boolean {
  return appState === 'shaking' || appState === 'revealing' || appState === 'answered';
}

export function isShakeButtonVisible(appState: AppState): boolean {
  return appState !== 'answered';
}
