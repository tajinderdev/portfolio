/**
 * Smooth Scroll Utility
 *
 * Provides calibrated, slow, easing-based scrolling to elements without
 * mutating the browser URL hash (e.g. preventing #work from showing in the URL).
 */

export interface SmoothScrollOptions {
  /** Duration in milliseconds. Defaults to 950ms for a deliberate, slow, luxurious scroll. */
  duration?: number;
  /** Offset in pixels from top (e.g. to accommodate sticky header). Defaults to measured header height or 80px. */
  offset?: number;
  /** Callback fired when scrolling finishes. */
  onComplete?: () => void;
}

let activeScrollAnimationId: number | null = null;
let activeAbortCleanup: (() => void) | null = null;

export function cancelCurrentSmoothScroll(): void {
  if (activeScrollAnimationId !== null) {
    cancelAnimationFrame(activeScrollAnimationId);
    activeScrollAnimationId = null;
  }
  if (activeAbortCleanup) {
    activeAbortCleanup();
    activeAbortCleanup = null;
  }
}

/**
 * Cubic ease-in-out curve for gentle start, smooth cruise, and soft landing.
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculates current header height or fallback.
 */
export function getHeaderOffset(): number {
  if (typeof document === 'undefined') return 80;
  const header = document.querySelector('header');
  if (header) {
    const rect = header.getBoundingClientRect();
    if (rect.height > 0) {
      return rect.height;
    }
  }
  return typeof window !== 'undefined' && window.innerWidth >= 640 ? 80 : 64;
}

/**
 * Smoothly scrolls the window to a target element or position over time.
 */
export function smoothScrollTo(
  target: string | HTMLElement | number,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Cancel any in-flight scroll animation
  cancelCurrentSmoothScroll();

  const {
    duration = 950,
    offset = getHeaderOffset(),
    onComplete,
  } = options;

  let targetElement: HTMLElement | null = null;
  let targetY = 0;

  if (typeof target === 'number') {
    targetY = Math.max(0, target);
  } else if (typeof target === 'string') {
    const cleanId = target.startsWith('#') ? target.slice(1) : target;
    if (!cleanId || cleanId === 'hero' || cleanId === 'top' || cleanId === 'main-content' || cleanId === '/') {
      // Top of page
      targetY = 0;
      targetElement = cleanId ? document.getElementById(cleanId) : null;
    } else {
      targetElement = document.getElementById(cleanId);
      if (targetElement) {
        targetY = Math.max(0, targetElement.getBoundingClientRect().top + window.scrollY - offset);
      } else {
        // Element not found; fallback to top
        targetY = 0;
      }
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
    targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  }

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (prefersReducedMotion || duration <= 0) {
    window.scrollTo({ top: targetY, behavior: 'auto' });
    if (targetElement && targetY > 0) {
      targetElement.focus({ preventScroll: true });
    }
    onComplete?.();
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  // If already at destination
  if (Math.abs(distance) < 2) {
    onComplete?.();
    return;
  }

  const startTime = performance.now();

  // Handle user interrupt during animation
  const onUserInterrupt = (e: Event) => {
    if (e.type === 'keydown') {
      const key = (e as KeyboardEvent).key;
      if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(key)) {
        return;
      }
    }
    cancelCurrentSmoothScroll();
  };

  const cleanupListeners = () => {
    window.removeEventListener('wheel', onUserInterrupt);
    window.removeEventListener('touchmove', onUserInterrupt);
    window.removeEventListener('keydown', onUserInterrupt);
  };

  window.addEventListener('wheel', onUserInterrupt, { passive: true });
  window.addEventListener('touchmove', onUserInterrupt, { passive: true });
  window.addEventListener('keydown', onUserInterrupt, { passive: true });

  activeAbortCleanup = cleanupListeners;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    // Dynamically recalculate target top if element exists to adapt to dynamic layout changes
    let currentDestination = targetY;
    if (targetElement && targetY > 0) {
      currentDestination = Math.max(
        0,
        targetElement.getBoundingClientRect().top + window.scrollY - offset
      );
    }

    const currentY = startY + (currentDestination - startY) * eased;
    window.scrollTo(0, currentY);

    if (progress < 1) {
      activeScrollAnimationId = requestAnimationFrame(step);
    } else {
      // Finished
      window.scrollTo(0, currentDestination);
      cancelCurrentSmoothScroll();
      if (targetElement && currentDestination > 0) {
        targetElement.focus({ preventScroll: true });
      }
      onComplete?.();
    }
  };

  activeScrollAnimationId = requestAnimationFrame(step);
}

/**
 * Click event handler for navigation links and buttons.
 * Prevents default URL hash mutation and executes slow smooth scroll.
 */
export function handleSmoothScrollClick(
  e: { preventDefault: () => void },
  target: string,
  options?: SmoothScrollOptions
): void {
  e.preventDefault();
  smoothScrollTo(target, options);
}
