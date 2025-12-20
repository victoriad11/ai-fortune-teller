import { useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { useStore } from '../store/useStore';
import { THEMES } from '../constants/fortunes';
import styles from './ShareButton.module.css';

export const ShareButton = () => {
  const { currentQuestion, currentAnswer, theme, mode, appState } = useStore();
  const [isSharing, setIsSharing] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const themeConfig = THEMES[theme];

  const handleShare = async () => {
    if (appState !== 'answered') return;

    setIsSharing(true);
    setCopyStatus('idle');

    try {
      // Create a temporary container for the share image
      const shareContainer = document.createElement('div');
      shareContainer.style.position = 'fixed';
      shareContainer.style.left = '-9999px';
      shareContainer.style.width = '600px';
      shareContainer.style.padding = '40px';
      shareContainer.style.background = `linear-gradient(135deg, ${themeConfig.gradient[0]}, ${themeConfig.gradient[1]})`;
      shareContainer.style.borderRadius = '20px';
      shareContainer.style.fontFamily = 'Inter, sans-serif';

      shareContainer.innerHTML = `
        <div style="text-align: center; color: white;">
          <div style="font-size: 48px; margin-bottom: 20px;">🔮</div>
          <h2 style="font-size: 28px; margin-bottom: 30px; font-weight: 700;">The Magical AI Fortune Teller</h2>

          <div style="background: rgba(0,0,0,0.3); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px; opacity: 0.9; font-weight: 600;">
              ${currentQuestion}
            </p>
            <div style="width: 50px; height: 2px; background: rgba(255,255,255,0.5); margin: 20px auto;"></div>
            <p style="font-size: 20px; font-weight: 700; line-height: 1.5;">
              ${currentAnswer}
            </p>
          </div>

          <div style="display: flex; justify-content: center; gap: 15px; font-size: 14px; opacity: 0.8;">
            <span>${themeConfig.emoji} ${themeConfig.name}</span>
            <span>•</span>
            <span>${mode === 'ai' ? '🤖 AI Mode' : '🔮 Classic'}</span>
          </div>
        </div>
      `;

      document.body.appendChild(shareContainer);

      // Convert to image
      const dataUrl = await toPng(shareContainer, {
        quality: 1,
        pixelRatio: 2,
      });

      // Remove temporary container
      document.body.removeChild(shareContainer);

      // Try to use the native share API if available
      if (navigator.share && navigator.canShare) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'fortune.png', { type: 'image/png' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My Fortune',
            text: `${currentQuestion}\n\n${currentAnswer}`,
            files: [file],
          });
          setCopyStatus('success');
          return;
        }
      }

      // Fallback: Copy to clipboard
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);

      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 3000);
    } catch (error) {
      console.error('Error sharing:', error);

      // Final fallback: Copy text
      try {
        await navigator.clipboard.writeText(
          `${currentQuestion}\n\n${currentAnswer}\n\n🔮 The Magical AI Fortune Teller`
        );
        setCopyStatus('success');
        setTimeout(() => setCopyStatus('idle'), 3000);
      } catch {
        setCopyStatus('error');
        setTimeout(() => setCopyStatus('idle'), 3000);
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (appState !== 'answered') return null;

  return (
    <motion.button
      className={styles.button}
      style={{
        background: `linear-gradient(135deg, ${themeConfig.gradient[0]}, ${themeConfig.gradient[1]})`,
      }}
      onClick={handleShare}
      disabled={isSharing}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {isSharing ? (
        'Creating...'
      ) : copyStatus === 'success' ? (
        '✓ Copied!'
      ) : copyStatus === 'error' ? (
        'Error - Try Again'
      ) : (
        <>
          <span>📸</span> Share Fortune
        </>
      )}
    </motion.button>
  );
};
