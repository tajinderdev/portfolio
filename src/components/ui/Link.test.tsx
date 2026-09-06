import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Link Primitive', () => {
  it('renders internal link without external attributes', () => {
    render(<Link href="#work">View Work</Link>);
    const link = screen.getByRole('link', { name: /view work/i });
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('automatically adds security and accessibility attributes to external links', () => {
    render(<Link href="https://example.com">External Site</Link>);
    const link = screen.getByRole('link', { name: /external site/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('(opens in a new tab)')).toBeInTheDocument();
  });
});
