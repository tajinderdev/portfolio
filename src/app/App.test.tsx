import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { App } from './App';

describe('App Global Layout & Anchors', () => {
  it('renders skip to main content accessibility link', () => {
    render(<App />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders main navigation and header branding', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(within(header).getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    expect(within(header).getByText('Tajinder Singh')).toBeInTheDocument();
  });

  it('renders primary Hero section with positioning headline', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /turning complex problems into practical software systems/i,
      }),
    ).toBeInTheDocument();
  });

  it('contains all anchored sections for smooth scroll navigation', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#hero')).toBeInTheDocument();
    expect(container.querySelector('#work')).toBeInTheDocument();
    expect(container.querySelector('#experience')).toBeInTheDocument();
    expect(container.querySelector('#engineering')).toBeInTheDocument();
    expect(container.querySelector('#domains')).toBeInTheDocument();
    expect(container.querySelector('#ai')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders AI-Augmented Engineering section at #ai anchor', () => {
    const { container } = render(<App />);
    const aiSection = container.querySelector('#ai');
    expect(aiSection).toBeInTheDocument();
    expect(
      within(aiSection as HTMLElement).getByRole('heading', {
        level: 2,
        name: /ai-augmented engineering: an engineering multiplier grounded in architectural control/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(aiSection as HTMLElement).getByRole('tablist', {
        name: /ai-augmented engineering workflow pipeline/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders Selected Work & Case Studies section at #work anchor', () => {
    const { container } = render(<App />);
    const workSection = container.querySelector('#work');
    expect(workSection).toBeInTheDocument();
    expect(
      within(workSection as HTMLElement).getByRole('heading', {
        level: 2,
        name: /architectural teardowns of mission-critical production systems/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(workSection as HTMLElement).getByRole('tablist', {
        name: /case studies and architecture teardowns/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders Domain Experience section at #domains anchor', () => {
    const { container } = render(<App />);
    const domainsSection = container.querySelector('#domains');
    expect(domainsSection).toBeInTheDocument();
    expect(
      within(domainsSection as HTMLElement).getByRole('heading', {
        level: 2,
        name: /bridging complex business domains with resilient engineering/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(domainsSection as HTMLElement).getByRole('tablist', {
        name: /selectable business domains/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders Professional Experience section at #experience anchor', () => {
    const { container } = render(<App />);
    const expSection = container.querySelector('#experience');
    expect(expSection).toBeInTheDocument();
    expect(
      within(expSection as HTMLElement).getByRole('heading', {
        level: 2,
        name: /engineering progression from implementation to systems architecture/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(expSection as HTMLElement).getByRole('tablist', {
        name: /career progression milestones/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders Technical Capabilities section at #engineering anchor', () => {
    const { container } = render(<App />);
    const engineeringSection = container.querySelector('#engineering');
    expect(engineeringSection).toBeInTheDocument();
    expect(
      within(engineeringSection as HTMLElement).getByRole('heading', {
        level: 2,
        name: /engineered for capability, resilience, and architectural clarity/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(engineeringSection as HTMLElement).getByRole('region', {
        name: /interactive architecture & dependency map/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(engineeringSection as HTMLElement).getByRole('searchbox', {
        name: /search technologies and capabilities/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders About / Engineering Philosophy section at #about anchor', () => {
    const { container } = render(<App />);
    const aboutSection = container.querySelector('#about');
    expect(aboutSection).toBeInTheDocument();
    expect(
      within(aboutSection as HTMLElement).getByRole('heading', {
        level: 2,
        name: /systems over silos\. root causes over symptoms\./i,
      }),
    ).toBeInTheDocument();
    expect(
      within(aboutSection as HTMLElement).getByRole('tablist', {
        name: /architectural trace layers/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders global footer with confidentiality notice and copyright', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/preserve confidentiality/i)).toBeInTheDocument();
  });
});
