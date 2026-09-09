import { useState, type ReactElement } from 'react';
import { MonoText } from '@/components/typography';
import { cn } from '@/lib/utils';
import type { EngineeringBreadthItem } from '@/content/models';

export interface EngineeringBreadthProps {
  items: readonly EngineeringBreadthItem[];
  className?: string;
}

export function EngineeringBreadth({
  items,
  className,
}: EngineeringBreadthProps): ReactElement {
  const [activeCategory, setActiveCategory] = useState<string | null>(items[0]?.category || null);

  const activeItem = items.find((i) => i.category === activeCategory) || items[0];

  return (
    <div
      className={cn(
        'rounded-lg border border-border-subtle bg-surface/40 p-5 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] space-y-4',
        className,
      )}
      aria-label="Engineering Breadth Map"
    >
      {/* Header with 7+ Years anchor */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
            Engineering Breadth
          </MonoText>
        </div>
        <span className="text-xs font-mono text-text-muted px-2 py-0.5 rounded bg-white/5 border border-border-subtle">
          7+ Years Scope
        </span>
      </div>

      {/* Interactive 2x3 Positioning Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" aria-label="Engineering breadth categories">
        {items.map((item) => {
          const isSelected = activeCategory === item.category;
          return (
            <button
              key={item.category}
              type="button"
              onClick={() => setActiveCategory(item.category)}
              className={cn(
                'group flex flex-col p-2.5 rounded text-left transition-all duration-150 border text-xs',
                isSelected
                  ? 'bg-accent-subtle border-accent/40 text-text-primary'
                  : 'bg-surface-elevated/60 border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary',
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[11px] uppercase tracking-wider font-medium">
                  {item.category}
                </span>
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    isSelected ? 'bg-accent' : 'bg-border-strong group-hover:bg-text-muted',
                  )}
                  aria-hidden="true"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail description for selected breadth area */}
      {activeItem && (
        <div className="pt-2 text-xs text-text-secondary font-sans border-t border-border-subtle/50 flex items-start gap-2">
          <span className="text-accent font-mono">→</span>
          <p className="leading-relaxed">{activeItem.description}</p>
        </div>
      )}
    </div>
  );
}
