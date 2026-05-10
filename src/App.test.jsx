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

// ── Validation service tests ─────────────────────────────────────────────────
import { isValidName, isValidPhone, canSubmitForm } from './services/validation';

describe('validation', () => {
  describe('isValidName', () => {
    it('returns true for empty string (optional field state)', () => {
      expect(isValidName('')).toBe(true);
    });

    it('accepts Latin names', () => {
      expect(isValidName('Anna')).toBe(true);
    });

    it('accepts Cyrillic names', () => {
      expect(isValidName('Анна')).toBe(true);
    });

    it('accepts Ukrainian characters', () => {
      expect(isValidName('Євгенія')).toBe(true);
    });

    it('accepts hyphenated names', () => {
      expect(isValidName('Anna-Maria')).toBe(true);
    });

    it('accepts apostrophe in names', () => {
      expect(isValidName("О'Нил")).toBe(true);
    });

    it('rejects digits', () => {
      expect(isValidName('Anna123')).toBe(false);
    });

    it('rejects HTML tags', () => {
      expect(isValidName('<img src=x>')).toBe(false);
    });

    it('rejects SQL injection patterns', () => {
      expect(isValidName("'; DROP TABLE--")).toBe(false);
    });

    it('rejects single character (min length 2)', () => {
      expect(isValidName('A')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('returns true for empty string', () => {
      expect(isValidPhone('')).toBe(true);
    });

    it('accepts international phone with plus', () => {
      expect(isValidPhone('+48123456789')).toBe(true);
    });

    it('accepts phone with spaces and dashes', () => {
      expect(isValidPhone('+48 123-456-789')).toBe(true);
    });

    it('rejects phone with letters', () => {
      expect(isValidPhone('+48abc123')).toBe(false);
    });

    it('rejects phone too short', () => {
      expect(isValidPhone('12345')).toBe(false);
    });
  });

  describe('canSubmitForm', () => {
    it('returns true with valid name and phone', () => {
      expect(canSubmitForm('Anna', '+48123456789')).toBe(true);
    });

    it('returns false when name is invalid', () => {
      expect(canSubmitForm('A', '+48123456789')).toBe(false);
    });

    it('returns false when phone is invalid', () => {
      expect(canSubmitForm('Anna', '12345')).toBe(false);
    });

    it('returns false when both invalid', () => {
      expect(canSubmitForm('', '')).toBe(false);
    });
  });
});

// ── Analytics service tests ──────────────────────────────────────────────────
import { trackLeadConversion } from './services/analytics';

describe('trackLeadConversion', () => {
  beforeEach(() => {
    delete window.gtag;
    delete window.fbq;
    window.dataLayer = [];
  });

  it('pushes lead_form_submit event to dataLayer', () => {
    trackLeadConversion();

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0].event).toBe('lead_form_submit');
  });

  it('calls gtag conversion when gtag and conversion ID are available', () => {
    window.gtag = vi.fn();
    vi.stubEnv('VITE_GOOGLE_ADS_CONVERSION_ID', 'AW-TEST/TEST');

    trackLeadConversion();

    expect(window.gtag).toHaveBeenCalledWith('event', 'conversion', expect.any(Object));
    // Roll the env back so the next test sees no conversion ID. Re-apply the
    // Telegram bot stubs because vi.unstubAllEnvs wipes them too.
    vi.unstubAllEnvs();
    vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', '123456:test-token');
    vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '987654321');
  });

  it('skips gtag conversion when conversion ID is not configured', () => {
    window.gtag = vi.fn();

    trackLeadConversion();

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('calls fbq Lead when fbq is available', () => {
    window.fbq = vi.fn();

    trackLeadConversion();

    expect(window.fbq).toHaveBeenCalledWith('track', 'Lead');
  });

  it('does not throw when no tracking is available', () => {
    window.dataLayer = undefined;

    expect(() => trackLeadConversion()).not.toThrow();
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
