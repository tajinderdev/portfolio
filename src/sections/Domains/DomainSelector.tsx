import { type ReactElement } from 'react';
import type { DomainItem } from '@/content/models';
import { Card3D } from '@/components/ui';

export interface DomainSelectorProps {
  readonly domains: readonly DomainItem[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
  readonly className?: string;
}

export function DomainSelector({
  domains,
  activeId,
  onSelect,
  className = '',
}: DomainSelectorProps): ReactElement {
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % domains.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + domains.length) % domains.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = domains.length - 1;
    }

    if (nextIndex !== null) {
      const nextDomain = domains[nextIndex];
      if (nextDomain) {
        onSelect(nextDomain.id);
        const nextButton = document.getElementById(`domain-tab-${nextDomain.id}`);
        nextButton?.focus();
      }
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Selectable business domains"
      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {domains.map((domain, index) => {
        const isSelected = activeId === domain.id;
        const formattedIndex = String(index + 1).padStart(2, '0');

        return (
          <Card3D
            key={domain.id}
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
              role="tab"
              id={`domain-tab-${domain.id}`}
              aria-controls={`domain-panel-${domain.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(domain.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="group flex h-full w-full flex-col justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                    [{domain.tag}]
                  </span>
                  <span className="font-mono text-[11px] text-text-muted">
                    {formattedIndex}
                  </span>
                </div>

                <span
                  className={`font-heading text-sm font-semibold tracking-tight transition-colors sm:text-base ${
                    isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                  }`}
                >
                  {domain.name}
                </span>
              </div>

              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                {domain.summary}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-border-subtle/50 pt-2 text-[11px] font-mono">
                <span className="text-text-muted">
                  {domain.relevantTechnologies.length} technologies
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
  );
}
