import { useState, useEffect } from 'react';

export interface UseActiveSectionOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * useActiveSection
 *
 * Tracks which section is currently visible in the viewport using IntersectionObserver.
 * Updates the active section state for navigation indicators without causing layout thrashing.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  {
    rootMargin = '-20% 0px -60% 0px',
    threshold = 0,
  }: UseActiveSectionOptions = {},
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin, threshold },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}
