import { describe, it, expect, beforeEach, vi } from 'vitest';
import { copyTextToClipboard } from '../shareService';
import type { FortuneData } from '../types';

describe('copyTextToClipboard', () => {
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });
  });

  it('should format and copy text with AI mode correctly', async () => {
    const data: FortuneData = {
      question: 'Will I succeed?',
      answer: 'Yes, definitely!',
      mode: 'ai',
    };

    await copyTextToClipboard(data);

    expect(mockWriteText).toHaveBeenCalledOnce();
    expect(mockWriteText).toHaveBeenCalledWith(
      'Will I succeed?\n\nYes, definitely!\n\n🤖 AI Mode • The Magical AI Fortune Teller'
    );
  });

  it('should format and copy text with Classic mode correctly', async () => {
    const data: FortuneData = {
      question: 'Should I try this?',
      answer: 'Signs point to yes',
      mode: 'classic',
    };

    await copyTextToClipboard(data);

    expect(mockWriteText).toHaveBeenCalledOnce();
    expect(mockWriteText).toHaveBeenCalledWith(
      'Should I try this?\n\nSigns point to yes\n\n🔮 Classic • The Magical AI Fortune Teller'
    );
  });

  it('should handle empty strings', async () => {
    const data: FortuneData = {
      question: '',
      answer: '',
      mode: 'classic',
    };

    await copyTextToClipboard(data);

    expect(mockWriteText).toHaveBeenCalledOnce();
    expect(mockWriteText).toHaveBeenCalledWith(
      '\n\n\n\n🔮 Classic • The Magical AI Fortune Teller'
    );
  });

  it('should propagate clipboard API errors', async () => {
    const error = new Error('Clipboard access denied');
    mockWriteText.mockRejectedValue(error);

    const data: FortuneData = {
      question: 'Test question',
      answer: 'Test answer',
      mode: 'ai',
    };

    await expect(copyTextToClipboard(data)).rejects.toThrow('Clipboard access denied');
  });
});
