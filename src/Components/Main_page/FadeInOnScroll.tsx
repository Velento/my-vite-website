import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

const FadeInOnScroll = ({ children, delay = 0, y = 24 }: FadeInOnScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-on-scroll${visible ? ' is-visible' : ''}`}
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
