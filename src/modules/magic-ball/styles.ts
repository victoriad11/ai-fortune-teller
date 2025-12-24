import type { CSSProperties } from 'react';
import type { FortuneMode } from '@/types';

export const triangleContainerStyle: CSSProperties = {
  clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
  background: 'linear-gradient(to bottom, #1e3a8a, #1e40af, #3b82f6)',
  boxShadow:
    '0 0 40px rgba(59, 130, 246, 0.6), 0 0 80px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(0, 0, 0, 0.3)',
};

export const triangleGlowStyle: CSSProperties = {
  clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
  background: 'radial-gradient(ellipse at center, rgba(147, 197, 253, 0.4) 0%, transparent 70%)',
};

export const getFortuneTextStyle = (mode: FortuneMode): CSSProperties => ({
  fontSize: mode === 'ai' ? 'clamp(0.75rem, 2vw, 0.875rem)' : 'clamp(0.9rem, 2.5vw, 1.1rem)',
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(147, 197, 253, 0.5)',
  marginTop: '-50px',
});
