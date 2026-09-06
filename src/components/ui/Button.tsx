import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps<T extends ElementType = 'button'> {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-background font-medium hover:bg-accent-hover active:scale-[0.98] shadow-sm',
  secondary:
    'bg-surface-elevated text-text-primary border border-border-subtle hover:border-accent/40 hover:bg-surface active:scale-[0.98]',
  outline:
    'bg-transparent text-text-primary border border-border-subtle hover:border-accent hover:text-accent active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-sm',
  md: 'px-4 py-2.5 text-sm gap-2 rounded-md',
  lg: 'px-6 py-3.5 text-base gap-2.5 rounded-md',
};

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as || 'button';
  const isDisabled = disabled || isLoading;

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center font-sans transition-all duration-200 select-none cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
      disabled={Component === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled ? 'true' : undefined}
      {...rest}
    >
      {isLoading ? (
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </Component>
  );
}
