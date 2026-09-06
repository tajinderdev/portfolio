import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Primitive', () => {
  it('renders with children and default primary variant', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('bg-accent');
  });

  it('renders disabled state properly', () => {
    render(<Button disabled>Disabled Action</Button>);
    const btn = screen.getByRole('button', { name: /disabled action/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders loading spinner and sets aria-disabled', () => {
    render(<Button isLoading>Submitting</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('supports polymorphic rendering as an anchor tag', () => {
    render(
      <Button as="a" href="https://example.com">
        Link Button
      </Button>,
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
