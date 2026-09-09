import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge, Card } from '@/components/ui';
import type { ExperienceItem } from '@/content/models';

export interface ExperienceCardProps {
  readonly experience: ExperienceItem;
  readonly isExpanded: boolean;
  readonly onToggleExpand: () => void;
  readonly className?: string;
}

export function ExperienceCard({
  experience,
  isExpanded,
  onToggleExpand,
  className = '',
}: ExperienceCardProps): ReactElement {
  const detailsId = `exp-details-${experience.id}`;

  return (
    <Card
      as="article"
      variant="interactive"
      className={`p-6 transition-all duration-200 sm:p-8 ${
        isExpanded ? 'border-border ring-1 ring-border-subtle' : 'border-border-subtle'
      } ${className}`}
      aria-labelledby={`heading-${experience.id}`}
    >
      {/* Top Header: Period, Stage & Specialization */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/70 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent" size="sm" className="font-mono font-semibold">
            {experience.period}
          </Badge>
          {experience.specialization && (
            <Badge variant="outline" size="sm" className="font-mono text-xs">
              {experience.specialization}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
          <span className="text-accent font-semibold">STAGE 0{experience.progressionIndex}</span>
          <span>·</span>
          <span>{experience.progressionStage}</span>
        </div>
      </div>

      {/* Role Title & Environment */}
      <div className="mb-4">
        <Heading
          as="h3"
          variant="card"
          id={`heading-${experience.id}`}
          className="text-xl sm:text-2xl font-bold text-text-primary"
        >
          {experience.role}
        </Heading>
        <MonoText size="xs" color="muted" className="mt-1 block font-medium">
          Context: {experience.environment}
        </MonoText>
      </div>

      {/* Primary Summary */}
      <Text variant="small" color="secondary" className="mb-5 leading-relaxed text-sm sm:text-base">
        {experience.summary}
      </Text>

      {/* Technologies Used */}
      <div className="mb-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded border border-border-subtle/60 bg-surface-raised/50 px-2 py-0.5 font-mono text-[11px] text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Disclosure Toggle */}
      <div className="border-t border-border-subtle/60 pt-4">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={onToggleExpand}
          className="group inline-flex items-center gap-2 rounded px-3 py-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent-muted/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>
            {isExpanded
              ? 'Hide Architectural & Delivery Details'
              : 'View Architectural & Delivery Details'}
          </span>
          <span className="sr-only"> for {experience.role} ({experience.period})</span>
          <span
            aria-hidden="true"
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          >
            ↓
          </span>
        </button>

        {/* Expanded Details Panel */}
        {isExpanded && (
          <div
            id={detailsId}
            className="mt-5 space-y-6 rounded-md border border-border-subtle/80 bg-background/60 p-5 transition-all"
          >
            {/* Architectural Involvement */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                  Architectural Involvement
                </MonoText>
              </div>
              <ul className="space-y-1.5 pl-3" role="list">
                {experience.architecturalInvolvement.map((arch) => (
                  <li key={arch} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Scope & Responsibilities */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                  Responsibilities & Technical Scope
                </MonoText>
              </div>
              <p className="mb-2 text-xs italic text-text-muted">
                Scope: {experience.technicalScope}
              </p>
              <ul className="space-y-1.5 pl-3" role="list">
                {experience.responsibilities.map((resp) => (
                  <li key={resp} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collaboration & Leadership */}
            <div className="border-t border-border-subtle/50 pt-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                  Collaboration & Leadership
                </MonoText>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary">
                {experience.collaboration}
              </p>
              {experience.leadership && (
                <p className="mt-1.5 text-xs text-text-muted font-mono">
                  Role: {experience.leadership}
                </p>
              )}
            </div>

            {/* Verified Outcomes & Impact */}
            {experience.outcomes && experience.outcomes.length > 0 && (
              <div className="border-t border-border-subtle/50 pt-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
                    Verified Outcomes
                  </MonoText>
                </div>
                <ul className="space-y-1.5 pl-3" role="list">
                  {experience.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-text-primary">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
