import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = 'hero' | 'section' | 'project' | 'card' | 'subheading';

export interface HeadingProps<T extends ElementType = HeadingLevel> {
  as?: T;
  variant?: HeadingVariant;
  className?: string;
  children?: ReactNode;
}

const defaultLevelToVariant: Record<HeadingLevel, HeadingVariant> = {
  h1: 'hero',
  h2: 'section',
  h3: 'project',
  h4: 'card',
  h5: 'subheading',
  h6: 'subheading',
};

const variantClasses: Record<HeadingVariant, string> = {
  hero: 'text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight font-heading leading-[1.05]',
  section: 'text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight font-heading leading-[1.1]',
  project: 'text-2xl sm:text-3xl font-semibold tracking-tight font-heading leading-snug',
  card: 'text-xl sm:text-2xl font-medium tracking-tight font-heading',
  subheading: 'text-lg sm:text-xl font-medium font-heading',
};

export function Heading<T extends ElementType = 'h2'>({
  as,
  variant,
  className,
  children,
  ...rest
}: HeadingProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof HeadingProps<T>>) {
  const Component = as || 'h2';
  const resolvedVariant =
    variant ||
    (typeof Component === 'string' && Component in defaultLevelToVariant
      ? defaultLevelToVariant[Component as HeadingLevel]
      : 'section');

  return (
    <Component
      className={cn(
        'text-text-primary font-heading',
        variantClasses[resolvedVariant],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
