import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'accent' | 'outline' | 'mono';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-white/5 text-text-secondary border border-border-subtle',
  accent: 'bg-accent-subtle text-accent border border-accent-border',
  outline: 'bg-transparent text-text-muted border border-border-subtle',
  mono: 'font-mono text-[11px] bg-surface text-text-secondary border border-border-subtle',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] rounded-sm',
  md: 'px-2.5 py-1 text-xs rounded-md',
};

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium leading-none whitespace-nowrap select-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
