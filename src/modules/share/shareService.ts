import type { FortuneData } from './types';

export async function shareImage(imageBlob: Blob, data: FortuneData): Promise<void> {
  const file = new File([imageBlob], 'fortune.png', { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: 'My Fortune',
      text: `${data.question}\n\n${data.answer}`,
      files: [file],
    });
    return;
  }

  await copyImageToClipboard(imageBlob);
}

export async function copyImageToClipboard(imageBlob: Blob): Promise<void> {
  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': imageBlob,
    }),
  ]);
}

export async function copyTextToClipboard(data: FortuneData): Promise<void> {
  await navigator.clipboard.writeText(
    `${data.question}\n\n${data.answer}\n\n🔮 The Magical AI Fortune Teller`
  );
}
