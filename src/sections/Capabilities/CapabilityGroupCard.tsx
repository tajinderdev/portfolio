import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Card } from '@/components/ui';
import type { SkillPillarGroup } from '@/content/models';

export interface CapabilityGroupCardProps {
  readonly group: SkillPillarGroup;
  readonly searchQuery?: string;
  readonly className?: string;
}

export function CapabilityGroupCard({
  group,
  searchQuery = '',
  className = '',
}: CapabilityGroupCardProps): ReactElement {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return (
    <Card
      as="article"
      variant="interactive"
      className={`flex flex-col justify-between p-6 transition-all duration-200 sm:p-7 ${className}`}
      aria-labelledby={`cap-group-${group.pillar.toLowerCase()}`}
    >
      <div>
        {/* Header: Pillar Tag & Architectural Role */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent uppercase tracking-wider">
              {group.pillar}
            </span>
            <Heading
              as="h3"
              variant="card"
              id={`cap-group-${group.pillar.toLowerCase()}`}
              className="text-xl font-bold text-text-primary"
            >
              {group.label}
            </Heading>
          </div>
          <span className="font-mono text-xs text-text-muted">
            {group.architecturalRole}
          </span>
        </div>

        {/* Purpose & Description */}
        <div className="mb-5 space-y-1.5">
          <Text variant="small" color="primary" className="font-medium leading-relaxed">
            {group.purpose}
          </Text>
          <Text variant="small" color="secondary" className="leading-relaxed text-xs sm:text-sm">
            {group.description}
          </Text>
        </div>

        {/* Subcategories & Technologies */}
        <div className="space-y-4 border-t border-border-subtle/60 pt-4">
          {group.subcategories.map((subcat) => (
            <div key={subcat.name} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider text-[11px]">
                  {subcat.name}
                </MonoText>
                {subcat.context && (
                  <span className="text-[11px] text-text-muted leading-tight font-mono">
                    {subcat.context}
                  </span>
                )}
              </div>

              {/* Technology Chips */}
              <div className="flex flex-wrap gap-1.5" aria-label={`${subcat.name} technologies`}>
                {subcat.skills.map((skill) => {
                  const isMatch =
                    normalizedQuery.length > 0 &&
                    skill.toLowerCase().includes(normalizedQuery);

                  return (
                    <span
                      key={skill}
                      className={`rounded px-2.5 py-1 font-mono text-xs transition-all ${
                        isMatch
                          ? 'border border-accent bg-accent-muted/30 text-accent font-semibold ring-1 ring-accent'
                          : 'border border-border-subtle/80 bg-surface-raised/40 text-text-secondary hover:border-border hover:bg-surface-raised/70'
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
