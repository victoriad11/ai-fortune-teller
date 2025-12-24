import type { FortuneData } from './types';

export async function copyTextToClipboard(data: FortuneData): Promise<void> {
  const modeLabel = data.mode === 'ai' ? '🤖 AI Mode' : '🔮 Classic';
  const text = `${data.question}\n\n${data.answer}\n\n${modeLabel} • The Magical AI Fortune Teller`;

  await navigator.clipboard.writeText(text);
}
