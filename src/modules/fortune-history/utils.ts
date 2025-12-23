import type { FortuneMode } from '@/types';

export function getModeLabel(mode: FortuneMode): string {
  return mode === 'ai' ? '🤖 AI' : '🔮 Classic';
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString();
}

export function getToggleButtonText(isOpen: boolean, count: number): string {
  return `${isOpen ? 'Hide' : 'View'} History (${count})`;
}
