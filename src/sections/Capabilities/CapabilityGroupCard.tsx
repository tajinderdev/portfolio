import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Card3D } from '@/components/ui';
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
    <Card3D
      maxTilt={8}
      glare={true}
      className={`h-full ${className}`}
      innerClassName="h-full border-border-subtle bg-surface/50 hover:border-border hover:bg-surface-raised/60 transition-all duration-200"
    >
      <article
        className="group flex h-full flex-col justify-between p-4 sm:p-5"
        aria-labelledby={`cap-group-${group.pillar.toLowerCase()}`}
      >
        <div className="space-y-3">
          {/* Header: Pillar Tag & Architectural Role */}
          <div className="flex items-center justify-between gap-2 border-b border-border-subtle/60 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="rounded border border-accent-muted/40 bg-accent-muted/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                {group.pillar}
              </span>
              <Heading
                as="h3"
                variant="card"
                id={`cap-group-${group.pillar.toLowerCase()}`}
                className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent transition-colors"
              >
                {group.label}
              </Heading>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-text-muted truncate max-w-[140px] text-right">
              {group.architecturalRole}
            </span>
          </div>

          {/* Purpose */}
          <Text variant="small" color="secondary" className="text-xs leading-relaxed line-clamp-2">
            {group.purpose}
          </Text>

          {/* Subcategories & Technology Badges */}
          <div className="space-y-2.5 pt-1">
            {group.subcategories.map((subcat) => (
              <div key={subcat.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[10px]">
                    {subcat.name}
                  </MonoText>
                </div>

                {/* Technology Chips */}
                <div className="flex flex-wrap gap-1" aria-label={`${subcat.name} technologies`}>
                  {subcat.skills.map((skill) => {
                    const isMatch =
                      normalizedQuery.length > 0 &&
                      skill.toLowerCase().includes(normalizedQuery);

                    return (
                      <span
                        key={skill}
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] sm:text-[11px] transition-all ${
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
      </article>
    </Card3D>
  );
}
