import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

describe('Card', () => {
  it('should render Card component', () => {
    render(<Card data-testid="card">Card content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
  });

  it('should render CardHeader component', () => {
    render(
      <Card>
        <CardHeader data-testid="card-header">Header content</CardHeader>
      </Card>
    );
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByText(/header content/i)).toBeInTheDocument();
  });

  it('should render CardTitle component', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText(/card title/i)).toBeInTheDocument();
  });

  it('should render CardDescription component', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>This is a description</CardDescription>
        </CardHeader>
      </Card>
    );
    expect(screen.getByText(/this is a description/i)).toBeInTheDocument();
  });

  it('should render CardContent component', () => {
    render(
      <Card>
        <CardContent data-testid="card-content">Main content here</CardContent>
      </Card>
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByText(/main content here/i)).toBeInTheDocument();
  });

  it('should render CardFooter component', () => {
    render(
      <Card>
        <CardFooter data-testid="card-footer">Footer content</CardFooter>
      </Card>
    );
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();
    expect(screen.getByText(/footer content/i)).toBeInTheDocument();
  });

  it('should render complete card with all components', () => {
    render(
      <Card data-testid="complete-card">
        <CardHeader>
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>A card with all sections</CardDescription>
        </CardHeader>
        <CardContent>Main content area</CardContent>
        <CardFooter>Footer area</CardFooter>
      </Card>
    );

    expect(screen.getByTestId('complete-card')).toBeInTheDocument();
    expect(screen.getByText(/complete card/i)).toBeInTheDocument();
    expect(screen.getByText(/a card with all sections/i)).toBeInTheDocument();
    expect(screen.getByText(/main content area/i)).toBeInTheDocument();
    expect(screen.getByText(/footer area/i)).toBeInTheDocument();
  });

  it('should render nested elements in CardContent', () => {
    render(
      <Card>
        <CardContent>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText(/paragraph 1/i)).toBeInTheDocument();
    expect(screen.getByText(/paragraph 2/i)).toBeInTheDocument();
  });

  it('should render buttons in CardFooter', () => {
    render(
      <Card>
        <CardFooter>
          <button>Cancel</button>
          <button>Submit</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should support custom content in all sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>
            <span>Custom Title with </span>
            <strong>emphasis</strong>
          </CardTitle>
          <CardDescription>
            <em>Italic description</em>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </CardContent>
        <CardFooter>
          <a href="/link">Link</a>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText(/custom title with/i)).toBeInTheDocument();
    expect(screen.getByText(/emphasis/i)).toBeInTheDocument();
    expect(screen.getByText(/italic description/i)).toBeInTheDocument();
    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /link/i })).toBeInTheDocument();
  });

  it('should render Card without header or footer', () => {
    render(
      <Card data-testid="minimal-card">
        <CardContent>Just content</CardContent>
      </Card>
    );

    expect(screen.getByTestId('minimal-card')).toBeInTheDocument();
    expect(screen.getByText(/just content/i)).toBeInTheDocument();
  });

  it('should render multiple cards independently', () => {
    render(
      <>
        <Card data-testid="card-1">
          <CardTitle>Card 1</CardTitle>
        </Card>
        <Card data-testid="card-2">
          <CardTitle>Card 2</CardTitle>
        </Card>
      </>
    );

    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
    expect(screen.getByText(/card 1/i)).toBeInTheDocument();
    expect(screen.getByText(/card 2/i)).toBeInTheDocument();
  });
});
