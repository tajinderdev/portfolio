import { useEffect, useRef, type ReactElement } from 'react';
import { createTopologyScene } from './createTopologyScene';
import type { TopologySceneController } from '../types';

export interface HeroTopologySceneProps {
  readonly className?: string;
}

export function HeroTopologyScene({
  className = '',
}: HeroTopologySceneProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<TopologySceneController | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const isMobile =
      typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Initialize the Three.js topology scene
    const controller = createTopologyScene(container, {
      isReducedMotion: prefersReducedMotion,
      isMobile,
    });
    controllerRef.current = controller;

    // 1. Mouse movement / pointer parallax (desktop only)
    const handlePointerMove = (event: MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      controller.setPointer(x, y);
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    // 2. Responsive resize observer
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            controller.resize(width, height);
          }
        }
      });
      resizeObserver.observe(container);
    }

    // 3. Viewport IntersectionObserver to achieve 0% GPU usage offscreen
    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.02) {
              controller.resume();
            } else {
              controller.pause();
            }
          }
        },
        { threshold: [0, 0.05, 0.1] }
      );
      intersectionObserver.observe(container);
    }

    // 4. Deterministic cleanup
    return () => {
      if (!isMobile && !prefersReducedMotion) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      controller.dispose();
      controllerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}

export default HeroTopologyScene;
