import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'active' | 'idle' | 'muted';

export interface StatusDotProps {
  status?: StatusType;
  pulse?: boolean;
  label?: string;
  className?: string;
}

const colorMap: Record<StatusType, { dot: string; pulse: string }> = {
  active: {
    dot: 'bg-accent',
    pulse: 'bg-accent/75',
  },
  idle: {
    dot: 'bg-yellow-400',
    pulse: 'bg-yellow-400/75',
  },
  muted: {
    dot: 'bg-text-muted',
    pulse: 'bg-text-muted/50',
  },
};

export function StatusDot({
  status = 'active',
  pulse = true,
  label,
  className,
}: StatusDotProps): ReactElement {
  const colors = colorMap[status];

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              colors.pulse,
            )}
            aria-hidden="true"
          />
        )}
        <span
          className={cn('relative inline-flex rounded-full h-2 w-2', colors.dot)}
          aria-hidden="true"
        />
      </span>
      {label && (
        <span className="text-xs font-mono text-text-secondary">{label}</span>
      )}
    </span>
  );
}
