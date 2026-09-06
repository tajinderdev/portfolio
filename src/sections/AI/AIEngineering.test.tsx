import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIEngineering } from './AIEngineering';
import { getPortfolioContent } from '@/content';

describe('AIEngineering Section', () => {
  const content = getPortfolioContent();

  it('renders within anchored section #ai with section header and positioning statement', () => {
    const { container } = render(<AIEngineering data={content.aiEngineering} />);
    const section = container.querySelector('section#ai');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('05 / MODERN ENGINEERING')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /ai-augmented engineering: an engineering multiplier grounded in architectural control/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders the GovernanceMatrix, WorkflowPipeline, and ApplicationCapabilities', () => {
    render(<AIEngineering data={content.aiEngineering} />);

    // Governance Matrix
    expect(screen.getByText('The Multiplier Effect')).toBeInTheDocument();
    expect(screen.getByText('The Architectural Perimeter')).toBeInTheDocument();

    // Workflow Pipeline
    expect(screen.getByRole('tablist', { name: /ai-augmented engineering workflow pipeline/i })).toBeInTheDocument();

    // Capability Spheres
    expect(screen.getByText('Developer Workflow Acceleration')).toBeInTheDocument();
    expect(screen.getByText('In-Application AI Capabilities')).toBeInTheDocument();
  });

  it('allows interacting with workflow steps to inspect different stages', () => {
    render(<AIEngineering data={content.aiEngineering} />);

    const validateTab = screen.getByRole('tab', {
      name: /Validate & Verification/i,
    });
    fireEvent.click(validateTab);

    expect(validateTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('STAGE 05 // QUALITY')).toBeInTheDocument();
  });
});
