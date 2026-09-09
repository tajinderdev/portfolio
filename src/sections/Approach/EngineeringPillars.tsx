import { type ReactElement } from 'react';
import { Heading, Text, MonoText } from '@/components/typography';
import { Card } from '@/components/ui';
import type { PhilosophyTheme } from '@/content/models';

export interface EngineeringPillarsProps {
  readonly themes: readonly PhilosophyTheme[];
  readonly className?: string;
}

export function EngineeringPillars({
  themes,
  className = '',
}: EngineeringPillarsProps): ReactElement {
  return (
    <div className={`space-y-6 ${className}`} aria-label="Engineering Philosophy Pillars">


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme, index) => (
          <Card
            key={theme.id}
            variant="interactive"
            className="flex flex-col justify-between p-5 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div>
              {/* Card Header: Tag and Number */}
              <div className="mb-3 flex items-center justify-between border-b border-border-subtle/60 pb-2.5">
                <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                  {theme.iconLabel}
                </span>
                <MonoText size="xs" color="muted">
                  0{index + 1}
                </MonoText>
              </div>

              {/* Title & Summary */}
              <Heading as="h4" variant="card" className="mb-2 text-base font-semibold text-text-primary">
                {theme.title}
              </Heading>
              <Text variant="small" color="secondary" className="mb-4 leading-relaxed">
                {theme.summary}
              </Text>
            </div>

            {/* Architectural Decisions / Practice checklist */}
            <div className="border-t border-border-subtle/50 pt-3">
              <MonoText size="xs" color="muted" className="mb-2 block uppercase tracking-wider text-[11px] font-medium">
                Key Practices
              </MonoText>
              <ul className="space-y-1.5" role="list">
                {theme.keyDecisions.map((decision) => (
                  <li key={decision} className="flex items-start gap-2 text-xs text-text-muted">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
