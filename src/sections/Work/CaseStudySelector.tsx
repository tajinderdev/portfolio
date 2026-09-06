import { type ReactElement } from 'react';
import type { ProjectCaseStudy } from '@/content/models';

export interface CaseStudySelectorProps {
  readonly projects: readonly ProjectCaseStudy[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
  readonly className?: string;
}

export function CaseStudySelector({
  projects,
  activeId,
  onSelect,
  className = '',
}: CaseStudySelectorProps): ReactElement {
  return (
    <div
      role="tablist"
      aria-label="Case studies and architecture teardowns"
      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {projects.map((project, index) => {
        const isSelected = activeId === project.id;
        const formattedIndex = String(index + 1).padStart(2, '0');

        return (
          <button
            key={project.id}
            type="button"
            role="tab"
            id={`casestudy-tab-${project.id}`}
            aria-controls={`casestudy-panel-${project.id}`}
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(project.id)}
            className={`group flex flex-col justify-between rounded-lg border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
              isSelected
                ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                : 'border-border-subtle bg-surface/50 hover:border-border hover:bg-surface-raised/60'
            }`}
          >
            <div>
              {/* Header Meta: Domain Tag & Formatted Index */}
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                  [{project.domainTag}]
                </span>
                <span className="font-mono text-[11px] text-text-muted">
                  {formattedIndex}
                </span>
              </div>

              {/* Confidentiality Notice */}
              <div className="mb-2 font-mono text-[10px] text-text-muted tracking-tight">
                // CONFIDENTIAL ARCHITECTURE
              </div>

              {/* Title */}
              <span
                className={`font-heading text-sm font-semibold tracking-tight transition-colors sm:text-base ${
                  isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                }`}
              >
                {project.title}
              </span>
            </div>

            {/* Subtitle / Context summary */}
            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-text-secondary">
              {project.subtitle ?? project.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
