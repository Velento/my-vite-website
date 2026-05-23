/**
 * Motion preferences helper.
 *
 * Single check for the `prefers-reduced-motion` media query so every animation
 * (count-up stats, fade-in-on-scroll, hero autoplay) honours it the same way
 * and stays SSR-safe (returns `false` when `window`/`matchMedia` is absent).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
