import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  easeInOutCubic,
  getHeaderOffset,
  smoothScrollTo,
  handleSmoothScrollClick,
  cancelCurrentSmoothScroll,
} from './smoothScroll';

describe('smoothScroll utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.scrollTo = vi.fn();
    window.scrollY = 0;
  });

  afterEach(() => {
    cancelCurrentSmoothScroll();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('easeInOutCubic', () => {
    it('calculates expected easing values at key progress boundaries', () => {
      expect(easeInOutCubic(0)).toBe(0);
      expect(easeInOutCubic(0.5)).toBe(0.5);
      expect(easeInOutCubic(1)).toBe(1);
      // Gentle start
      expect(easeInOutCubic(0.1)).toBeCloseTo(0.004, 3);
      // Soft landing
      expect(easeInOutCubic(0.9)).toBeCloseTo(0.996, 3);
    });
  });

  describe('getHeaderOffset', () => {
    it('returns measured header height when header element exists in DOM', () => {
      const header = document.createElement('header');
      header.getBoundingClientRect = vi.fn().mockReturnValue({ height: 72 } as DOMRect);
      document.body.appendChild(header);

      expect(getHeaderOffset()).toBe(72);
      document.body.removeChild(header);
    });

    it('falls back to default offset when header is not in DOM', () => {
      expect(getHeaderOffset()).toBeGreaterThanOrEqual(64);
    });
  });

  describe('smoothScrollTo', () => {
    it('does NOT alter window.location.hash when scrolling', () => {
      const initialHash = window.location.hash;
      smoothScrollTo('#work', { duration: 100 });
      expect(window.location.hash).toBe(initialHash);
    });

    it('immediately jumps when prefers-reduced-motion is active', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const targetEl = document.createElement('section');
      targetEl.id = 'work';
      targetEl.getBoundingClientRect = vi.fn().mockReturnValue({ top: 500 } as DOMRect);
      document.body.appendChild(targetEl);

      smoothScrollTo('#work', { offset: 80 });

      expect(window.scrollTo).toHaveBeenCalledWith({ top: 420, behavior: 'auto' });
      document.body.removeChild(targetEl);
    });

    it('animates smoothly to top when target is #, #hero, or #main-content', () => {
      window.scrollY = 600;
      smoothScrollTo('#', { duration: 500 });

      // Advance time by half
      vi.advanceTimersByTime(250);
      expect(window.scrollTo).toHaveBeenCalled();

      // Advance time to completion
      vi.advanceTimersByTime(300);
      expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
    });

    it('animates smoothly to target section taking header offset into account', () => {
      window.scrollY = 0;
      const targetEl = document.createElement('section');
      targetEl.id = 'contact';
      targetEl.getBoundingClientRect = vi.fn().mockReturnValue({ top: 1080 } as DOMRect);
      document.body.appendChild(targetEl);

      smoothScrollTo('#contact', { duration: 600, offset: 80 });

      vi.advanceTimersByTime(700);
      // Target Y is 1080 - 80 = 1000
      expect(window.scrollTo).toHaveBeenLastCalledWith(0, 1000);

      document.body.removeChild(targetEl);
    });
  });

  describe('handleSmoothScrollClick', () => {
    it('calls preventDefault and triggers smoothScrollTo', () => {
      const mockEvent = { preventDefault: vi.fn() };
      handleSmoothScrollClick(mockEvent, '#work');

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  });
});
