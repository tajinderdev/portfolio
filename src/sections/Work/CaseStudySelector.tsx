import { type ReactElement } from 'react';
import type { ProjectCaseStudy } from '@/content/models';
import { Card3D } from '@/components/ui';

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
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % projects.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + projects.length) % projects.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = projects.length - 1;
    }

    if (nextIndex !== null) {
      const nextProject = projects[nextIndex];
      if (nextProject) {
        onSelect(nextProject.id);
        const nextButton = document.getElementById(`casestudy-tab-${nextProject.id}`);
        nextButton?.focus();
      }
    }
  };

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
          <Card3D
            key={project.id}
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
              id={`casestudy-tab-${project.id}`}
              aria-controls={`casestudy-panel-${project.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(project.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="group flex h-full w-full flex-col justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
          </Card3D>
        );
      })}
    </div>
  );
}
