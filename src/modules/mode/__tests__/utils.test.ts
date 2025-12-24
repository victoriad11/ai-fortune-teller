import { describe, it, expect } from 'vitest';
import { MODE_CONFIGS, getModeBadgeText } from '../utils';

describe('mode utils', () => {
  describe('MODE_CONFIGS', () => {
    it('should have two mode configurations', () => {
      expect(MODE_CONFIGS).toHaveLength(2);
    });

    it('should have classic mode configuration', () => {
      const classicMode = MODE_CONFIGS.find((m) => m.value === 'classic');
      expect(classicMode).toBeDefined();
      expect(classicMode?.icon).toBe('🔮');
      expect(classicMode?.label).toBe('Classic');
    });

    it('should have AI mode configuration', () => {
      const aiMode = MODE_CONFIGS.find((m) => m.value === 'ai');
      expect(aiMode).toBeDefined();
      expect(aiMode?.icon).toBe('🤖');
      expect(aiMode?.label).toBe('AI Mode');
    });
  });

  describe('getModeBadgeText', () => {
    it('should return classic badge text', () => {
      expect(getModeBadgeText('classic')).toBe('🔮 Classic');
    });

    it('should return AI badge text', () => {
      expect(getModeBadgeText('ai')).toBe('🤖 AI Mode');
    });
  });
});
