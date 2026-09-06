import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GovernanceMatrix } from './GovernanceMatrix';
import { getPortfolioContent } from '@/content';

describe('GovernanceMatrix Component', () => {
  const content = getPortfolioContent();
  const philosophy = content.aiEngineering.philosophy;

  it('renders both the multiplier and control pillars with headers and text', () => {
    render(<GovernanceMatrix philosophy={philosophy} />);

    expect(screen.getByText('The Multiplier Effect')).toBeInTheDocument();
    expect(screen.getByText('The Architectural Perimeter')).toBeInTheDocument();

    expect(screen.getByText(philosophy.multiplier)).toBeInTheDocument();
    expect(screen.getByText(philosophy.control)).toBeInTheDocument();
  });

  it('highlights concrete multiplier vectors and governance boundaries', () => {
    render(<GovernanceMatrix philosophy={philosophy} />);

    expect(screen.getByText(/rapid prototyping of unfamiliar domain interfaces/i)).toBeInTheDocument();
    expect(screen.getByText(/system topology, service decoupling, and state machines/i)).toBeInTheDocument();
    expect(screen.getByText(/deterministic verification and strict red-green testing/i)).toBeInTheDocument();
  });
});
