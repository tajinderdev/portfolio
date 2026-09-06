import { type ReactElement } from 'react';
import type { AICapabilitySphere } from '@/content/models';
import { Heading } from '@/components/typography';

export interface ApplicationCapabilitiesProps {
  readonly spheres: readonly AICapabilitySphere[];
  readonly className?: string;
}

export function ApplicationCapabilities({
  spheres,
  className = '',
}: ApplicationCapabilitiesProps): ReactElement {
  return (
    <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${className}`}>
      {spheres.map((sphere) => (
        <div
          key={sphere.id}
          className="rounded-lg border border-border-subtle bg-surface/50 p-6 sm:p-7 backdrop-blur-sm space-y-4 transition-all duration-200 hover:border-border"
        >
          {/* Sphere Header */}
          <div className="border-b border-border-subtle/70 pb-3">
            <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
              {sphere.kicker}
            </span>
            <Heading as="h3" variant="card" className="mt-1.5 text-lg sm:text-xl font-bold text-text-primary">
              {sphere.title}
            </Heading>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
            {sphere.description}
          </p>

          {/* Capability Bullets */}
          <ul className="space-y-2.5 pt-2" role="list">
            {sphere.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-accent/40 bg-accent-muted/20 text-accent font-mono text-[10px]">
                  ✓
                </span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
