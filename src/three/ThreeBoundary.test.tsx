import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThreeBoundary } from './ThreeBoundary';

describe('ThreeBoundary Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders fallback content gracefully when WebGL is absent', () => {
    // jsdom defaults to no WebGL support
    render(
      <ThreeBoundary fallback={<div>Static Architecture Diagram</div>}>
        <div>3D WebGL Canvas Scene</div>
      </ThreeBoundary>,
    );

    expect(screen.getByText('Static Architecture Diagram')).toBeInTheDocument();
    expect(screen.queryByText('3D WebGL Canvas Scene')).not.toBeInTheDocument();
  });

  it('renders fallback content when prefers-reduced-motion is active', () => {
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

    render(
      <ThreeBoundary fallback={<div>Reduced Motion Static Fallback</div>}>
        <div>Animated 3D Scene</div>
      </ThreeBoundary>,
    );

    expect(screen.getByText('Reduced Motion Static Fallback')).toBeInTheDocument();
    expect(screen.queryByText('Animated 3D Scene')).not.toBeInTheDocument();
  });

  it('renders children when WebGL is supported and reduced motion is disabled', () => {
    // Mock WebGL context and window.WebGLRenderingContext
    const originalWebGLRenderingContext = (window as unknown as { WebGLRenderingContext?: unknown }).WebGLRenderingContext;
    (window as unknown as { WebGLRenderingContext?: unknown }).WebGLRenderingContext = function () {};

    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextId: string) => {
      if (contextId === 'webgl' || contextId === 'experimental-webgl') {
        return {} as WebGLRenderingContext;
      }
      return null;
    });

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <ThreeBoundary fallback={<div>Fallback</div>}>
        <div>Interactive 3D Topology Scene</div>
      </ThreeBoundary>,
    );

    expect(screen.getByText('Interactive 3D Topology Scene')).toBeInTheDocument();
    expect(screen.queryByText('Fallback')).not.toBeInTheDocument();

    HTMLCanvasElement.prototype.getContext = originalGetContext;
    (window as unknown as { WebGLRenderingContext?: unknown }).WebGLRenderingContext = originalWebGLRenderingContext;
  });
});
