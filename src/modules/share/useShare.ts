import { useState, useCallback } from 'react';
import type { FortuneData, ShareStatus } from './types';
import { createShareTemplate } from './shareTemplate';
import { generateFortuneImage } from './imageGenerator';
import { shareImage, copyTextToClipboard } from './shareService';

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);
  const [status, setStatus] = useState<ShareStatus>('idle');

  const share = useCallback(async (data: FortuneData) => {
    setIsSharing(true);
    setStatus('idle');

    try {
      // Generate the HTML template
      const template = createShareTemplate(data);

      // Convert to image
      const imageBlob = await generateFortuneImage(template);

      // Share or copy image
      await shareImage(imageBlob, data);

      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error sharing:', error);

      // Fallback to text copy
      try {
        await copyTextToClipboard(data);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } catch {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } finally {
      setIsSharing(false);
    }
  }, []);

  return { share, isSharing, status };
}
