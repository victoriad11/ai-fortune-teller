import { toPng } from 'html-to-image';

export async function generateFortuneImage(container: HTMLDivElement): Promise<Blob> {
  document.body.appendChild(container);

  try {
    const dataUrl = await toPng(container, {
      quality: 1,
      pixelRatio: 2,
    });

    const response = await fetch(dataUrl);
    const blob = await response.blob();

    return blob;
  } finally {
    document.body.removeChild(container);
  }
}
