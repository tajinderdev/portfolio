import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading, Text, MonoText, SectionHeader } from './index';

describe('Typography Primitives', () => {
  it('renders Heading with correct tag and classes', () => {
    render(<Heading as="h1" variant="hero">Tajinder Singh</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Tajinder Singh');
    expect(heading).toHaveClass('font-heading');
    expect(heading).toHaveClass('text-4xl');
  });

  it('renders Text with body and lead variants', () => {
    render(
      <div>
        <Text variant="lead">Lead sentence</Text>
        <Text variant="body">Body paragraph</Text>
      </div>,
    );
    expect(screen.getByText('Lead sentence')).toHaveClass('text-lg');
    expect(screen.getByText('Body paragraph')).toHaveClass('text-base');
  });

  it('renders MonoText with font-mono', () => {
    render(<MonoText color="accent">01 / ARCHITECTURE</MonoText>);
    const mono = screen.getByText('01 / ARCHITECTURE');
    expect(mono).toHaveClass('font-mono');
    expect(mono).toHaveClass('text-accent');
  });

  it('renders SectionHeader with kicker, title, and description', () => {
    render(
      <SectionHeader
        kicker="FEATURED"
        title="Selected Work"
        description="Engineered enterprise systems"
      />,
    );
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Selected Work');
    expect(screen.getByText('Engineered enterprise systems')).toBeInTheDocument();
  });
});
