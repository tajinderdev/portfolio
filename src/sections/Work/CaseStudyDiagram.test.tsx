import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CaseStudyDiagram } from './CaseStudyDiagram';
import type { CaseStudyArchitectureDiagram } from '@/content/models';

describe('CaseStudyDiagram Component', () => {
  const mockDiagram: CaseStudyArchitectureDiagram = {
    title: 'Test Architectural Pipeline',
    nodes: [
      { id: 'n1', label: 'Web Client', role: 'React UI', tier: 'client' },
      { id: 'n2', label: 'API Gateway', role: 'Auth Middleware', tier: 'gateway' },
      { id: 'n3', label: 'Core Engine', role: 'State Machine', tier: 'app' },
      { id: 'n4', label: 'Database', role: 'PostgreSQL Store', tier: 'data' },
    ],
    dataFlow: [
      'Step 1: Client submits request to Gateway',
      'Step 2: Gateway validates and routes to Core Engine',
      'Step 3: Core Engine updates Database',
    ],
  };

  it('renders diagram title and figure container with accessible aria label', () => {
    render(<CaseStudyDiagram diagram={mockDiagram} />);

    expect(screen.getByText('Test Architectural Pipeline')).toBeInTheDocument();
    expect(screen.getByRole('figure', { name: /test architectural pipeline/i })).toBeInTheDocument();
  });

  it('renders all architecture nodes with labels, roles, and tier tags', () => {
    render(<CaseStudyDiagram diagram={mockDiagram} />);

    expect(screen.getByText('Web Client')).toBeInTheDocument();
    expect(screen.getByText('React UI')).toBeInTheDocument();
    expect(screen.getByText('CLIENT')).toBeInTheDocument();

    expect(screen.getByText('API Gateway')).toBeInTheDocument();
    expect(screen.getByText('GATEWAY')).toBeInTheDocument();

    expect(screen.getByText('Core Engine')).toBeInTheDocument();
    expect(screen.getByText('APP')).toBeInTheDocument();

    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(screen.getByText('DATA')).toBeInTheDocument();
  });

  it('renders the ordered data flow execution steps', () => {
    render(<CaseStudyDiagram diagram={mockDiagram} />);

    expect(screen.getByText(/data flow & execution sequence/i)).toBeInTheDocument();
    expect(screen.getByText('Step 1: Client submits request to Gateway')).toBeInTheDocument();
    expect(screen.getByText('Step 2: Gateway validates and routes to Core Engine')).toBeInTheDocument();
    expect(screen.getByText('Step 3: Core Engine updates Database')).toBeInTheDocument();
  });
});
