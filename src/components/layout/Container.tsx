import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'default' | 'narrow' | 'wide' | 'full';

export interface ContainerProps<T extends ElementType = 'div'> {
  as?: T;
  size?: ContainerSize;
  className?: string;
  children?: ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  narrow: 'max-w-4xl',
  default: 'max-w-7xl',
  wide: 'max-w-[1400px]',
  full: 'w-full',
};

export function Container<T extends ElementType = 'div'>({
  as,
  size = 'default',
  className,
  children,
  ...rest
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
