import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App Root Shell', () => {
  it('renders Tajinder Singh header and senior engineering title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tajinder Singh');
    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
  });

  it('renders skip to main content accessibility link', () => {
    render(<App />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('proves structured content and design tokens are bound', () => {
    render(<App />);
    expect(screen.getByText('Decoupled Structured Content')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS v4 Native')).toBeInTheDocument();
  });
});
