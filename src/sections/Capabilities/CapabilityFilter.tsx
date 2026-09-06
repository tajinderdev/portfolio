import { type ReactElement } from 'react';
import { MonoText } from '@/components/typography';
import type { SkillPillar } from '@/content/models';

export interface CapabilityFilterProps {
  readonly activePillar: SkillPillar | 'ALL';
  readonly onSelectPillar: (pillar: SkillPillar | 'ALL') => void;
  readonly searchQuery: string;
  readonly onSearchChange: (query: string) => void;
  readonly resultCount: number;
  readonly className?: string;
}

const filterOptions: readonly { readonly id: SkillPillar | 'ALL'; readonly label: string }[] = [
  { id: 'ALL', label: 'All Capabilities' },
  { id: 'BUILD', label: 'Build' },
  { id: 'ARCHITECT', label: 'Architect' },
  { id: 'INTEGRATE', label: 'Integrate' },
  { id: 'DATA', label: 'Data' },
  { id: 'DEPLOY', label: 'Deploy' },
  { id: 'TEST', label: 'Test' },
  { id: 'MODERNIZE', label: 'Modernize' },
  { id: 'INTELLIGENCE', label: 'Intelligence' },
];

export function CapabilityFilter({
  activePillar,
  onSelectPillar,
  searchQuery,
  onSearchChange,
  resultCount,
  className = '',
}: CapabilityFilterProps): ReactElement {
  return (
    <div
      className={`flex flex-col gap-4 rounded-lg border border-border-subtle bg-surface/40 p-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
      aria-label="Capabilities Filter and Search"
    >
      {/* Category Pills */}
      <div
        role="group"
        aria-label="Filter capabilities by engineering function"
        className="flex flex-wrap items-center gap-1.5"
      >
        {filterOptions.map((opt) => {
          const isSelected = activePillar === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectPillar(opt.id)}
              className={`rounded px-2.5 py-1 font-mono text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
                isSelected
                  ? 'bg-accent text-background font-semibold shadow-xs'
                  : 'border border-border-subtle bg-surface-raised/40 text-text-secondary hover:border-border hover:bg-surface-raised/80 hover:text-text-primary'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Search Input & Match Counter */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative w-full sm:w-64">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search technologies..."
            aria-label="Search technologies and capabilities"
            className="w-full rounded border border-border-subtle bg-background/80 px-3 py-1.5 font-mono text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search input"
              className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs text-text-muted hover:text-text-primary"
            >
              ✕
            </button>
          )}
        </div>

        <MonoText size="xs" color="muted" className="hidden sm:inline-block font-mono text-[11px] whitespace-nowrap">
          {resultCount} {resultCount === 1 ? 'area' : 'areas'}
        </MonoText>
      </div>
    </div>
  );
}
