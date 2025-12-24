import { describe, it, expect } from 'vitest';
import { isInputDisabled, isShakeButtonVisible } from '../utils';

describe('question utils', () => {
  describe('isInputDisabled', () => {
    it('should return false when idle', () => {
      expect(isInputDisabled('idle')).toBe(false);
    });

    it('should return false when typing', () => {
      expect(isInputDisabled('typing')).toBe(false);
    });

    it('should return true when shaking', () => {
      expect(isInputDisabled('shaking')).toBe(true);
    });

    it('should return true when revealing', () => {
      expect(isInputDisabled('revealing')).toBe(true);
    });

    it('should return true when answered', () => {
      expect(isInputDisabled('answered')).toBe(true);
    });
  });

  describe('isShakeButtonVisible', () => {
    it('should return true when idle', () => {
      expect(isShakeButtonVisible('idle')).toBe(true);
    });

    it('should return true when typing', () => {
      expect(isShakeButtonVisible('typing')).toBe(true);
    });

    it('should return true when shaking', () => {
      expect(isShakeButtonVisible('shaking')).toBe(true);
    });

    it('should return true when revealing', () => {
      expect(isShakeButtonVisible('revealing')).toBe(true);
    });

    it('should return false when answered', () => {
      expect(isShakeButtonVisible('answered')).toBe(false);
    });
  });
});
