import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container, Section } from './index';

describe('Layout Primitives', () => {
  it('renders Container with size classes', () => {
    render(<Container size="narrow">Narrow Content</Container>);
    const container = screen.getByText('Narrow Content');
    expect(container).toHaveClass('max-w-4xl');
  });

  it('renders Section as semantic element with spacing classes', () => {
    render(
      <Section id="test-section" spacing="compact">
        Section Content
      </Section>,
    );
    const section = screen.getByText('Section Content').closest('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'test-section');
    expect(section).toHaveClass('py-12');
  });
});
