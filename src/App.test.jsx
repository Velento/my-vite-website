import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mocks ────────────────────────────────────────────────────────────────────
vi.mock('./i18n', () => ({}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => (typeof fallback === 'string' ? fallback : key),
    i18n: { language: 'ru', changeLanguage: vi.fn() },
  }),
  I18nextProvider: ({ children }) => children,
}));

vi.mock('./Components/Main_page/Slider', () => ({
  default: () => <div data-testid="slider">Slider</div>,
}));
vi.mock('./Components/Main_page/Pricelist', () => ({
  default: () => <div data-testid="pricelist">Pricelist</div>,
}));
vi.mock('./Components/Main_page/Team', () => ({
  default: () => <div data-testid="team">Team</div>,
}));

// Stub Telegram bot credentials so the service does not bail early in tests
vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', '123456:test-token');
vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '987654321');

const okJsonResponse = () => ({
  ok: true,
  status: 200,
  json: async () => ({ ok: true, result: { message_id: 1 } }),
});

// ── Analytics service tests ──────────────────────────────────────────────────
import { trackLeadConversion, trackContactClick } from './services/analytics';

describe('trackLeadConversion', () => {
  beforeEach(() => {
    delete window.gtag;
    delete window.fbq;
    window.dataLayer = [];
  });

  it('pushes lead_form_submit event with default value/currency to dataLayer', () => {
    trackLeadConversion();

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0].event).toBe('lead_form_submit');
    expect(window.dataLayer[0].value).toBe(750);
    expect(window.dataLayer[0].currency).toBe('PLN');
  });

  it('honors caller-provided value + currency', () => {
    trackLeadConversion({ value: 1500, currency: 'EUR' });

    expect(window.dataLayer[0].value).toBe(1500);
    expect(window.dataLayer[0].currency).toBe('EUR');
  });

  it('calls gtag conversion when gtag and conversion ID are available', () => {
    window.gtag = vi.fn();
    vi.stubEnv('VITE_GOOGLE_ADS_CONVERSION_ID', 'AW-TEST/TEST');

    trackLeadConversion();

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'conversion',
      expect.objectContaining({ send_to: 'AW-TEST/TEST', value: 750, currency: 'PLN' })
    );
    vi.unstubAllEnvs();
    vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', '123456:test-token');
    vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '987654321');
  });

  it('skips gtag conversion when conversion ID is not configured', () => {
    window.gtag = vi.fn();

    trackLeadConversion();

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('calls fbq Lead with value/currency when fbq is available', () => {
    window.fbq = vi.fn();

    trackLeadConversion();

    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead', { value: 750, currency: 'PLN' });
  });

  it('does not throw when no tracking is available', () => {
    window.dataLayer = undefined;

    expect(() => trackLeadConversion()).not.toThrow();
  });
});

describe('trackContactClick', () => {
  beforeEach(() => {
    delete window.fbq;
    window.dataLayer = [];
  });

  it('pushes contact_click event with channel label to dataLayer', () => {
    trackContactClick('phone');

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toMatchObject({
      event: 'contact_click',
      contact_channel: 'phone',
    });
  });

  it('fires fbq Contact when pixel is loaded', () => {
    window.fbq = vi.fn();

    trackContactClick('whatsapp');

    expect(window.fbq).toHaveBeenCalledWith(
      'track',
      'Contact',
      expect.objectContaining({ contact_channel: 'whatsapp' })
    );
  });

  it('does not throw when no tracking is available', () => {
    window.dataLayer = undefined;

    expect(() => trackContactClick('telegram')).not.toThrow();
  });
});

// ── Telegram service smoke test ──────────────────────────────────────────────
import { sendLeadToTelegram } from './services/telegram';

describe('sendLeadToTelegram', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  it('sends POST to Telegram Bot API with formatted message', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(okJsonResponse());

    await sendLeadToTelegram({ name: 'Анна', phone: '+48123456789', promo: 'PROMO' });

    expect(global.fetch).toHaveBeenCalledOnce();
    const [url, options] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toContain('https://api.telegram.org/bot');
    expect(url).toContain('/sendMessage');
    expect(options.method).toBe('POST');
    const body = JSON.parse(options.body);
    expect(body.chat_id).toBeTruthy();
    expect(body.parse_mode).toBe('HTML');
    expect(body.text).toContain('Анна');
    expect(body.text).toContain('+48123456789');
    expect(body.text).toContain('PROMO');
  });

  it('omits promo line when promo is missing', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(okJsonResponse());

    await sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' });

    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.text).not.toContain('Promo:');
  });

  it('escapes HTML in user-supplied input to prevent injection', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(okJsonResponse());

    await sendLeadToTelegram({ name: '<script>alert(1)</script>', phone: '+48123456789' });

    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.text).not.toContain('<script>');
    expect(body.text).toContain('&lt;script&gt;');
  });

  it('throws on non-OK HTTP response', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ ok: false, description: 'Server error' }),
    });

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      '500'
    );
  });

  it('throws when API returns ok: false', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ ok: false, description: 'Bad Request: chat not found' }),
    });

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      'chat not found'
    );
  });

  it('propagates network errors', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      'Failed to fetch'
    );
  });
});
