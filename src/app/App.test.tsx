import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App Design System Harness', () => {
  it('renders design system foundation heading and status indicator', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Design System Foundation');
    expect(screen.getByText('Stage 2: Design System Active')).toBeInTheDocument();
  });

  it('renders skip to main content accessibility link', () => {
    render(<App />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders interactive primitives including buttons and links', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /primary action/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /secondary action/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /external accent link/i })).toBeInTheDocument();
  });

  it('renders typography scale and surface cards', () => {
    render(<App />);
    expect(screen.getByText('Hero Heading (64–88px)')).toBeInTheDocument();
    expect(screen.getByText('Surface #111111')).toBeInTheDocument();
    expect(screen.getByText('Surface #161616')).toBeInTheDocument();
  });
});
