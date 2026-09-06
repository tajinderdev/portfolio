import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type TextVariant = 'lead' | 'body' | 'small' | 'caption';
export type TextColor = 'primary' | 'secondary' | 'muted' | 'accent';

export interface TextProps<T extends ElementType = 'p'> {
  as?: T;
  variant?: TextVariant;
  color?: TextColor;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
  lead: 'text-lg sm:text-xl leading-relaxed',
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-normal',
  caption: 'text-xs leading-normal',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  accent: 'text-accent',
};

export function Text<T extends ElementType = 'p'>({
  as,
  variant = 'body',
  color = 'secondary',
  className,
  children,
  ...rest
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) {
  const Component = as || 'p';

  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
