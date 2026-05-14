import { useEffect, useState } from 'react';
import './ScrollToTop.css';

const VISIBLE_AFTER_PX = 480;

/**
 * Mounted at App level (NOT inside Footer) so `position: fixed` always anchors
 * to the viewport. Previously this lived inside <footer>, and on mobile Safari
 * a fixed child of a scrollable container can get mis-positioned — hence the
 * "button escapes the screen" report.
 *
 * On mobile the button sits above StickyMobileBar (which occupies the bottom
 * edge); on desktop it sits in the bottom-right corner. Hidden until the user
 * has scrolled past the hero so it doesn't compete with the slide CTAs.
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > VISIBLE_AFTER_PX);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    // Use smooth scroll where supported, fall back to instant scroll only
    // when the browser truly doesn't understand the options object. Calling
    // both forms kills the smooth animation, which made the page look like
    // it was being "cut" - the smooth scroll started, then the instant
    // fallback teleported the viewport to 0 mid-animation.
    const supportsSmooth =
      typeof document !== 'undefined' && 'scrollBehavior' in document.documentElement.style;
    if (supportsSmooth) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 14l6-6 6 6"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
