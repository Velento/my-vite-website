import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

const FadeInOnScroll = ({ children, delay = 0, y = 24 }: FadeInOnScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    // If element is already at or near the viewport on page load, skip the
    // animation — hiding visible content after hydration causes a flash.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > 0) return undefined;

    // Element is off-screen — safe to hide and animate on scroll.
    // Add will-animate WITHOUT transition first so the instant hide is not animated.
    el.classList.add('will-animate');

    // One frame later: enable the transition so the reveal animates smoothly.
    const rafId = requestAnimationFrame(() => {
      el.classList.add('fade-animated');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fade-in-on-scroll"
      style={
        {
          '--fade-in-y': `${y}px`,
          '--fade-in-delay': delay ? `${delay}s` : undefined,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
