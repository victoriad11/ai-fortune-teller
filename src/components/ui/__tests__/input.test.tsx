import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input', () => {
  it('should render with default props', () => {
    render(<Input aria-label="Test input" />);
    const input = screen.getByRole('textbox', { name: /test input/i });
    expect(input).toBeInTheDocument();
  });

  it('should render with password type', () => {
    render(<Input type="password" aria-label="Password input" />);
    const input = screen.getByLabelText(/password input/i);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render with email type', () => {
    render(<Input type="email" aria-label="Email input" />);
    const input = screen.getByRole('textbox', { name: /email input/i });
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should display placeholder text', () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText(/enter your name/i);
    expect(input).toBeInTheDocument();
  });

  it('should handle user input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name input" />);
    const input = screen.getByRole('textbox', { name: /name input/i });

    await user.type(input, 'John Doe');
    expect(input).toHaveValue('John Doe');
  });

  it('should handle onChange events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} aria-label="Test input" />);
    const input = screen.getByRole('textbox', { name: /test input/i });

    await user.type(input, 'Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled aria-label="Disabled input" />);
    const input = screen.getByRole('textbox', { name: /disabled input/i });
    expect(input).toBeDisabled();
  });

  it('should not accept input when disabled', async () => {
    const user = userEvent.setup();
    render(<Input disabled aria-label="Disabled input" />);
    const input = screen.getByRole('textbox', { name: /disabled input/i });

    await user.type(input, 'Test');
    expect(input).toHaveValue('');
  });

  it('should render with default value', () => {
    render(<Input defaultValue="Initial value" aria-label="Default value input" />);
    const input = screen.getByRole('textbox', { name: /default value input/i });
    expect(input).toHaveValue('Initial value');
  });

  it('should render with controlled value', () => {
    render(<Input value="Controlled value" onChange={() => {}} aria-label="Controlled input" />);
    const input = screen.getByRole('textbox', { name: /controlled input/i });
    expect(input).toHaveValue('Controlled value');
  });

  it('should respect maxLength attribute', async () => {
    const user = userEvent.setup();
    render(<Input maxLength={5} aria-label="Max length input" />);
    const input = screen.getByRole('textbox', { name: /max length input/i });

    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello');
  });

  it('should respect required attribute', () => {
    render(<Input required aria-label="Required input" />);
    const input = screen.getByRole('textbox', { name: /required input/i });
    expect(input).toBeRequired();
  });

  it('should respect readOnly attribute', () => {
    render(<Input readOnly aria-label="Read only input" />);
    const input = screen.getByRole('textbox', { name: /read only input/i });
    expect(input).toHaveAttribute('readOnly');
  });

  it('should forward ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} aria-label="Ref input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should support name attribute', () => {
    render(<Input name="username" aria-label="Username input" />);
    const input = screen.getByRole('textbox', { name: /username input/i });
    expect(input).toHaveAttribute('name', 'username');
  });

  it('should support id attribute', () => {
    render(<Input id="email-input" aria-label="Email input" />);
    const input = screen.getByRole('textbox', { name: /email input/i });
    expect(input).toHaveAttribute('id', 'email-input');
  });

  it('should handle onFocus and onBlur events', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const user = userEvent.setup();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} aria-label="Focus input" />);
    const input = screen.getByRole('textbox', { name: /focus input/i });

    await user.click(input);
    expect(handleFocus).toHaveBeenCalledOnce();

    await user.tab();
    expect(handleBlur).toHaveBeenCalledOnce();
  });

  it('should support number type', () => {
    render(<Input type="number" aria-label="Number input" />);
    const input = screen.getByRole('spinbutton', { name: /number input/i });
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should support autoComplete attribute', () => {
    render(<Input autoComplete="email" aria-label="Autocomplete input" />);
    const input = screen.getByRole('textbox', { name: /autocomplete input/i });
    expect(input).toHaveAttribute('autoComplete', 'email');
  });
});
