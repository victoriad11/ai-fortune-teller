import { useState, useCallback } from 'react';
import type { FortuneData, ShareStatus } from './types';
import { copyTextToClipboard } from './shareService';

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);
  const [status, setStatus] = useState<ShareStatus>('idle');

  const share = useCallback(async (data: FortuneData) => {
    setIsSharing(true);
    setStatus('idle');

    try {
      await copyTextToClipboard(data);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setIsSharing(false);
    }
  }, []);

  return { share, isSharing, status };
}
