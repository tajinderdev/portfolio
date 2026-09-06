import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type LinkVariant = 'default' | 'accent' | 'subtle' | 'nav';

export interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  variant?: LinkVariant;
  external?: boolean;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<LinkVariant, string> = {
  default:
    'text-text-secondary hover:text-text-primary underline-offset-4 hover:underline transition-colors duration-150',
  accent:
    'text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors duration-150',
  subtle:
    'text-text-muted hover:text-text-secondary transition-colors duration-150',
  nav:
    'text-text-secondary hover:text-text-primary font-sans text-sm tracking-wide transition-colors duration-150',
};

export function Link({
  href,
  variant = 'default',
  external,
  className,
  children,
  ...rest
}: LinkProps) {
  const isExternal =
    external ?? (typeof href === 'string' && /^https?:\/\//.test(href));

  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-1 cursor-pointer',
        variantClasses[variant],
        className,
      )}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
