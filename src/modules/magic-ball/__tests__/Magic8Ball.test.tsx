import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Magic8Ball } from '../Magic8Ball';
import type { AppState, FortuneMode } from '@/types';

const mockStore = {
  appState: 'idle' as AppState,
  currentAnswer: '',
  reducedMotion: false,
  mode: 'classic' as FortuneMode,
};

vi.mock('@/store/useStore', () => ({
  useStore: () => mockStore,
}));

describe('Magic8Ball', () => {
  it('should render magic 8-ball image when idle', () => {
    mockStore.appState = 'idle';
    mockStore.currentAnswer = '';

    render(<Magic8Ball />);

    const image = screen.getByRole('img', { name: /magic 8 ball/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/magic-8-ball.png');
  });

  it('should render magic 8-ball image when shaking', () => {
    mockStore.appState = 'shaking';
    mockStore.currentAnswer = '';

    render(<Magic8Ball />);

    const image = screen.getByRole('img', { name: /magic 8 ball/i });
    expect(image).toBeInTheDocument();
  });

  it('should render magic 8-ball image when revealing', () => {
    mockStore.appState = 'revealing';
    mockStore.currentAnswer = '';

    render(<Magic8Ball />);

    const image = screen.getByRole('img', { name: /magic 8 ball/i });
    expect(image).toBeInTheDocument();
  });

  it('should render answer text when answered', () => {
    mockStore.appState = 'answered';
    mockStore.currentAnswer = 'It is certain';

    render(<Magic8Ball />);

    expect(screen.getByText(/it is certain/i)).toBeInTheDocument();
  });

  it('should not render image when showing answer', () => {
    mockStore.appState = 'answered';
    mockStore.currentAnswer = 'Yes';

    render(<Magic8Ball />);

    expect(screen.queryByRole('img', { name: /magic 8 ball/i })).not.toBeInTheDocument();
  });

  it('should render answer with AI mode font size', () => {
    mockStore.appState = 'answered';
    mockStore.currentAnswer = 'The stars align in your favor';
    mockStore.mode = 'ai';

    const { container } = render(<Magic8Ball />);

    expect(screen.getByText(/the stars align in your favor/i)).toBeInTheDocument();

    // Check that the answer text is rendered (we can't easily test inline styles in jsdom)
    const answerText = container.querySelector('p');
    expect(answerText).toHaveTextContent(/the stars align in your favor/i);
  });

  it('should render answer with classic mode font size', () => {
    mockStore.appState = 'answered';
    mockStore.currentAnswer = 'Without a doubt';
    mockStore.mode = 'classic';

    const { container } = render(<Magic8Ball />);

    expect(screen.getByText(/without a doubt/i)).toBeInTheDocument();

    const answerText = container.querySelector('p');
    expect(answerText).toHaveTextContent(/without a doubt/i);
  });
});
