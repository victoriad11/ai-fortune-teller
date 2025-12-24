import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionInput } from '../QuestionInput';
import type { AppState } from '@/types';

// Mock the store
const mockSetCurrentQuestion = vi.fn();
let mockCurrentQuestion = '';
let mockAppState: AppState = 'idle';

vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    currentQuestion: mockCurrentQuestion,
    setCurrentQuestion: mockSetCurrentQuestion,
    appState: mockAppState,
  }),
}));

describe('QuestionInput', () => {
  const mockOnSubmit = vi.fn();
  const mockOnAskAnother = vi.fn();

  beforeEach(() => {
    mockSetCurrentQuestion.mockClear();
    mockOnSubmit.mockClear();
    mockOnAskAnother.mockClear();
    mockCurrentQuestion = '';
    mockAppState = 'idle';
  });

  it('should render input with placeholder', () => {
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);
    expect(screen.getByPlaceholderText(/ask your question/i)).toBeInTheDocument();
  });

  it('should render Shake the Ball button when idle', () => {
    mockAppState = 'idle';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);
    expect(screen.getByRole('button', { name: /shake the ball/i })).toBeInTheDocument();
  });

  it('should render Ask Another Question button when answered', () => {
    mockAppState = 'answered';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);
    expect(screen.getByRole('button', { name: /ask another question/i })).toBeInTheDocument();
  });

  it('should call setCurrentQuestion when typing in input', async () => {
    const user = userEvent.setup();
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    await user.type(input, 'Will I succeed?');

    expect(mockSetCurrentQuestion).toHaveBeenCalled();
  });

  it('should disable input when shaking', () => {
    mockAppState = 'shaking';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    expect(input).toBeDisabled();
  });

  it('should disable input when revealing', () => {
    mockAppState = 'revealing';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    expect(input).toBeDisabled();
  });

  it('should disable input when answered', () => {
    mockAppState = 'answered';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    expect(input).toBeDisabled();
  });

  it('should show clear button when there is text', () => {
    mockCurrentQuestion = 'Test question';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    expect(screen.getByRole('button', { name: /clear question/i })).toBeInTheDocument();
  });

  it('should not show clear button when input is empty', () => {
    mockCurrentQuestion = '';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    expect(screen.queryByRole('button', { name: /clear question/i })).not.toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup();
    mockCurrentQuestion = 'Test question';
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const clearButton = screen.getByRole('button', { name: /clear question/i });
    await user.click(clearButton);

    expect(mockSetCurrentQuestion).toHaveBeenCalledWith('');
  });

  it('should call onSubmit when Shake button is clicked', async () => {
    const user = userEvent.setup();
    mockCurrentQuestion = 'Will I be happy?';
    mockAppState = 'idle';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const shakeButton = screen.getByRole('button', { name: /shake the ball/i });
    await user.click(shakeButton);

    expect(mockOnSubmit).toHaveBeenCalledOnce();
  });

  it('should disable Shake button when input is empty', () => {
    mockCurrentQuestion = '';
    mockAppState = 'idle';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const shakeButton = screen.getByRole('button', { name: /shake the ball/i });
    expect(shakeButton).toBeDisabled();
  });

  it('should disable Shake button when shaking', () => {
    mockCurrentQuestion = 'Test question';
    mockAppState = 'shaking';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const shakeButton = screen.getByRole('button', { name: /shaking/i });
    expect(shakeButton).toBeDisabled();
  });

  it('should show "Shaking..." text when shaking', () => {
    mockCurrentQuestion = 'Test question';
    mockAppState = 'shaking';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    expect(screen.getByRole('button', { name: /shaking/i })).toBeInTheDocument();
  });

  it('should call onAskAnother when Ask Another Question button is clicked', async () => {
    const user = userEvent.setup();
    mockAppState = 'answered';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const askAnotherButton = screen.getByRole('button', { name: /ask another question/i });
    await user.click(askAnotherButton);

    expect(mockOnAskAnother).toHaveBeenCalledOnce();
  });

  it('should call onSubmit when Enter key is pressed with valid input', async () => {
    const user = userEvent.setup();
    mockCurrentQuestion = 'Test question';
    mockAppState = 'idle';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    await user.click(input);
    await user.keyboard('{Enter}');

    expect(mockOnSubmit).toHaveBeenCalledOnce();
  });

  it('should not call onSubmit when Enter is pressed with empty input', async () => {
    const user = userEvent.setup();
    mockCurrentQuestion = '';
    mockAppState = 'idle';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    await user.click(input);
    await user.keyboard('{Enter}');

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should not call onSubmit when Enter is pressed while shaking', async () => {
    const user = userEvent.setup();
    mockCurrentQuestion = 'Test question';
    mockAppState = 'shaking';

    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    await user.click(input);
    await user.keyboard('{Enter}');

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should have maxLength of 200 characters', () => {
    render(<QuestionInput onSubmit={mockOnSubmit} onAskAnother={mockOnAskAnother} />);

    const input = screen.getByRole('textbox', { name: /enter your question/i });
    expect(input).toHaveAttribute('maxLength', '200');
  });
});
