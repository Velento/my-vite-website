/**
 * Smooth-scroll helpers shared across the floating layer, hero CTAs and nav.
 *
 * Centralised so every "scroll to top" / "scroll to the lead form" behaves the
 * same and degrades gracefully where `scroll-behavior` isn't supported.
 */

/** True when the browser understands the `behavior` option of scroll APIs. */
function supportsSmoothScroll(): boolean {
  return typeof document !== 'undefined' && 'scrollBehavior' in document.documentElement.style;
}

/**
 * Scroll the window back to the top. Uses a smooth animation where supported,
 * and an instant jump otherwise. Calling both forms would cancel the smooth
 * animation mid-flight, so we pick exactly one.
 */
export function scrollToTop(): void {
  if (typeof window === 'undefined') return;
  if (supportsSmoothScroll()) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }
}

/**
 * Smooth-scroll an element identified by id into view. Runs on the next frame
 * so it works right after a state change that mounts/reveals the target (e.g.
 * closing a popup before scrolling to the form below it). No-op if not found.
 */
export function scrollToElement(id: string): void {
  if (typeof document === 'undefined') return;
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  });
}
