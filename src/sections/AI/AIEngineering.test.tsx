import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIEngineering } from './AIEngineering';
import { WorkflowStepModal } from './WorkflowStepModal';
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
        name: /modern engineering/i,
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

  it('allows interacting with workflow steps to open modal for stage details', () => {
    render(<AIEngineering data={content.aiEngineering} />);

    const validateTab = screen.getByRole('tab', {
      name: /Validate & Verification/i,
    });
    fireEvent.click(validateTab);

    // Modal opens
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('STAGE 05 // QUALITY')).toBeInTheDocument();
  });

  describe('WorkflowStepModal Component', () => {
    const mockStep = content.aiEngineering.workflowSteps[0]!;

    it('renders modal when open and handles close action', () => {
      const onClose = vi.fn();
      const onSelectStep = vi.fn();

      render(
        <WorkflowStepModal
          step={mockStep}
          steps={content.aiEngineering.workflowSteps}
          isOpen={true}
          onClose={onClose}
          onSelectStep={onSelectStep}
        />,
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: mockStep.name })).toBeInTheDocument();

      const closeBtn = screen.getByRole('button', { name: /close workflow step details/i });
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
