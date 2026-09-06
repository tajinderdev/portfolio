import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App Global Layout & Anchors', () => {
  it('renders skip to main content accessibility link', () => {
    render(<App />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders main navigation and active layout indicators', () => {
    render(<App />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    expect(screen.getByText('Stage 3: Global Navigation & Layout Active')).toBeInTheDocument();
  });

  it('contains all 5 anchored sections for smooth scroll navigation', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#work')).toBeInTheDocument();
    expect(container.querySelector('#experience')).toBeInTheDocument();
    expect(container.querySelector('#engineering')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders global footer with confidentiality notice and copyright', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/preserve confidentiality/i)).toBeInTheDocument();
  });
});
