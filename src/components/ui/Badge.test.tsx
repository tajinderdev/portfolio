import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Primitive', () => {
  it('renders default badge', () => {
    render(<Badge>Frontend</Badge>);
    const badge = screen.getByText('Frontend');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-text-secondary');
  });

  it('renders accent variant', () => {
    render(<Badge variant="accent">New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('text-accent');
  });

  it('renders mono variant with JetBrains Mono font class', () => {
    render(<Badge variant="mono">TypeScript</Badge>);
    const badge = screen.getByText('TypeScript');
    expect(badge).toHaveClass('font-mono');
  });
});
