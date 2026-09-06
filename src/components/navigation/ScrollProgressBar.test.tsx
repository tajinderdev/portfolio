import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollProgressBar } from './ScrollProgressBar';

describe('ScrollProgressBar Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with progressbar semantics and accessible labels', () => {
    render(<ScrollProgressBar />);

    const bar = screen.getByRole('progressbar', { name: /reading progress/i });
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('updates scaleX and aria-valuenow on window scroll', () => {
    render(<ScrollProgressBar />);

    const bar = screen.getByRole('progressbar', { name: /reading progress/i });
    const indicator = bar.querySelector('[data-progress-indicator="true"]') as HTMLElement;
    expect(indicator).toBeInTheDocument();

    // Mock document heights
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', {
      value: 500,
      configurable: true,
    });

    fireEvent.scroll(window);

    expect(indicator.style.transform).toBe('scaleX(0.5)');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
  });

  it('handles zero scrollable height safely without throwing', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      configurable: true,
    });

    render(<ScrollProgressBar />);
    const bar = screen.getByRole('progressbar', { name: /reading progress/i });
    const indicator = bar.querySelector('[data-progress-indicator="true"]') as HTMLElement;

    expect(indicator.style.transform).toBe('scaleX(0)');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });
});
