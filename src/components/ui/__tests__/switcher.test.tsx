import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SwitcherRoot, SwitcherItem } from '../switcher';

describe('Switcher', () => {
  it('should render SwitcherRoot with children', () => {
    render(
      <SwitcherRoot value="option1" onValueChange={() => {}}>
        <SwitcherItem value="option1">Option 1</SwitcherItem>
        <SwitcherItem value="option2">Option 2</SwitcherItem>
      </SwitcherRoot>
    );

    expect(screen.getByRole('button', { name: /option 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /option 2/i })).toBeInTheDocument();
  });

  it('should call onValueChange when item is clicked', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SwitcherRoot value="option1" onValueChange={handleValueChange}>
        <SwitcherItem value="option1">Option 1</SwitcherItem>
        <SwitcherItem value="option2">Option 2</SwitcherItem>
      </SwitcherRoot>
    );

    const option2 = screen.getByRole('button', { name: /option 2/i });
    await user.click(option2);

    expect(handleValueChange).toHaveBeenCalledWith('option2');
  });

  it('should work with different value types', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SwitcherRoot value={1} onValueChange={handleValueChange}>
        <SwitcherItem value={1}>One</SwitcherItem>
        <SwitcherItem value={2}>Two</SwitcherItem>
      </SwitcherRoot>
    );

    const twoButton = screen.getByRole('button', { name: /two/i });
    await user.click(twoButton);

    expect(handleValueChange).toHaveBeenCalledWith(2);
  });

  it('should render items with icons', () => {
    render(
      <SwitcherRoot value="classic" onValueChange={() => {}}>
        <SwitcherItem value="classic" icon="🔮">Classic</SwitcherItem>
        <SwitcherItem value="ai" icon="🤖">AI</SwitcherItem>
      </SwitcherRoot>
    );

    const classicButton = screen.getByRole('button', { name: /classic/i });
    const aiButton = screen.getByRole('button', { name: /ai/i });

    expect(classicButton).toHaveTextContent('🔮');
    expect(aiButton).toHaveTextContent('🤖');
  });

  it('should handle multiple clicks', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SwitcherRoot value="a" onValueChange={handleValueChange}>
        <SwitcherItem value="a">A</SwitcherItem>
        <SwitcherItem value="b">B</SwitcherItem>
      </SwitcherRoot>
    );

    const buttonA = screen.getByRole('button', { name: /^a$/i });
    const buttonB = screen.getByRole('button', { name: /^b$/i });

    await user.click(buttonB);
    await user.click(buttonA);
    await user.click(buttonB);

    expect(handleValueChange).toHaveBeenCalledTimes(3);
    expect(handleValueChange).toHaveBeenNthCalledWith(1, 'b');
    expect(handleValueChange).toHaveBeenNthCalledWith(2, 'a');
    expect(handleValueChange).toHaveBeenNthCalledWith(3, 'b');
  });

  it('should throw error when SwitcherItem is used outside SwitcherRoot', () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<SwitcherItem value="test">Test</SwitcherItem>);
    }).toThrow('Switcher components must be used within SwitcherRoot');

    consoleError.mockRestore();
  });

  it('should support disabled state on items', () => {
    render(
      <SwitcherRoot value="option1" onValueChange={() => {}}>
        <SwitcherItem value="option1">Option 1</SwitcherItem>
        <SwitcherItem value="option2" disabled>Option 2</SwitcherItem>
      </SwitcherRoot>
    );

    const option2 = screen.getByRole('button', { name: /option 2/i });
    expect(option2).toBeDisabled();
  });

  it('should not call onValueChange when disabled item is clicked', async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SwitcherRoot value="option1" onValueChange={handleValueChange}>
        <SwitcherItem value="option1">Option 1</SwitcherItem>
        <SwitcherItem value="option2" disabled>Option 2</SwitcherItem>
      </SwitcherRoot>
    );

    const option2 = screen.getByRole('button', { name: /option 2/i });
    await user.click(option2);

    expect(handleValueChange).not.toHaveBeenCalled();
  });

  it('should render correct button type', () => {
    render(
      <SwitcherRoot value="option1" onValueChange={() => {}}>
        <SwitcherItem value="option1">Option 1</SwitcherItem>
      </SwitcherRoot>
    );

    const button = screen.getByRole('button', { name: /option 1/i });
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should work with complex object values', async () => {
    const obj1 = { id: 1, name: 'First' };
    const obj2 = { id: 2, name: 'Second' };
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SwitcherRoot value={obj1} onValueChange={handleValueChange}>
        <SwitcherItem value={obj1}>First</SwitcherItem>
        <SwitcherItem value={obj2}>Second</SwitcherItem>
      </SwitcherRoot>
    );

    const secondButton = screen.getByRole('button', { name: /second/i });
    await user.click(secondButton);

    expect(handleValueChange).toHaveBeenCalledWith(obj2);
  });
});
