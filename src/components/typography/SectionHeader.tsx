import type { ReactNode, ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { Heading } from './Heading';
import { Text } from './Text';
import { MonoText } from './MonoText';

export interface SectionHeaderProps {
  kicker?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = 'left',
  className,
  titleAs = 'h2',
}: SectionHeaderProps): ReactElement {
  return (
    <div
      className={cn(
        'space-y-3 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {kicker && (
        <div className="flex items-center gap-2">
          {align === 'center' && <span className="w-4 h-px bg-accent/40" />}
          <MonoText
            size="xs"
            color="accent"
            className="uppercase tracking-widest font-medium"
          >
            {kicker}
          </MonoText>
          {align === 'center' && <span className="w-4 h-px bg-accent/40" />}
        </div>
      )}

      {typeof title === 'string' ? (
        <Heading as={titleAs} variant="section">
          {title}
        </Heading>
      ) : (
        title
      )}

      {description &&
        (typeof description === 'string' ? (
          <Text variant="lead" color="secondary" className="max-w-2xl">
            {description}
          </Text>
        ) : (
          description
        ))}
    </div>
  );
}
