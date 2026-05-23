import { useEffect } from 'react';

/**
 * Locks `<body>` scroll while `active` is true and restores the previous value
 * on cleanup. Capturing the prior value (rather than hardcoding `''`) makes it
 * safe to nest: an inner modal restores the outer modal's `hidden`, not the
 * page default, so closing the inner one doesn't unlock the page underneath.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
