import { useState, useEffect, type ReactElement } from 'react';
import type { ThreeSceneProps } from './types';

/**
 * ThreeBoundary
 *
 * Architectural boundary for 3D/WebGL experiences.
 * Ensures the website remains fully accessible, performant, and resilient
 * without depending unconditionally on WebGL or 3D assets.
 */
export function ThreeBoundary({
  className = '',
  fallback = null,
  children,
}: ThreeSceneProps): ReactElement {
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference safely
    const prefersReducedMotion =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    // Check basic WebGL support
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
      );
    } catch {
      hasWebGL = false;
    }

    setCanRender3D(hasWebGL && !prefersReducedMotion);
  }, []);

  if (!canRender3D) {
    return <div className={`three-fallback-container ${className}`}>{fallback}</div>;
  }

  return <div className={`three-scene-container ${className}`}>{children}</div>;
}
