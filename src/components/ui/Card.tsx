import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'default' | 'elevated' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps<T extends ElementType = 'div'> {
  as?: T;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-surface border border-border-subtle rounded-lg',
  elevated: 'bg-surface-elevated border border-border-strong rounded-lg shadow-sm',
  interactive:
    'bg-surface border border-border-subtle rounded-lg hover:border-accent/40 hover:bg-surface-elevated transition-all duration-200 cursor-pointer',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
};

export function Card<T extends ElementType = 'div'>({
  as,
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
