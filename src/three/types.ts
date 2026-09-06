import type { ReactNode } from 'react';

export interface ThreeSceneProps {
  readonly className?: string;
  readonly fallback?: ReactNode;
  readonly children?: ReactNode;
}

export interface WebGLSupportStatus {
  readonly isSupported: boolean;
  readonly prefersReducedMotion: boolean;
}
