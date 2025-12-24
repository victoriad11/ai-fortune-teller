import { describe, it, expect } from 'vitest';
import { getModeLabel, formatDate, getToggleButtonText } from '../utils';

describe('fortune-history utils', () => {
  describe('getModeLabel', () => {
    it('should return AI label for ai mode', () => {
      expect(getModeLabel('ai')).toBe('🤖 AI');
    });

    it('should return Classic label for classic mode', () => {
      expect(getModeLabel('classic')).toBe('🔮 Classic');
    });
  });

  describe('formatDate', () => {
    it('should format timestamp to locale date string', () => {
      const timestamp = new Date('2025-01-15T12:00:00').getTime();
      const result = formatDate(timestamp);
      const expected = new Date(timestamp).toLocaleDateString();
      expect(result).toBe(expected);
    });

    it('should handle current date', () => {
      const now = Date.now();
      const result = formatDate(now);
      const expected = new Date(now).toLocaleDateString();
      expect(result).toBe(expected);
    });

    it('should handle past dates', () => {
      const timestamp = new Date('2020-05-10T10:30:00').getTime();
      const result = formatDate(timestamp);
      const expected = new Date(timestamp).toLocaleDateString();
      expect(result).toBe(expected);
    });

    it('should handle epoch timestamp', () => {
      const timestamp = 0;
      const result = formatDate(timestamp);
      const expected = new Date(0).toLocaleDateString();
      expect(result).toBe(expected);
    });
  });

  describe('getToggleButtonText', () => {
    it('should return "View History" when closed with 1 item', () => {
      expect(getToggleButtonText(false, 1)).toBe('View History (1)');
    });

    it('should return "Hide History" when open with 1 item', () => {
      expect(getToggleButtonText(true, 1)).toBe('Hide History (1)');
    });

    it('should return "View History" when closed with multiple items', () => {
      expect(getToggleButtonText(false, 5)).toBe('View History (5)');
    });

    it('should return "Hide History" when open with multiple items', () => {
      expect(getToggleButtonText(true, 10)).toBe('Hide History (10)');
    });

    it('should handle zero count', () => {
      expect(getToggleButtonText(false, 0)).toBe('View History (0)');
      expect(getToggleButtonText(true, 0)).toBe('Hide History (0)');
    });

    it('should handle large counts', () => {
      expect(getToggleButtonText(false, 50)).toBe('View History (50)');
      expect(getToggleButtonText(true, 100)).toBe('Hide History (100)');
    });
  });
});
