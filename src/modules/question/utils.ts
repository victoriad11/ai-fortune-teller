import type { AppState } from '@/types';

export function getButtonText(appState: AppState): string {
  if (appState === 'shaking' || appState === 'revealing') {
    return 'Shaking...';
  }
  return 'Shake the Ball';
}

export function isInputDisabled(appState: AppState): boolean {
  return appState === 'shaking' || appState === 'revealing' || appState === 'answered';
}
