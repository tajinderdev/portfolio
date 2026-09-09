import { lazy, Suspense, type ReactElement } from 'react';
import { ThreeBoundary } from '@/three';

const HeroTopologyScene = lazy(() => import('@/three/HeroScene'));

export function GlobalBackground(): ReactElement {
  return (
    <div
      className="fixed inset-0 w-screen h-screen select-none overflow-hidden z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Base background color to ensure strong contrast in both modes */}
      <div className="absolute inset-0 bg-background transition-colors duration-500" />
      
      {/* Blue and Green gradient orb for visual depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-gradient-to-br from-accent/15 to-blue-500/20 sm:from-accent/20 sm:to-blue-500/25 rounded-full blur-[100px] pointer-events-none mix-blend-normal transition-opacity duration-500" />
      
      {/* Glassmorphism frosted overlay to diffuse the blue orb smoothly */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-3xl pointer-events-none transition-colors duration-500" />

      {/* 3D WebGL Distributed System Topology (100% sharp, zero overlay blur) */}
      <div className="absolute inset-0 opacity-100">
        <ThreeBoundary
          className="w-full h-full absolute inset-0"
          fallback={
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          }
        >
          <Suspense fallback={null}>
            <HeroTopologyScene />
          </Suspense>
        </ThreeBoundary>
      </div>
    </div>
  );
}
