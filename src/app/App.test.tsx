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

  it('contains all 5 anchored sections for smooth scroll navigation', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#hero')).toBeInTheDocument();
    expect(container.querySelector('#work')).toBeInTheDocument();
    expect(container.querySelector('#experience')).toBeInTheDocument();
    expect(container.querySelector('#engineering')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
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
