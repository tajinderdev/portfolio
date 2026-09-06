import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSmoothScroll } from './useSmoothScroll';
import * as smoothScrollModule from '@/lib/smoothScroll';

describe('useSmoothScroll hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('intercepts in-page anchor clicks, calls preventDefault, and triggers smoothScrollTo', () => {
    const smoothScrollSpy = vi.spyOn(smoothScrollModule, 'smoothScrollTo').mockImplementation(() => {});

    renderHook(() => useSmoothScroll());

    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#work');
    document.body.appendChild(anchor);

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
    });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    anchor.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    expect(smoothScrollSpy).toHaveBeenCalledWith('#work');

    document.body.removeChild(anchor);
  });

  it('ignores non-hash elements and does not call smoothScrollTo', () => {
    const smoothScrollSpy = vi.spyOn(smoothScrollModule, 'smoothScrollTo').mockImplementation(() => {});

    renderHook(() => useSmoothScroll());

    const button = document.createElement('button');
    document.body.appendChild(button);

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
    });

    button.dispatchEvent(clickEvent);

    expect(smoothScrollSpy).not.toHaveBeenCalled();

    document.body.removeChild(button);
  });

  it('ignores modified clicks such as Ctrl+click or middle-click', () => {
    const smoothScrollSpy = vi.spyOn(smoothScrollModule, 'smoothScrollTo').mockImplementation(() => {});

    renderHook(() => useSmoothScroll());

    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#contact');
    document.body.appendChild(anchor);

    const ctrlClickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      button: 0,
      ctrlKey: true,
    });
    const preventDefaultSpy = vi.spyOn(ctrlClickEvent, 'preventDefault');

    anchor.dispatchEvent(ctrlClickEvent);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(smoothScrollSpy).not.toHaveBeenCalled();

    document.body.removeChild(anchor);
  });
});
