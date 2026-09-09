import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { App } from './App';
import { navigateTo } from '@/lib/router';

describe('App Global Routing & Layout', () => {
  beforeEach(() => {
    navigateTo('/');
  });

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

  it('renders Home sections by default (Hero, About, Contact)', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#hero')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
    
    // Portfolio sections should not be present
    expect(container.querySelector('#work')).not.toBeInTheDocument();
  });

  it('renders Portfolio sections when navigated to /portfolio', () => {
    navigateTo('/portfolio');
    const { container } = render(<App />);
    
    expect(screen.getByText('Engineering Portfolio')).toBeInTheDocument();
    
    expect(container.querySelector('#work')).toBeInTheDocument();
    expect(container.querySelector('#experience')).toBeInTheDocument();
    expect(container.querySelector('#engineering')).toBeInTheDocument();
    expect(container.querySelector('#domains')).toBeInTheDocument();
    expect(container.querySelector('#ai')).toBeInTheDocument();
    expect(container.querySelector('#approach')).toBeInTheDocument();

    // Home sections should not be present (except those wrapped in layouts like Header)
    expect(container.querySelector('#hero')).not.toBeInTheDocument();
  });
});
