import { type ReactElement } from 'react';
import { MonoText, Text } from '@/components/typography';

export interface ProgressionMilestone {
  readonly id: string;
  readonly step: string;
  readonly label: string;
  readonly period: string;
  readonly summary: string;
}

const milestones: readonly ProgressionMilestone[] = [
  {
    id: 'exp-2019-2020',
    step: '01',
    label: 'Implementation',
    period: '2019–2020',
    summary: 'Full-stack SDLC foundations, clean MVC code, and production maintenance.',
  },
  {
    id: 'exp-2020-2022',
    step: '02',
    label: 'Ownership & Leadership',
    period: '2020–2022',
    summary: 'Technical liaison for international clients, developer mentoring, and 4→20+ growth.',
  },
  {
    id: 'exp-ecommerce-2022-2023',
    step: '03',
    label: 'Specialized Scale',
    period: '2022–2023',
    summary: 'High-volume B2C e-commerce, modular architecture, and performance optimization.',
  },
  {
    id: 'exp-2023',
    step: '04',
    label: 'Lifecycle & Integrations',
    period: '2023',
    summary: 'Complete SaaS platform lifecycle, Stripe billing automation, and background queues.',
  },
  {
    id: 'exp-current',
    step: '05',
    label: 'Architecture & Modernization',
    period: '2023–Present',
    summary: 'Enterprise role-based workflows, legacy modernization, and AI-augmented engineering.',
  },
];

export interface CareerProgressionTrackerProps {
  readonly activeId?: string;
  readonly onSelectStage?: (id: string) => void;
  readonly className?: string;
}

export function CareerProgressionTracker({
  activeId,
  onSelectStage,
  className = '',
}: CareerProgressionTrackerProps): ReactElement {
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % milestones.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + milestones.length) % milestones.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = milestones.length - 1;
    }

    if (nextIndex !== null) {
      const nextMilestone = milestones[nextIndex];
      if (nextMilestone) {
        onSelectStage?.(nextMilestone.id);
        const nextButton = document.getElementById(`milestone-tab-${nextMilestone.id}`);
        nextButton?.focus();
      }
    }
  };

  return (
    <div
      className={`rounded-lg border border-border-subtle bg-surface/40 p-5 backdrop-blur-sm sm:p-6 ${className}`}
      aria-label="Career Progression Arc"
    >
      <div className="mb-4 flex flex-col gap-1 border-b border-border-subtle/70 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <MonoText size="xs" color="accent" className="font-semibold uppercase tracking-wider">
            Trajectory
          </MonoText>
          <Text variant="small" className="text-text-primary font-medium">
            Implementation → Ownership → Architecture → Leadership → Modern Systems
          </Text>
        </div>
        <MonoText size="xs" color="muted" className="hidden sm:inline-block">
          [ 5 Key Milestones ]
        </MonoText>
      </div>

      <div
        role="tablist"
        aria-label="Career progression milestones"
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5"
      >
        {milestones.map((m, index) => {
          const isCurrent = activeId === m.id;
          return (
            <button
              key={m.id}
              id={`milestone-tab-${m.id}`}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              tabIndex={isCurrent ? 0 : -1}
              onClick={() => onSelectStage?.(m.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`group flex flex-col items-start rounded-md border p-3 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                isCurrent
                  ? 'border-accent bg-accent-muted/20 ring-1 ring-accent'
                  : 'border-border-subtle/80 bg-surface-raised/30 hover:border-border hover:bg-surface-raised/70'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-[10px] text-accent font-semibold">
                  STAGE {m.step}
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  {m.period}
                </span>
              </div>
              <span
                className={`mt-1 font-heading text-xs font-semibold tracking-tight transition-colors ${
                  isCurrent ? 'text-accent' : 'text-text-primary group-hover:text-accent'
                }`}
              >
                {m.label}
              </span>
              <span className="mt-1 line-clamp-2 text-[11px] leading-tight text-text-muted">
                {m.summary}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
