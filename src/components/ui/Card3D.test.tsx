import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card3D } from './Card3D';

describe('Card3D Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children with 3D perspective styling', () => {
    render(
      <Card3D>
        <div>Card Content</div>
      </Card3D>
    );

    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('updates tilt transform on mouse move', () => {
    const { container } = render(
      <Card3D maxTilt={15}>
        <div>Interactive Content</div>
      </Card3D>
    );

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toBeInTheDocument();

    // Mock getBoundingClientRect
    vi.spyOn(cardElement, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 400,
      height: 300,
      right: 500,
      bottom: 400,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    // Fire mouse move near bottom right corner
    fireEvent.mouseMove(cardElement, {
      clientX: 400,
      clientY: 350,
    });

    // Assert transform was applied to the inner card
    const innerCard = cardElement.querySelector('[data-card3d-inner="true"]') as HTMLElement;
    expect(innerCard).toBeInTheDocument();
    expect(innerCard.style.transform).toContain('rotateX');
    expect(innerCard.style.transform).toContain('rotateY');
  });

  it('resets tilt transform on mouse leave', () => {
    const { container } = render(
      <Card3D>
        <div>Interactive Content</div>
      </Card3D>
    );

    const cardElement = container.firstChild as HTMLElement;
    const innerCard = cardElement.querySelector('[data-card3d-inner="true"]') as HTMLElement;

    fireEvent.mouseLeave(cardElement);

    expect(innerCard.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  });

  it('disables tilt when prefers-reduced-motion is active', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <Card3D>
        <div>Static Content</div>
      </Card3D>
    );

    const cardElement = container.firstChild as HTMLElement;
    const innerCard = cardElement.querySelector('[data-card3d-inner="true"]') as HTMLElement;

    fireEvent.mouseMove(cardElement, { clientX: 200, clientY: 200 });

    // Should stay at neutral transform
    expect(innerCard.style.transform).toBe('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  });
});
