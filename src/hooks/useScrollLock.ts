import { useEffect } from 'react';

/**
 * useScrollLock
 *
 * Prevents body scrolling when a modal or mobile drawer is open.
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalOverflow = document.body.style.overflow;
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}
