import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  trackContactClick,
  trackLeadConversion,
  trackFormStart,
  trackPopupShown,
  trackPackageSelected,
  trackCTAClick,
} from './analytics';

beforeEach(() => {
  window.dataLayer = [];
  window.gtag = vi.fn() as unknown as typeof window.gtag;
  window.fbq = vi.fn() as unknown as typeof window.fbq;
  Object.defineProperty(navigator, 'sendBeacon', {
    value: vi.fn(() => true),
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe('trackContactClick', () => {
  it('pushes a contact_click event, fires the pixel and pings the worker', () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', 'https://worker.example/');
    trackContactClick('whatsapp');

    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'contact_click', contact_channel: 'whatsapp' })
    );
    expect(window.fbq).toHaveBeenCalledWith('track', 'Contact', { contact_channel: 'whatsapp' });
    expect(navigator.sendBeacon).toHaveBeenCalledWith(
      'https://worker.example/track',
      expect.any(Blob)
    );
  });

  it('does not ping the worker when no proxy URL is configured', () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', '');
    trackContactClick('phone');
    expect(navigator.sendBeacon).not.toHaveBeenCalled();
  });
});

describe('trackLeadConversion', () => {
  it('uses the default value and fires GTM, Google Ads and the pixel', () => {
    vi.stubEnv('VITE_GOOGLE_ADS_CONVERSION_ID', 'AW-123/label');
    trackLeadConversion();

    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'lead_form_submit', value: 750, currency: 'PLN' })
    );
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({ send_to: 'AW-123/label', value: 750, currency: 'PLN' })
    );
    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead', { value: 750, currency: 'PLN' });
  });

  it('honours a custom value and currency', () => {
    trackLeadConversion({ value: 2400, currency: 'EUR' });
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'lead_form_submit', value: 2400, currency: 'EUR' })
    );
  });

  it('skips the Google Ads call when no conversion id is set', () => {
    vi.stubEnv('VITE_GOOGLE_ADS_CONVERSION_ID', '');
    trackLeadConversion();
    expect(window.gtag).not.toHaveBeenCalled();
  });
});

describe('other engagement events', () => {
  it('trackFormStart pushes lead_form_start and InitiateCheckout', () => {
    trackFormStart();
    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: 'lead_form_start' }));
    expect(window.fbq).toHaveBeenCalledWith('track', 'InitiateCheckout');
  });

  it('trackPopupShown records the popup name', () => {
    trackPopupShown('exit_intent');
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'popup_shown', event_label: 'exit_intent' })
    );
  });

  it('trackPackageSelected carries the package name + value to GTM and the pixel', () => {
    trackPackageSelected('ultra', 2400);
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'package_selected', package_name: 'ultra', value: 2400 })
    );
    expect(window.fbq).toHaveBeenCalledWith('track', 'AddToCart', {
      content_name: 'ultra',
      value: 2400,
      currency: 'PLN',
    });
  });

  it('trackCTAClick records the label', () => {
    trackCTAClick('hero_cta');
    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'cta_click', event_label: 'hero_cta' })
    );
  });
});
