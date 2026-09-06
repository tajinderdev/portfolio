import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

describe('useActiveSection Hook', () => {
  it('initializes with null active section', () => {
    const { result } = renderHook(() =>
      useActiveSection(['work', 'experience', 'engineering']),
    );
    expect(result.current).toBeNull();
  });
});
