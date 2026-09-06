import { type ReactElement } from 'react';
import type { AIWorkflowStep } from '@/content/models';
import { MonoText, Heading } from '@/components/typography';

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
  const activeStep = steps.find((s) => s.id === activeStepId) ?? steps[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 6-Stage Stepper Bar */}
      <div
        role="tablist"
        aria-label="AI-augmented engineering workflow pipeline"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {steps.map((step, index) => {
          const isSelected = activeStep?.id === step.id;

          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`workflow-tab-${step.id}`}
              aria-controls="workflow-step-panel"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectStep(step.id)}
              className={`group relative flex flex-col justify-between rounded-lg border p-3.5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                isSelected
                  ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                  : 'border-border-subtle bg-surface/50 hover:border-border hover:bg-surface-raised/60'
              }`}
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
                  className={`font-heading text-xs font-semibold tracking-tight transition-colors sm:text-sm ${
                    isSelected ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {/* Indicator Arrow on desktop */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-border"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Stage Deep-Dive Panel */}
      {activeStep && (
        <div
          id="workflow-step-panel"
          role="tabpanel"
          aria-labelledby={`workflow-tab-${activeStep.id}`}
          className="rounded-lg border border-border-subtle bg-surface/50 p-5 sm:p-7 backdrop-blur-sm space-y-6"
        >
          {/* Stage Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle/70 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                  STAGE {activeStep.stepNumber} // {activeStep.tag}
                </span>
                <MonoText size="xs" color="muted" className="font-mono text-xs">
                  Engineering Workflow Phase
                </MonoText>
              </div>

              <Heading as="h3" variant="card" className="mt-2 text-lg sm:text-xl font-bold text-text-primary">
                {activeStep.name}
              </Heading>
            </div>

            {/* Key Technologies in this stage */}
            <div className="flex flex-wrap items-center gap-1.5" aria-label="Key disciplines in this stage">
              {activeStep.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border-subtle/80 bg-surface-raised/60 px-2.5 py-0.5 font-mono text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Stage Objective */}
          <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
            {activeStep.summary}
          </p>

          {/* Dual Comparison Cards: AI Multiplier vs Human Control */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Card 1: AI Role */}
            <div className="rounded-md border border-accent-muted/30 bg-accent-muted/10 p-5 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-accent-muted/20 pb-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider text-[11px]">
                  AI Role // Velocity & Synthesis
                </MonoText>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-primary">
                {activeStep.aiRole}
              </p>
            </div>

            {/* Card 2: Human Responsibility */}
            <div className="rounded-md border border-border-subtle/90 bg-surface-raised/50 p-5 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-text-muted" />
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Human Responsibility // Architecture & Boundaries
                </MonoText>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                {activeStep.humanControl}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
