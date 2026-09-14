import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader } from '@/components/typography';
import { EngineeringPillars } from './EngineeringPillars';
import { ApproachModal } from './ApproachModal';
import type { PhilosophyTheme } from '@/content/models';

export interface ApproachProps {
  readonly themes: readonly PhilosophyTheme[];
  readonly className?: string;
}

export function Approach({ themes, className = '' }: ApproachProps): ReactElement {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const activeTheme = themes.find((t) => t.id === selectedThemeId) ?? null;

  return (
    <Section id="approach" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <SectionHeader
        kicker="06 / APPROACH & METHODOLOGY"
        title="Approach & Methodology"
        description="Engineering principles applied across the complete software delivery lifecycle—from domain analysis to cloud deployment."
      />
      <div className="mt-8 sm:mt-10">
        <EngineeringPillars
          themes={themes}
          selectedThemeId={selectedThemeId ?? ''}
          onSelectTheme={(id) => setSelectedThemeId(id)}
        />
      </div>

      {/* Centered Pillar Details Modal */}
      <ApproachModal
        theme={activeTheme}
        themes={themes}
        isOpen={activeTheme !== null}
        onClose={() => setSelectedThemeId(null)}
        onSelectTheme={(theme) => setSelectedThemeId(theme.id)}
      />
    </Section>
  );
}
