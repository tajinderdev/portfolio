import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Primitive', () => {
  it('renders default card with surface styling and padding', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-surface');
    expect(card).toHaveClass('p-6');
  });

  it('renders elevated card variant', () => {
    render(<Card variant="elevated">Elevated Content</Card>);
    const card = screen.getByText('Elevated Content');
    expect(card).toHaveClass('bg-surface-elevated');
  });

  it('renders interactive card variant with hover styles', () => {
    render(<Card variant="interactive">Interactive Content</Card>);
    const card = screen.getByText('Interactive Content');
    expect(card).toHaveClass('hover:border-accent/40');
  });
});
