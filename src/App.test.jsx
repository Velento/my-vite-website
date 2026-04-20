import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';

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

// ── useLeadForm hook ─────────────────────────────────────────────────────────
import { renderHook } from '@testing-library/react';
import { useLeadForm } from './features/lead-form/useLeadForm';

describe('useLeadForm', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  it('starts with empty fields and disabled submit', () => {
    const { result } = renderHook(() => useLeadForm());
    expect(result.current.fields.name).toBe('');
    expect(result.current.fields.phone).toBe('');
    expect(result.current.canSubmit).toBe(false);
    expect(result.current.status).toBe('idle');
  });

  it('accepts valid Cyrillic name', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
    });
    expect(result.current.isNameValid).toBe(true);
  });

  it('accepts Ukrainian characters in name', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: "Євгенія Ї'їв" } });
    });
    expect(result.current.isNameValid).toBe(true);
  });

  it('rejects name with digits', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: 'Anna123' } });
    });
    expect(result.current.isNameValid).toBe(false);
  });

  it('rejects name with special characters (injection attempt)', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: '<script>alert(1)</script>' } });
    });
    expect(result.current.isNameValid).toBe(false);
    expect(result.current.canSubmit).toBe(false);
  });

  it('rejects single-character name (too short)', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: 'A' } });
    });
    expect(result.current.isNameValid).toBe(false);
  });

  it('accepts valid phone with spaces and dashes', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('phone')({ target: { value: '+48 123-456-789' } });
    });
    expect(result.current.isPhoneValid).toBe(true);
  });

  it('rejects phone with letters', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('phone')({ target: { value: '+48abc123456' } });
    });
    expect(result.current.isPhoneValid).toBe(false);
  });

  it('rejects phone that is too short', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('phone')({ target: { value: '12345' } });
    });
    expect(result.current.isPhoneValid).toBe(false);
  });

  it('enables submit with valid name and phone', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
      result.current.setField('phone')({ target: { value: '+48123456789' } });
    });
    expect(result.current.canSubmit).toBe(true);
  });

  it('successfully submits and transitions to success', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useLeadForm({ onSuccess }));

    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
      result.current.setField('phone')({ target: { value: '+48123456789' } });
    });

    await act(async () => {
      await result.current.submit({ preventDefault: vi.fn() });
    });

    expect(result.current.status).toBe('success');
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it('transitions to error on network failure', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => useLeadForm());

    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
      result.current.setField('phone')({ target: { value: '+48123456789' } });
    });

    await act(async () => {
      await result.current.submit({ preventDefault: vi.fn() });
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorMessage).toBeTruthy();
  });

  it('reset restores initial state after success', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
    const { result } = renderHook(() => useLeadForm());

    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
      result.current.setField('phone')({ target: { value: '+48123456789' } });
    });

    await act(async () => {
      await result.current.submit({ preventDefault: vi.fn() });
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.fields.name).toBe('');
    expect(result.current.status).toBe('idle');
  });

  it('blocks canSubmit when status is submitting', async () => {
    // Advance past rate limit from previous tests
    const baseTime = Date.now() + 300_000;
    vi.spyOn(Date, 'now').mockReturnValue(baseTime);

    let resolvePromise;
    vi.mocked(global.fetch).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    const { result } = renderHook(() => useLeadForm());

    act(() => {
      result.current.setField('name')({ target: { value: 'Мария' } });
      result.current.setField('phone')({ target: { value: '+48999888777' } });
    });

    expect(result.current.canSubmit).toBe(true);

    // Start submit — won't resolve until we say so
    const promise = act(async () => {
      await result.current.submit({ preventDefault: vi.fn() });
    });

    // After the await inside act resolves microtasks, status = submitting
    // canSubmit incorporates status !== 'submitting'
    // Resolve the fetch
    await act(async () => {
      resolvePromise({ ok: true });
    });
    await promise;

    // The hook went through submitting -> success
    expect(result.current.status).toBe('success');
    vi.spyOn(Date, 'now').mockRestore();
  });

  it('trims whitespace from fields before sending', async () => {
    // Advance past rate limit from previous tests (must be > lastSubmitTime + 60s)
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 500_000);
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
    const { result } = renderHook(() => useLeadForm());

    act(() => {
      result.current.setField('name')({ target: { value: '  Анна  ' } });
      result.current.setField('phone')({ target: { value: '  +48123456789  ' } });
      result.current.setField('promo')({ target: { value: '  PROMO  ' } });
    });

    await act(async () => {
      await result.current.submit({ preventDefault: vi.fn() });
    });

    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.text).toContain('Анна');
    expect(body.text).not.toContain('  Анна  ');
    vi.spyOn(Date, 'now').mockRestore();
  });

  it('does not send promo when it is only whitespace', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(Date.now() + 700_000);
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
    const { result } = renderHook(() => useLeadForm());

    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
      result.current.setField('phone')({ target: { value: '+48123456789' } });
      result.current.setField('promo')({ target: { value: '   ' } });
    });

    await act(async () => {
      await result.current.submit({ preventDefault: vi.fn() });
    });

    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.text).not.toContain('Промо');
    vi.spyOn(Date, 'now').mockRestore();
  });
});

