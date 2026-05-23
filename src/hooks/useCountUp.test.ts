import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCountUp } from './useCountUp';

// jsdom ships no IntersectionObserver, so the hook takes its "leave the final
// value in place" path — exactly the server/no-observer behaviour we want to
// guarantee stays correct (the prerender must show the final figure).
beforeEach(() => {
  vi.unstubAllGlobals();
});

describe('useCountUp', () => {
  it('uses the raw value as the initial (and SSR-safe) display', () => {
    const { result } = renderHook(() => useCountUp('500+'));
    expect(result.current.display).toBe('500+');
  });

  it('keeps the final value when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as unknown as typeof matchMedia;
    const { result } = renderHook(() => useCountUp('5'));
    expect(result.current.display).toBe('5');
  });

  it('leaves non-numeric input untouched', () => {
    const { result } = renderHook(() => useCountUp('abc'));
    expect(result.current.display).toBe('abc');
  });
});
