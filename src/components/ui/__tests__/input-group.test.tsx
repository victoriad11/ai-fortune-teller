import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputGroup, InputGroupInput, InputGroupAction } from '../input-group';

describe('InputGroup', () => {
  it('should render InputGroup with children', () => {
    render(
      <InputGroup data-testid="input-group">
        <InputGroupInput aria-label="Test input" />
      </InputGroup>
    );

    expect(screen.getByTestId('input-group')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /test input/i })).toBeInTheDocument();
  });

  it('should render all three components together', () => {
    render(
      <InputGroup data-testid="input-group">
        <InputGroupInput placeholder="Enter text" />
        <InputGroupAction aria-label="Clear">✕</InputGroupAction>
      </InputGroup>
    );

    expect(screen.getByTestId('input-group')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('should handle input changes in InputGroupInput', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <InputGroup>
        <InputGroupInput onChange={handleChange} aria-label="Name input" />
      </InputGroup>
    );

    const input = screen.getByRole('textbox', { name: /name input/i });
    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(input).toHaveValue('Hello');
  });

  it('should handle action button clicks', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <InputGroup>
        <InputGroupInput aria-label="Test input" />
        <InputGroupAction onClick={handleClick} aria-label="Action">⚡</InputGroupAction>
      </InputGroup>
    );

    const button = screen.getByRole('button', { name: /action/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should support disabled input', () => {
    render(
      <InputGroup>
        <InputGroupInput disabled aria-label="Disabled input" />
      </InputGroup>
    );

    const input = screen.getByRole('textbox', { name: /disabled input/i });
    expect(input).toBeDisabled();
  });

  it('should support disabled action button', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Input" />
        <InputGroupAction disabled aria-label="Disabled action">✕</InputGroupAction>
      </InputGroup>
    );

    const button = screen.getByRole('button', { name: /disabled action/i });
    expect(button).toBeDisabled();
  });

  it('should forward ref for InputGroup', () => {
    const ref = { current: null };
    render(
      <InputGroup ref={ref}>
        <InputGroupInput aria-label="Input" />
      </InputGroup>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should forward ref for InputGroupInput', () => {
    const ref = { current: null };
    render(
      <InputGroup>
        <InputGroupInput ref={ref} aria-label="Input" />
      </InputGroup>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should forward ref for InputGroupAction', () => {
    const ref = { current: null };
    render(
      <InputGroup>
        <InputGroupInput aria-label="Input" />
        <InputGroupAction ref={ref} aria-label="Action">✕</InputGroupAction>
      </InputGroup>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should render InputGroupAction as button type by default', () => {
    render(
      <InputGroup>
        <InputGroupAction aria-label="Action">✕</InputGroupAction>
      </InputGroup>
    );

    const button = screen.getByRole('button', { name: /action/i });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should handle placeholder in InputGroupInput', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Type here..." />
      </InputGroup>
    );

    expect(screen.getByPlaceholderText(/type here/i)).toBeInTheDocument();
  });

  it('should support maxLength in InputGroupInput', async () => {
    const user = userEvent.setup();

    render(
      <InputGroup>
        <InputGroupInput maxLength={5} aria-label="Limited input" />
      </InputGroup>
    );

    const input = screen.getByRole('textbox', { name: /limited input/i });
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello');
  });

  it('should support controlled input value', () => {
    render(
      <InputGroup>
        <InputGroupInput value="Controlled" onChange={() => {}} aria-label="Controlled input" />
      </InputGroup>
    );

    const input = screen.getByRole('textbox', { name: /controlled input/i });
    expect(input).toHaveValue('Controlled');
  });

  it('should work with multiple action buttons', async () => {
    const handleClear = vi.fn();
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <InputGroup>
        <InputGroupInput aria-label="Input" />
        <InputGroupAction onClick={handleClear} aria-label="Clear">✕</InputGroupAction>
        <InputGroupAction onClick={handleSubmit} aria-label="Submit">→</InputGroupAction>
      </InputGroup>
    );

    await user.click(screen.getByRole('button', { name: /clear/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleClear).toHaveBeenCalledOnce();
    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  it('should support different input types', () => {
    render(
      <InputGroup>
        <InputGroupInput type="email" aria-label="Email input" />
      </InputGroup>
    );

    const input = screen.getByRole('textbox', { name: /email input/i });
    expect(input).toHaveAttribute('type', 'email');
  });
});
