import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CookieConsent from './CookieConsent';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: unknown) => (typeof fallback === 'string' ? fallback : key),
  }),
}));

vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

const applyMarketingConsent = vi.fn();
vi.mock('../../services/marketingConsent', () => ({
  applyMarketingConsent: (c: unknown) => applyMarketingConsent(c),
}));

beforeEach(() => {
  localStorage.clear();
  applyMarketingConsent.mockClear();
});

describe('CookieConsent', () => {
  it('shows the banner when no choice is stored', () => {
    render(<CookieConsent />);
    expect(screen.getByText('cookieMessage')).toBeInTheDocument();
  });

  it('persists full consent and hides on "accept all"', () => {
    const { container } = render(<CookieConsent />);
    fireEvent.click(screen.getByText('acceptAll'));

    expect(JSON.parse(localStorage.getItem('cookieConsent')!)).toEqual({
      essential: true,
      analytics: true,
      marketing: true,
    });
    expect(applyMarketingConsent).toHaveBeenCalledWith(
      expect.objectContaining({ marketing: true })
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('persists a declined choice', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText('decline'));
    expect(JSON.parse(localStorage.getItem('cookieConsent')!)).toEqual({
      essential: false,
      analytics: false,
      marketing: false,
    });
  });

  it('stays hidden when a choice was already stored', () => {
    localStorage.setItem(
      'cookieConsent',
      JSON.stringify({ essential: true, analytics: false, marketing: false })
    );
    const { container } = render(<CookieConsent />);
    expect(container).toBeEmptyDOMElement();
  });
});
