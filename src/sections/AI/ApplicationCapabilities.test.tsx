import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApplicationCapabilities } from './ApplicationCapabilities';
import { getPortfolioContent } from '@/content';

describe('ApplicationCapabilities Component', () => {
  const content = getPortfolioContent();
  const spheres = content.aiEngineering.capabilitySpheres;

  it('renders both capability spheres with kickers and titles', () => {
    render(<ApplicationCapabilities spheres={spheres} />);

    expect(screen.getByText('Developer Workflow Acceleration')).toBeInTheDocument();
    expect(screen.getByText('SPHERE 01 // ENGINEERING HARNESS')).toBeInTheDocument();

    expect(screen.getByText('In-Application AI Capabilities')).toBeInTheDocument();
    expect(screen.getByText('SPHERE 02 // APPLICATION CAPABILITIES')).toBeInTheDocument();
  });

  it('renders concrete capabilities for each sphere', () => {
    render(<ApplicationCapabilities spheres={spheres} />);

    spheres.forEach((sphere) => {
      expect(screen.getByText(sphere.description)).toBeInTheDocument();
      sphere.capabilities.forEach((cap) => {
        expect(screen.getByText(cap)).toBeInTheDocument();
      });
    });
  });
});
