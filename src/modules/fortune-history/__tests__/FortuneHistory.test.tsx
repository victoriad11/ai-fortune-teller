import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FortuneHistory } from '../FortuneHistory';
import type { Fortune } from '@/types';

// Mock the store
const mockClearHistory = vi.fn();
const mockFortunes: Fortune[] = [];

vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    fortunes: mockFortunes,
    clearHistory: mockClearHistory,
  }),
}));

describe('FortuneHistory', () => {
  beforeEach(() => {
    mockClearHistory.mockClear();
    mockFortunes.length = 0;
  });

  it('should not render when there are no fortunes', () => {
    const { container } = render(<FortuneHistory />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render toggle button with fortune count', () => {
    mockFortunes.push(
      {
        id: '1',
        question: 'Test question?',
        answer: 'Test answer',
        mode: 'classic',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);
    expect(screen.getByRole('button', { name: /view history \(1\)/i })).toBeInTheDocument();
  });

  it('should toggle history panel open and closed', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      {
        id: '1',
        question: 'Will I succeed?',
        answer: 'Yes',
        mode: 'classic',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);

    const toggleButton = screen.getByRole('button', { name: /view history \(1\)/i });

    expect(screen.queryByText(/will i succeed/i)).not.toBeInTheDocument();

    await user.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText(/will i succeed/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /hide history \(1\)/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /hide history \(1\)/i }));

    await waitFor(() => {
      expect(screen.queryByText(/will i succeed/i)).not.toBeInTheDocument();
    });
  });

  it('should display fortune with AI mode label', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      {
        id: '1',
        question: 'What does the future hold?',
        answer: 'Great things are coming',
        mode: 'ai',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);
    await user.click(screen.getByRole('button', { name: /view history/i }));

    await waitFor(() => {
      expect(screen.getByText('🤖 AI')).toBeInTheDocument();
      expect(screen.getByText(/what does the future hold/i)).toBeInTheDocument();
      expect(screen.getByText(/great things are coming/i)).toBeInTheDocument();
    });
  });

  it('should display fortune with Classic mode label', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      {
        id: '1',
        question: 'Is this a good idea?',
        answer: 'Signs point to yes',
        mode: 'classic',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);
    await user.click(screen.getByRole('button', { name: /view history/i }));

    await waitFor(() => {
      expect(screen.getByText('🔮 Classic')).toBeInTheDocument();
      expect(screen.getByText(/is this a good idea/i)).toBeInTheDocument();
      expect(screen.getByText(/signs point to yes/i)).toBeInTheDocument();
    });
  });

  it('should display multiple fortunes', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      {
        id: '1',
        question: 'Question 1?',
        answer: 'Answer 1',
        mode: 'classic',
        timestamp: Date.now(),
      },
      {
        id: '2',
        question: 'Question 2?',
        answer: 'Answer 2',
        mode: 'ai',
        timestamp: Date.now(),
      },
      {
        id: '3',
        question: 'Question 3?',
        answer: 'Answer 3',
        mode: 'classic',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);

    expect(screen.getByRole('button', { name: /view history \(3\)/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /view history \(3\)/i }));

    await waitFor(() => {
      expect(screen.getByText(/question 1/i)).toBeInTheDocument();
      expect(screen.getByText(/question 2/i)).toBeInTheDocument();
      expect(screen.getByText(/question 3/i)).toBeInTheDocument();
      expect(screen.getByText(/answer 1/i)).toBeInTheDocument();
      expect(screen.getByText(/answer 2/i)).toBeInTheDocument();
      expect(screen.getByText(/answer 3/i)).toBeInTheDocument();
    });
  });

  it('should display formatted timestamp', async () => {
    const user = userEvent.setup();
    const timestamp = new Date('2025-01-15').getTime();
    mockFortunes.push(
      {
        id: '1',
        question: 'Test?',
        answer: 'Test answer',
        mode: 'classic',
        timestamp,
      }
    );

    render(<FortuneHistory />);
    await user.click(screen.getByRole('button', { name: /view history/i }));

    await waitFor(() => {
      const formattedDate = new Date(timestamp).toLocaleDateString();
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });
  });

  it('should call clearHistory when Clear All button is clicked', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      {
        id: '1',
        question: 'Test?',
        answer: 'Test',
        mode: 'classic',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);
    await user.click(screen.getByRole('button', { name: /view history/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /clear history/i })).toBeInTheDocument();
    });

    const clearButton = screen.getByRole('button', { name: /clear history/i });
    await user.click(clearButton);

    expect(mockClearHistory).toHaveBeenCalledOnce();
  });

  it('should show Fortune History title when open', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      {
        id: '1',
        question: 'Test?',
        answer: 'Test',
        mode: 'classic',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);

    expect(screen.queryByText(/fortune history/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /view history/i }));

    await waitFor(() => {
      expect(screen.getByText(/fortune history/i)).toBeInTheDocument();
    });
  });

  it('should render fortunes in correct order', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      { id: '1', question: 'First', answer: 'A1', mode: 'classic', timestamp: 1000 },
      { id: '2', question: 'Second', answer: 'A2', mode: 'ai', timestamp: 2000 },
      { id: '3', question: 'Third', answer: 'A3', mode: 'classic', timestamp: 3000 }
    );

    render(<FortuneHistory />);
    await user.click(screen.getByRole('button', { name: /view history/i }));

    await waitFor(() => {
      const questions = screen.getAllByText(/first|second|third/i);
      expect(questions).toHaveLength(3);
      expect(questions[0]).toHaveTextContent(/first/i);
      expect(questions[1]).toHaveTextContent(/second/i);
      expect(questions[2]).toHaveTextContent(/third/i);
    });
  });

  it('should handle empty question and answer', async () => {
    const user = userEvent.setup();
    mockFortunes.push(
      {
        id: '1',
        question: '',
        answer: '',
        mode: 'classic',
        timestamp: Date.now(),
      }
    );

    render(<FortuneHistory />);
    await user.click(screen.getByRole('button', { name: /view history/i }));

    await waitFor(() => {
      expect(screen.getByText('🔮 Classic')).toBeInTheDocument();
    });
  });
});