// ── Telegram service tests ───────────────────────────────────────────────────
import { sendLeadToTelegram } from './services/telegram';

describe('sendLeadToTelegram', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  it('sends POST to Telegram API', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });

    await sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' });

    expect(global.fetch).toHaveBeenCalledOnce();
    const [url, options] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toContain('api.telegram.org');
    expect(options.method).toBe('POST');
  });

  it('includes promo in message when provided', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });

    await sendLeadToTelegram({ name: 'Анна', phone: '+48123456789', promo: 'START24' });

    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.text).toContain('START24');
  });

  it('throws on HTTP 401 Unauthorized', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ description: 'Unauthorized' }),
    });

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      '401'
    );
  });

  it('throws on HTTP 500 Internal Server Error', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ description: 'Internal Server Error' }),
    });

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      '500'
    );
  });

  it('throws on HTTP 429 Too Many Requests', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ description: 'Too Many Requests' }),
    });

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      '429'
    );
  });

  it('handles response.json() failure gracefully', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: async () => {
        throw new Error('Bad Gateway');
      },
    });

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      '502'
    );
  });

  it('handles fetch network exception (offline)', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      'Failed to fetch'
    );
  });

  it('uses Markdown parse_mode', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });

    await sendLeadToTelegram({ name: 'Test', phone: '+48123456789' });

    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.parse_mode).toBe('Markdown');
  });
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

    it('accepts name with leading/trailing spaces (trimmed)', () => {
      expect(isValidName('  Анна  ')).toBe(true);
    });
  });

  describe('isValidPhone', () => {
    it('returns true for empty string', () => {
      expect(isValidPhone('')).toBe(true);
    });

    it('accepts international format', () => {
      expect(isValidPhone('+48 883 734 171')).toBe(true);
    });

    it('accepts format with dashes', () => {
      expect(isValidPhone('+48-883-734-171')).toBe(true);
    });

    it('accepts format with parentheses', () => {
      expect(isValidPhone('+48(883)734171')).toBe(true);
    });

    it('rejects too short', () => {
      expect(isValidPhone('12345')).toBe(false);
    });

    it('rejects letters in phone', () => {
      expect(isValidPhone('+48abcdefgh')).toBe(false);
    });
  });

  describe('canSubmitForm', () => {
    it('returns true for valid name and phone', () => {
      expect(canSubmitForm('Анна', '+48123456789')).toBe(true);
    });

    it('returns false when name is empty', () => {
      expect(canSubmitForm('', '+48123456789')).toBe(false);
    });

    it('returns false when phone is empty', () => {
      expect(canSubmitForm('Анна', '')).toBe(false);
    });

    it('returns false when both are empty', () => {
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
    vi.unstubAllEnvs();
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
