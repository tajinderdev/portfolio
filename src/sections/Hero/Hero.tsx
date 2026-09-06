import type { ReactElement } from 'react';
import type { ProfileContent } from '@/content/models';
import { Container } from '@/components/layout';
import { HeroContent } from './HeroContent';
import { EngineeringBreadth } from './EngineeringBreadth';
import { SystemFlowVisualizer } from './SystemFlowVisualizer';

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
      {/* Atmospheric Background Layer with Hero Image */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle hero image backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity scale-105 filter blur-[1px]"
          style={{ backgroundImage: "url('/images/hero.webp')" }}
        />
        {/* Dark radial glow and gradient mask to protect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl" />
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
