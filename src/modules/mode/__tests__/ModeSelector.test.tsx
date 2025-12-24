import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeSelector } from '../ModeSelector';
import type { FortuneMode } from '@/types';

const mockSetMode = vi.fn();
let mockMode: FortuneMode = 'classic';

vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    mode: mockMode,
    setMode: mockSetMode,
  }),
}));

describe('ModeSelector', () => {
  it('should render fortune mode label', () => {
    render(<ModeSelector />);
    expect(screen.getByText(/fortune mode/i)).toBeInTheDocument();
  });

  it('should render both mode options', () => {
    render(<ModeSelector />);

    expect(screen.getByRole('button', { name: /classic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ai mode/i })).toBeInTheDocument();
  });

  it('should display classic mode badge when in classic mode', () => {
    mockMode = 'classic';
    render(<ModeSelector />);

    expect(screen.getByText('🔮 Classic')).toBeInTheDocument();
  });

  it('should display AI mode badge when in AI mode', () => {
    mockMode = 'ai';
    render(<ModeSelector />);

    expect(screen.getByText('🤖 AI Mode')).toBeInTheDocument();
  });

  it('should call setMode when classic mode is clicked', async () => {
    const user = userEvent.setup();
    mockMode = 'ai';
    mockSetMode.mockClear();

    render(<ModeSelector />);

    const classicButton = screen.getByRole('button', { name: /classic/i });
    await user.click(classicButton);

    expect(mockSetMode).toHaveBeenCalledWith('classic');
  });

  it('should call setMode when AI mode is clicked', async () => {
    const user = userEvent.setup();
    mockMode = 'classic';
    mockSetMode.mockClear();

    render(<ModeSelector />);

    const aiButton = screen.getByRole('button', { name: /ai mode/i });
    await user.click(aiButton);

    expect(mockSetMode).toHaveBeenCalledWith('ai');
  });

  it('should display mode icons', () => {
    render(<ModeSelector />);

    const classicButton = screen.getByRole('button', { name: /classic/i });
    const aiButton = screen.getByRole('button', { name: /ai mode/i });

    expect(classicButton).toHaveTextContent('🔮');
    expect(aiButton).toHaveTextContent('🤖');
  });
});
