import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge, Card3D } from '@/components/ui';
import type { ExperienceItem } from '@/content/models';

export interface ExperienceCardProps {
  readonly experience: ExperienceItem;
  readonly isSelected?: boolean;
  readonly onOpenDetails: () => void;
  readonly className?: string;
}

export function ExperienceCard({
  experience,
  isSelected = false,
  onOpenDetails,
  className = '',
}: ExperienceCardProps): ReactElement {
  return (
    <Card3D
      maxTilt={8}
      glare={true}
      className={`h-full ${className}`}
      innerClassName={`h-full transition-all duration-200 ${
        isSelected
          ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
          : 'border-border-subtle bg-surface/50 hover:border-border hover:bg-surface-raised/60'
      }`}
      onClick={onOpenDetails}
    >
      <article
        className="group flex h-full w-full flex-col justify-between p-5 text-left cursor-pointer"
        aria-labelledby={`heading-${experience.id}`}
      >
        <div className="space-y-3">
          {/* Top Header: Period, Stage & Specialization */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-border-subtle/70 pb-2.5">
            <Badge variant="accent" size="sm" className="font-mono font-semibold text-[11px] py-0 px-2">
              {experience.period}
            </Badge>
            <div className="flex items-center gap-1 font-mono text-[11px] text-text-muted">
              <span className="text-accent font-semibold">STAGE 0{experience.progressionIndex}</span>
            </div>
          </div>

          {/* Role Title & Environment Context */}
          <div>
            <Heading
              as="h3"
              variant="card"
              id={`heading-${experience.id}`}
              className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug"
            >
              {experience.role}
            </Heading>
            <MonoText size="xs" color="muted" className="mt-1 block text-[11px] line-clamp-1 font-medium">
              {experience.progressionStage}
            </MonoText>
          </div>

          {/* Summary snippet */}
          <Text variant="small" color="secondary" className="text-xs leading-relaxed line-clamp-3 text-text-secondary">
            {experience.summary}
          </Text>

          {/* Technologies preview */}
          <div className="flex flex-wrap gap-1 pt-1" aria-label="Key technologies">
            {experience.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded border border-border-subtle/60 bg-surface-raised/60 px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
              >
                {tech}
              </span>
            ))}
            {experience.technologies.length > 3 && (
              <span className="rounded border border-border-subtle/40 bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                +{experience.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-4 pt-3 border-t border-border-subtle/50 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-accent group-hover:text-accent-hover transition-colors">
            <span>View Details</span>
            <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
          <span className="text-[10px] font-mono text-text-muted">
            {experience.architecturalInvolvement.length} architectural pts
          </span>
        </div>
      </article>
    </Card3D>
  );
}
