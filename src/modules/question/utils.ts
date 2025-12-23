import type { AppState } from '@/types';

export function getButtonText(appState: AppState): string {
  if (appState === 'shaking' || appState === 'revealing') {
    return 'Shaking...';
  }
  if (appState === 'answered') {
    return 'Ask Another Question';
  }
  return 'Shake the Ball';
}

export function isInputDisabled(appState: AppState): boolean {
  return appState === 'shaking' || appState === 'revealing' || appState === 'answered';
}
