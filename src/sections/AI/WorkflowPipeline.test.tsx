import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WorkflowPipeline } from './WorkflowPipeline';
import { getPortfolioContent } from '@/content';

describe('WorkflowPipeline Component', () => {
  const content = getPortfolioContent();
  const steps = content.aiEngineering.workflowSteps;

  it('renders all 6 workflow step buttons in an accessible tablist', () => {
    render(
      <WorkflowPipeline
        steps={steps}
        activeStepId="step-idea"
        onSelectStep={vi.fn()}
      />,
    );

    const tablist = screen.getByRole('tablist', {
      name: /ai-augmented engineering workflow pipeline/i,
    });
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(6);

    expect(screen.getByRole('tab', { name: /Idea & Requirements/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Reason & Technical Research/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Architect & System Design/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Build & Scaffolding/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Validate & Verification/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Improve & Modernization/i })).toBeInTheDocument();
  });

  it('displays the active step inspector with AI role and Human governance cards', () => {
    render(
      <WorkflowPipeline
        steps={steps}
        activeStepId="step-architect"
        onSelectStep={vi.fn()}
      />,
    );

    const architectTab = screen.getByRole('tab', {
      name: /Architect & System Design/i,
    });
    expect(architectTab).toHaveAttribute('aria-selected', 'true');

    // Panel content
    expect(screen.getByText(/AI Role \/\/ Velocity & Synthesis/i)).toBeInTheDocument();
    expect(screen.getByText(/Human Responsibility \/\/ Architecture & Boundaries/i)).toBeInTheDocument();

    const architectStep = steps.find((s) => s.id === 'step-architect')!;
    expect(screen.getByText(architectStep.summary)).toBeInTheDocument();
    expect(screen.getByText(architectStep.aiRole)).toBeInTheDocument();
    expect(screen.getByText(architectStep.humanControl)).toBeInTheDocument();
  });

  it('calls onSelectStep when clicking another step tab', () => {
    const onSelect = vi.fn();
    render(
      <WorkflowPipeline
        steps={steps}
        activeStepId="step-idea"
        onSelectStep={onSelect}
      />,
    );

    const validateTab = screen.getByRole('tab', {
      name: /Validate & Verification/i,
    });
    fireEvent.click(validateTab);

    expect(onSelect).toHaveBeenCalledWith('step-validate');
  });
});
