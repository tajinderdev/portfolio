import { useState, type ReactElement } from 'react';
import { Section } from '@/components/layout';
import { SectionHeader, MonoText } from '@/components/typography';
import { CareerProgressionTracker } from './CareerProgressionTracker';
import { ExperienceCard } from './ExperienceCard';
import type { ExperienceItem } from '@/content/models';

export interface ExperienceProps {
  readonly experiences: readonly ExperienceItem[];
  readonly className?: string;
}

export function Experience({
  experiences,
  className = '',
}: ExperienceProps): ReactElement {
  // Default to having the most senior/current role expanded for immediate scanning
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set([experiences[0]?.id ?? 'exp-current']),
  );
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | undefined>(
    experiences[0]?.id,
  );

  const toggleExpand = (id: string): void => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = (): void => {
    setExpandedIds(new Set(experiences.map((e) => e.id)));
  };

  const handleCollapseAll = (): void => {
    setExpandedIds(new Set());
  };

  const handleSelectStage = (id: string): void => {
    setSelectedMilestoneId(id);
    setExpandedIds((prev) => new Set(prev).add(id));
    const targetElement = document.getElementById(`heading-${id}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const allExpanded = experiences.length > 0 && expandedIds.size === experiences.length;

  return (
    <Section id="experience" spacing="default" className={`border-b border-border-subtle ${className}`}>
      <div className="space-y-10 sm:space-y-12">
        {/* Section Header */}
        <SectionHeader
          kicker="02 / CAREER PROGRESSION"
          title="Engineering progression from implementation to systems architecture."
          description="7+ years building, modernizing, and supporting web platforms across diverse business domains—progressing from core implementation to architectural ownership, technical leadership, and AI augmentation."
        />

        {/* Visual Progression Stepper Arc */}
        <CareerProgressionTracker
          activeId={selectedMilestoneId}
          onSelectStage={handleSelectStage}
        />

        {/* Global Toolbar: Count & Expand/Collapse Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider">
              {experiences.length} Chronological Milestones (2019 — Present)
            </MonoText>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={allExpanded ? handleCollapseAll : handleExpandAll}
              className="rounded border border-border-subtle/80 bg-surface/50 px-3 py-1 font-mono text-xs font-medium text-text-secondary transition-colors hover:border-border hover:bg-surface-raised hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {allExpanded ? 'Collapse All' : 'Expand All Details'}
            </button>
          </div>
        </div>

        {/* Experience Timeline Stream */}
        <div className="relative space-y-8 pl-0 sm:pl-6 before:hidden sm:before:block before:absolute before:left-2 before:top-4 before:bottom-4 before:w-px before:bg-border-subtle/80">
          {experiences.map((experience) => (
            <div key={experience.id} className="relative">
              {/* Timeline Indicator Dot (Desktop) */}
              <div
                aria-hidden="true"
                className="hidden sm:flex absolute -left-6 top-7 -translate-x-1/2 h-3.5 w-3.5 items-center justify-center rounded-full border border-border-subtle bg-background"
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    expandedIds.has(experience.id) ? 'bg-accent' : 'bg-text-muted/40'
                  }`}
                />
              </div>

              <ExperienceCard
                experience={experience}
                isExpanded={expandedIds.has(experience.id)}
                onToggleExpand={() => toggleExpand(experience.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
