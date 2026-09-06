import { type ReactElement } from 'react';
import type { DomainItem } from '@/content/models';

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
          <button
            key={domain.id}
            type="button"
            role="tab"
            id={`domain-tab-${domain.id}`}
            aria-controls={`domain-panel-${domain.id}`}
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(domain.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`group flex flex-col justify-between rounded-lg border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
              isSelected
                ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                : 'border-border-subtle bg-surface/50 hover:border-border hover:bg-surface-raised/60'
            }`}
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
          </button>
        );
      })}
    </div>
  );
}
