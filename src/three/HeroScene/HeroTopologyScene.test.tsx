import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { HeroTopologyScene } from './HeroTopologyScene';
import * as sceneModule from './createTopologyScene';

describe('HeroTopologyScene Component', () => {
  const mockController = {
    domElement: document.createElement('canvas'),
    setPointer: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(sceneModule, 'createTopologyScene').mockReturnValue(mockController);

    // Mock IntersectionObserver
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn().mockReturnValue([]);
    }

    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

    // Mock ResizeObserver
    class MockResizeObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
  });

  it('initializes topology scene engine on mount', () => {
    const { container } = render(<HeroTopologyScene />);

    expect(sceneModule.createTopologyScene).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('disposes the scene engine on unmount to prevent WebGL leaks', () => {
    const { unmount } = render(<HeroTopologyScene />);

    unmount();

    expect(mockController.dispose).toHaveBeenCalledTimes(1);
  });

  it('sets up IntersectionObserver to throttle offscreen rendering', () => {
    let observerCallback: IntersectionObserverCallback | null = null;

    class CapturingIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }

    window.IntersectionObserver = CapturingIntersectionObserver as unknown as typeof IntersectionObserver;

    render(<HeroTopologyScene />);

    expect(observerCallback).toBeTypeOf('function');

    // Simulate scrolled offscreen
    if (observerCallback) {
      (observerCallback as IntersectionObserverCallback)(
        [{ isIntersecting: false, intersectionRatio: 0 } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
      expect(mockController.pause).toHaveBeenCalled();

      // Simulate scrolled back into view
      (observerCallback as IntersectionObserverCallback)(
        [{ isIntersecting: true, intersectionRatio: 0.5 } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
      expect(mockController.resume).toHaveBeenCalled();
    }
  });
});
