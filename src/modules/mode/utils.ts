import type { FortuneMode } from '@/types';
import type { ModeConfig } from './types';

export const MODE_CONFIGS: ModeConfig[] = [
  {
    value: 'classic',
    icon: '🔮',
    label: 'Classic',
  },
  {
    value: 'ai',
    icon: '🤖',
    label: 'AI Mode',
  },
];

export function getModeBadgeText(mode: FortuneMode): string {
  const config = MODE_CONFIGS.find((m) => m.value === mode);
  return config ? `${config.icon} ${config.label}` : '';
}
