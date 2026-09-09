import { type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader } from '@/components/typography';
import { ProfileCard } from './ProfileCard';
import { CorePrinciples } from './CorePrinciples';
import { SystemThinkingTrace } from './SystemThinkingTrace';
import type { ProfileContent } from '@/content/models';

export interface AboutProps {
  readonly profile: ProfileContent;
  readonly className?: string;
}

export function About({ profile, className = '' }: AboutProps): ReactElement {
  return (
    <Section id="about" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-12 sm:space-y-16">
        {/* Section Header */}
        <SectionHeader
          kicker="04 / ENGINEERING PHILOSOPHY"
          title="Systems over silos. Root causes over symptoms."
          description="Full-stack engineering grounded in deep domain analysis, architectural discipline, cross-functional collaboration, and pragmatic modernization."
        />

        {/* Top Grid: Profile Context & Core Principles (Left) + System Thinking Interactive Trace (Right) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Profile Card + Principles (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <ProfileCard profile={profile} />
            <CorePrinciples principles={profile.principles} />
          </div>

          {/* Right Column: Interactive System Thinking Trace (7 cols) */}
          <div className="lg:col-span-7">
            <SystemThinkingTrace systemThinking={profile.systemThinking} />
          </div>
        </div>
      </div>
    </Section>
  );
}
