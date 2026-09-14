import { useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Heading, Text, MonoText } from '@/components/typography';
import { Badge } from '@/components/ui';
import type { AIWorkflowStep } from '@/content/models';

export interface WorkflowStepModalProps {
  readonly step: AIWorkflowStep | null;
  readonly steps: readonly AIWorkflowStep[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectStep: (step: AIWorkflowStep) => void;
}

export function WorkflowStepModal({
  step,
  steps,
  isOpen,
  onClose,
  onSelectStep,
}: WorkflowStepModalProps): ReactElement | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !step || !mounted) return null;

  const currentIndex = steps.findIndex((s) => s.id === step.id);
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`workflow-modal-heading-${step.id}`}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8"
      style={{ isolation: 'isolate' }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Window Card */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] flex flex-col rounded-xl sm:rounded-2xl border border-border-strong bg-surface-elevated shadow-2xl overflow-hidden">
        {/* Fixed Header Bar */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-border-subtle p-4 sm:p-6 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center rounded border border-accent-muted/40 bg-accent-muted/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                STAGE {step.stepNumber} // {step.tag}
              </span>
              <MonoText size="xs" color="muted" className="font-mono text-xs">
                Stage 0{currentIndex + 1} of 0{steps.length}
              </MonoText>
              <Badge variant="outline" size="sm" className="font-mono text-[10px] sm:text-xs">
                {step.technologies.length} Disciplines
              </Badge>
            </div>

            <Heading
              as="h3"
              variant="card"
              id={`workflow-modal-heading-${step.id}`}
              className="text-xl sm:text-2xl font-bold text-text-primary pt-1"
            >
              {step.name}
            </Heading>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close workflow step details"
            className="rounded-lg p-2 text-text-muted hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Objective Summary */}
          <Text variant="body" color="secondary" className="text-sm sm:text-base leading-relaxed">
            {step.summary}
          </Text>

          {/* Dual Comparison Cards: AI Multiplier vs Human Control */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Card 1: AI Role */}
            <div className="rounded-lg border border-accent-muted/30 bg-accent-muted/10 p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-accent-muted/20 pb-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider text-[11px]">
                  AI Role // Velocity & Synthesis
                </MonoText>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-primary">
                {step.aiRole}
              </p>
            </div>

            {/* Card 2: Human Responsibility */}
            <div className="rounded-lg border border-border-subtle bg-surface-raised/50 p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-border-subtle/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-text-muted" />
                <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                  Human Responsibility // Architecture
                </MonoText>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                {step.humanControl}
              </p>
            </div>
          </div>

          {/* Key Technologies & Disciplines */}
          <div className="border-t border-border-subtle/70 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <MonoText size="xs" color="muted" className="font-semibold uppercase tracking-wider text-[11px]">
                Applied Disciplines & Tools
              </MonoText>
              <div className="flex flex-wrap gap-1.5" aria-label="Key disciplines in this stage">
                {step.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border-subtle/80 bg-surface-raised px-2.5 py-1 font-mono text-xs text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer Navigation Bar */}
        <div className="flex items-center justify-between border-t border-border-subtle p-3 sm:p-4 bg-surface-elevated/95 backdrop-blur-sm shrink-0">
          <div>
            {prevStep ? (
              <button
                type="button"
                onClick={() => onSelectStep(prevStep)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span>←</span>
                <span className="hidden sm:inline">Prev:</span>
                <span className="font-semibold truncate max-w-[120px]">{prevStep.name}</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">First stage</span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-1.5 font-mono text-xs font-medium text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
          >
            Close
          </button>

          <div>
            {nextStep ? (
              <button
                type="button"
                onClick={() => onSelectStep(nextStep)}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-raised border border-border-subtle transition-colors"
              >
                <span className="hidden sm:inline">Next:</span>
                <span className="font-semibold truncate max-w-[120px]">{nextStep.name}</span>
                <span>→</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-text-muted/40 px-3 py-1.5">Last stage</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
