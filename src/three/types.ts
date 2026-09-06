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

export interface TopologySceneOptions {
  readonly isReducedMotion?: boolean;
  readonly isMobile?: boolean;
  readonly dpr?: number;
}

export interface TopologySceneController {
  readonly domElement: HTMLCanvasElement;
  setPointer(x: number, y: number): void;
  setScrollProgress(progress: number): void;
  pause(): void;
  resume(): void;
  resize(width: number, height: number): void;
  dispose(): void;
}

