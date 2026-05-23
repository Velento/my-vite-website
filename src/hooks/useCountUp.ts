/**
 * Counts a numeric stat up from zero the first time it scrolls into view.
 *
 * Accepts the raw display string (e.g. "500+", "5", "5+") and preserves any
 * non-digit prefix/suffix. The initial state is the final value, so the
 * server-rendered/prerendered markup is correct and hydration matches; the
 * animation only starts once the element enters the viewport on the client.
 *
 * Honors `prefers-reduced-motion` — the final value is shown without motion.
 */

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion';

/** Ease-out cubic — fast start, gentle settle. */
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export function useCountUp(
  raw: string,
  durationMs = 1400
): { ref: React.RefObject<HTMLElement>; display: string } {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(raw);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Split "500+" into prefix / number / suffix; bail if there is no number.
    const match = /^(\D*)(\d+)(\D*)$/.exec(raw);
    if (!match) return undefined;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits);

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return undefined; // Leave the final value in place.
    }

    let frame = 0;
    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        const current = Math.round(easeOutCubic(progress) * target);
        setDisplay(`${prefix}${current}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [raw, durationMs]);

  return { ref, display };
}
