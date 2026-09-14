import { type ReactElement } from 'react';
import type { AIWorkflowStep } from '@/content/models';
import { Card3D } from '@/components/ui';

export interface WorkflowPipelineProps {
  readonly steps: readonly AIWorkflowStep[];
  readonly activeStepId: string;
  readonly onSelectStep: (id: string) => void;
  readonly className?: string;
}

export function WorkflowPipeline({
  steps,
  activeStepId,
  onSelectStep,
  className = '',
}: WorkflowPipelineProps): ReactElement {
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % steps.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + steps.length) % steps.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = steps.length - 1;
    }

    if (nextIndex !== null) {
      const nextStep = steps[nextIndex];
      if (nextStep) {
        onSelectStep(nextStep.id);
        const nextButton = document.getElementById(`workflow-tab-${nextStep.id}`);
        nextButton?.focus();
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 6-Stage Interactive Cards Grid */}
      <div
        role="tablist"
        aria-label="AI-augmented engineering workflow pipeline"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        {steps.map((step, index) => {
          const isSelected = activeStepId === step.id;

          return (
            <Card3D
              key={step.id}
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
                id={`workflow-tab-${step.id}`}
                aria-controls="workflow-step-panel"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onSelectStep(step.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="group flex h-full w-full flex-col justify-between p-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider">
                      [{step.tag}]
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {step.stepNumber}
                    </span>
                  </div>

                  <span
                    className={`font-heading text-xs font-semibold tracking-tight transition-colors sm:text-sm line-clamp-1 ${
                      isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                    }`}
                  >
                    {step.name}
                  </span>

                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                    {step.summary}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border-subtle/50 pt-2 text-[10px] font-mono">
                  <span className="text-text-muted truncate max-w-[80px]">
                    {step.technologies.length} tools
                  </span>
                  <span className="text-accent flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Inspect <span aria-hidden="true">→</span>
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
