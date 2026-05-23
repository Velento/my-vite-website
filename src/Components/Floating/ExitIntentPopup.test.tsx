import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ExitIntentPopup from './ExitIntentPopup';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: unknown) => (typeof fallback === 'string' ? fallback : key),
  }),
}));

vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

const trackPopupShown = vi.fn();
vi.mock('../../services/analytics', () => ({
  trackPopupShown: (n: string) => trackPopupShown(n),
  trackContactClick: vi.fn(),
  trackCTAClick: vi.fn(),
}));

function setViewport(isDesktop: boolean) {
  window.matchMedia = vi
    .fn()
    .mockReturnValue({ matches: isDesktop }) as unknown as typeof matchMedia;
}

beforeEach(() => {
  sessionStorage.clear();
  trackPopupShown.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('ExitIntentPopup', () => {
  it('renders nothing on mount', () => {
    setViewport(true);
    const { container } = render(<ExitIntentPopup />);
    expect(container).toBeEmptyDOMElement();
  });

  it('opens on exit intent once enough time has passed (desktop)', () => {
    setViewport(true);
    vi.useFakeTimers();
    render(<ExitIntentPopup />);

    act(() => {
      vi.advanceTimersByTime(9000); // past MIN_TIME_ON_PAGE_MS
      fireEvent.mouseLeave(document, { clientY: -5 });
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(trackPopupShown).toHaveBeenCalledWith('exit_intent');
  });

  it('does not open on mobile viewports', () => {
    setViewport(false);
    vi.useFakeTimers();
    const { container } = render(<ExitIntentPopup />);

    act(() => {
      vi.advanceTimersByTime(9000);
      fireEvent.mouseLeave(document, { clientY: -5 });
    });

    expect(container).toBeEmptyDOMElement();
  });
});
