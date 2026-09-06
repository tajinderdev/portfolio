import { lazy, Suspense, type ReactElement } from 'react';
import type { ProfileContent } from '@/content/models';
import { Container } from '@/components/layout';
import { ThreeBoundary } from '@/three';
import { HeroContent } from './HeroContent';
import { EngineeringBreadth } from './EngineeringBreadth';
import { SystemFlowVisualizer } from './SystemFlowVisualizer';

// Lazy-load the 3D topology scene to keep initial entry bundle weight at 0 KB
const HeroTopologyScene = lazy(() => import('@/three/HeroScene'));

export interface HeroProps {
  profile: ProfileContent;
}

export function Hero({ profile }: HeroProps): ReactElement {
  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative w-full overflow-hidden border-b border-border-subtle pt-12 pb-20 sm:pt-16 sm:pb-28 lg:py-32"
    >
      {/* Atmospheric Background Layer with 3D Topology Mesh */}
      <div
        className="absolute inset-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle hero backdrop texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-luminosity filter blur-[2px] pointer-events-none"
          style={{ backgroundImage: "url('/images/hero.webp')" }}
        />

        {/* Soft radial backdrop behind 3D canvas so dark background is pristine and deep */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_var(--color-background)_95%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* 3D WebGL Distributed System Topology (100% sharp, zero overlay blur) */}
        <div className="absolute inset-0 opacity-100">
          <ThreeBoundary
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

      {/* Hero Content Container: 12-Column Responsive Layout */}
      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Positioning, Promise, CTAs & Breadth (7 Columns) */}
          <div className="lg:col-span-7 space-y-10">
            <HeroContent profile={profile} />
            <EngineeringBreadth items={profile.engineeringBreadth} />
          </div>

          {/* Right Column: Interactive System Architecture Flow (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SystemFlowVisualizer />
          </div>
        </div>
      </Container>
    </section>
  );
}
