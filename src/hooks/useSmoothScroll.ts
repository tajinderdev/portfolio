import { useEffect } from 'react';
import { smoothScrollTo } from '@/lib/smoothScroll';

/**
 * useSmoothScroll
 *
 * Global listener hook that intercepts clicks on in-page anchor links (`href^="#"`),
 * prevents hash mutations in the browser URL bar, and executes a slow, smooth scroll.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleClick = (e: MouseEvent) => {
      // Ignore modified clicks (Ctrl+click, Cmd+click, middle click) or already prevented events
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Prevent URL hash from changing in address bar
      e.preventDefault();

      smoothScrollTo(href);
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
}
