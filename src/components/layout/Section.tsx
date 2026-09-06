import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import { Container, type ContainerSize } from './Container';

export type SectionSpacing = 'default' | 'compact' | 'large' | 'none';

export interface SectionProps<T extends ElementType = 'section'> {
  as?: T;
  id?: string;
  spacing?: SectionSpacing;
  container?: boolean;
  containerSize?: ContainerSize;
  className?: string;
  children?: ReactNode;
}

const spacingClasses: Record<SectionSpacing, string> = {
  default: 'py-20 md:py-32',
  compact: 'py-12 md:py-20',
  large: 'py-28 md:py-40',
  none: 'py-0',
};

export function Section<T extends ElementType = 'section'>({
  as,
  id,
  spacing = 'default',
  container = true,
  containerSize = 'default',
  className,
  children,
  ...rest
}: SectionProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof SectionProps<T>>) {
  const Component = as || 'section';

  return (
    <Component
      id={id}
      className={cn('relative w-full', spacingClasses[spacing], className)}
      {...rest}
    >
      {container ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </Component>
  );
}
