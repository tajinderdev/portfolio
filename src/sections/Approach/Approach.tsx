import { type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader } from '@/components/typography';
import { EngineeringPillars } from './EngineeringPillars';
import type { PhilosophyTheme } from '@/content/models';

export interface ApproachProps {
  readonly themes: readonly PhilosophyTheme[];
  readonly className?: string;
}

export function Approach({ themes, className = '' }: ApproachProps): ReactElement {
  return (
    <Section id="approach" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <SectionHeader
        kicker="06 / APPROACH & METHODOLOGY"
        title="How I Think, Build, and Ship"
        description="Engineering principles applied across the complete software delivery lifecycle—from domain analysis to cloud deployment."
      />
      <div className="mt-12 sm:mt-16">
        <EngineeringPillars themes={themes} />
      </div>
    </Section>
  );
}
