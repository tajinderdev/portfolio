import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThreeBoundary } from './ThreeBoundary';

describe('ThreeBoundary Component', () => {
  it('renders fallback content gracefully when WebGL is absent', () => {
    render(
      <ThreeBoundary fallback={<div>Static Architecture Diagram</div>}>
        <div>3D WebGL Canvas Scene</div>
      </ThreeBoundary>,
    );

    expect(screen.getByText('Static Architecture Diagram')).toBeInTheDocument();
    expect(screen.queryByText('3D WebGL Canvas Scene')).not.toBeInTheDocument();
  });
});
