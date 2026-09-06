import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type MonoSize = 'xs' | 'sm' | 'base';
export type MonoColor = 'default' | 'accent' | 'muted' | 'primary';

export interface MonoTextProps<T extends ElementType = 'span'> {
  as?: T;
  size?: MonoSize;
  color?: MonoColor;
  className?: string;
  children?: ReactNode;
}

const sizeClasses: Record<MonoSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
};

const colorClasses: Record<MonoColor, string> = {
  default: 'text-text-secondary',
  accent: 'text-accent',
  muted: 'text-text-muted',
  primary: 'text-text-primary',
};

export function MonoText<T extends ElementType = 'span'>({
  as,
  size = 'xs',
  color = 'default',
  className,
  children,
  ...rest
}: MonoTextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof MonoTextProps<T>>) {
  const Component = as || 'span';

  return (
    <Component
      className={cn(
        'font-mono tracking-wide',
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
