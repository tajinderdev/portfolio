import { type ReactElement } from 'react';
import { Heading, Text } from '@/components/typography';
import { Card3D } from '@/components/ui';
import type { PhilosophyTheme } from '@/content/models';

export interface EngineeringPillarsProps {
  readonly themes: readonly PhilosophyTheme[];
  readonly selectedThemeId?: string;
  readonly onSelectTheme?: (id: string) => void;
  readonly className?: string;
}

export function EngineeringPillars({
  themes,
  selectedThemeId = '',
  onSelectTheme,
  className = '',
}: EngineeringPillarsProps): ReactElement {
  return (
    <div className={`space-y-6 ${className}`} aria-label="Engineering Philosophy Pillars">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {themes.map((theme, index) => {
          const isSelected = selectedThemeId === theme.id;
          const formattedIndex = String(index + 1).padStart(2, '0');

          return (
            <Card3D
              key={theme.id}
              maxTilt={8}
              glare={true}
              className="h-full"
              innerClassName={`h-full transition-all duration-200 ${
                isSelected
                  ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                  : 'border-border-subtle bg-surface/50 hover:border-border hover:bg-surface-raised/60'
              }`}
            >
              <button
                type="button"
                role="button"
                onClick={() => onSelectTheme?.(theme.id)}
                className="group flex h-full w-full flex-col justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div>
                  {/* Card Header: Tag and Number */}
                  <div className="mb-2.5 flex items-center justify-between border-b border-border-subtle/60 pb-2">
                    <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                      [{theme.iconLabel}]
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <Heading
                    as="h4"
                    variant="card"
                    className="mb-2 text-sm sm:text-base font-semibold text-text-primary group-hover:text-accent transition-colors"
                  >
                    {theme.title}
                  </Heading>
                  <Text variant="small" color="secondary" className="line-clamp-2 text-xs leading-relaxed">
                    {theme.summary}
                  </Text>
                </div>

                {/* Footer Meta: Practices count and Explore prompt */}
                <div className="mt-4 flex items-center justify-between border-t border-border-subtle/50 pt-2.5 text-[11px] font-mono">
                  <span className="text-text-muted">
                    {theme.keyDecisions.length} practices
                  </span>
                  <span className="text-accent flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Explore <span aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            </Card3D>
          );
        })}
      </div>
    </div>
  );
}
