import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLeadForm } from './useLeadForm';

// Mock i18n — not used directly but imported by telegram service
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, fallback) => (typeof fallback === 'string' ? fallback : key),
    i18n: { language: 'ru', changeLanguage: vi.fn() },
  }),
}));

describe('useLeadForm', () => {
  // Each test gets a unique timestamp far enough in the future to bypass
  // the module-level rate limiter (lastSubmitTime) from prior tests
  let testBaseTime;
  let testCounter = 0;

  beforeEach(() => {
    vi.mocked(global.fetch).mockReset();
    testCounter++;
    // Space each test 10 minutes apart to guarantee rate limit bypass
    testBaseTime = 1e14 + testCounter * 600_000;
    vi.spyOn(Date, 'now').mockReturnValue(testBaseTime);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Initial state ──────────────────────────────────────────────────────
  describe('initial state', () => {
    it('starts with empty fields', () => {
      const { result } = renderHook(() => useLeadForm());
      expect(result.current.fields).toEqual({ name: '', phone: '', promo: '' });
    });

    it('starts with idle status', () => {
      const { result } = renderHook(() => useLeadForm());
      expect(result.current.status).toBe('idle');
    });

    it('starts with canSubmit = false', () => {
      const { result } = renderHook(() => useLeadForm());
      expect(result.current.canSubmit).toBe(false);
    });

    it('starts with empty error message', () => {
      const { result } = renderHook(() => useLeadForm());
      expect(result.current.errorMessage).toBe('');
    });

    it('considers empty name as valid (optional state)', () => {
      const { result } = renderHook(() => useLeadForm());
      expect(result.current.isNameValid).toBe(true);
    });

    it('considers empty phone as valid (optional state)', () => {
      const { result } = renderHook(() => useLeadForm());
      expect(result.current.isPhoneValid).toBe(true);
    });
  });

  // ── Field validation ───────────────────────────────────────────────────
  describe('field validation', () => {
    it('accepts valid Cyrillic name', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('name')({ target: { value: 'Анна' } }));
      expect(result.current.isNameValid).toBe(true);
    });

    it('rejects name with digits', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('name')({ target: { value: 'Anna123' } }));
      expect(result.current.isNameValid).toBe(false);
    });

    it('rejects XSS injection in name', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('name')({ target: { value: '<script>alert(1)</script>' } }));
      expect(result.current.isNameValid).toBe(false);
      expect(result.current.canSubmit).toBe(false);
    });

    it('rejects single-character name', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('name')({ target: { value: 'A' } }));
      expect(result.current.isNameValid).toBe(false);
    });

    it('accepts valid international phone', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('phone')({ target: { value: '+48 883-734-171' } }));
      expect(result.current.isPhoneValid).toBe(true);
    });

    it('rejects phone with letters', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('phone')({ target: { value: '+48abc123456' } }));
      expect(result.current.isPhoneValid).toBe(false);
    });

    it('rejects phone too short', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('phone')({ target: { value: '12345' } }));
      expect(result.current.isPhoneValid).toBe(false);
    });
  });

  // ── canSubmit logic ────────────────────────────────────────────────────
  describe('canSubmit', () => {
    it('enables submit with valid name and phone', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });
      expect(result.current.canSubmit).toBe(true);
    });

    it('stays disabled with only name filled', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('name')({ target: { value: 'Анна' } }));
      expect(result.current.canSubmit).toBe(false);
    });

    it('stays disabled with only phone filled', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => result.current.setField('phone')({ target: { value: '+48883734171' } }));
      expect(result.current.canSubmit).toBe(false);
    });

    it('does not require promo to submit', () => {
      const { result } = renderHook(() => useLeadForm());
      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });
      expect(result.current.canSubmit).toBe(true);
      expect(result.current.fields.promo).toBe('');
    });
  });

  // ── Submit flow ────────────────────────────────────────────────────────
  describe('submit', () => {
    it('does nothing when canSubmit is false (empty form)', async () => {
      const { result } = renderHook(() => useLeadForm());
      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });
      expect(global.fetch).not.toHaveBeenCalled();
      expect(result.current.status).toBe('idle');
    });

    it('calls preventDefault on the event', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
      const preventDefault = vi.fn();
      const { result } = renderHook(() => useLeadForm());

      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });

      await act(async () => {
        await result.current.submit({ preventDefault });
      });

      expect(preventDefault).toHaveBeenCalledOnce();
    });

    it('transitions to success on successful send', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
      const onSuccess = vi.fn();
      const { result } = renderHook(() => useLeadForm({ onSuccess }));

      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
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
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });

      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });

      expect(result.current.status).toBe('error');
      expect(result.current.errorMessage).toBeTruthy();
    });

    it('includes error message text on failure', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Connection refused'));
      const { result } = renderHook(() => useLeadForm());

      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });

      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });

      expect(result.current.errorMessage).toContain('Connection refused');
    });

    it('sends trimmed field values to API', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
      const { result } = renderHook(() => useLeadForm());

      act(() => {
        result.current.setField('name')({ target: { value: '  Анна  ' } });
        result.current.setField('phone')({ target: { value: '  +48883734171  ' } });
        result.current.setField('promo')({ target: { value: '  PROMO  ' } });
      });

      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });

      const [, options] = vi.mocked(global.fetch).mock.calls[0];
      const body = JSON.parse(options.body);
      expect(body.text).toContain('Анна');
      expect(body.text).not.toContain('  Анна  ');
      expect(body.text).toContain('PROMO');
    });

    it('does not include promo in API call when promo is whitespace-only', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
      const { result } = renderHook(() => useLeadForm());

      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
        result.current.setField('promo')({ target: { value: '   ' } });
      });

      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });

      expect(global.fetch).toHaveBeenCalledOnce();
      const [, options] = vi.mocked(global.fetch).mock.calls[0];
      const body = JSON.parse(options.body);
      expect(body.text).not.toContain('Промо');
    });
  });

  // ── Rate limiting ──────────────────────────────────────────────────────
  describe('rate limiting', () => {
    it('blocks rapid resubmission within 60 seconds', async () => {
      vi.mocked(global.fetch).mockResolvedValue({ ok: true });

      const { result } = renderHook(() => useLeadForm());

      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });

      // First submit — should succeed
      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });
      expect(result.current.status).toBe('success');

      // Reset state manually
      act(() => result.current.reset());

      // Fill fields again
      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });

      // Second submit 10 seconds later — should be rate-limited
      vi.spyOn(Date, 'now').mockReturnValue(testBaseTime + 10_000);

      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });

      expect(result.current.status).toBe('error');
      expect(result.current.errorMessage).toBeTruthy();
    });
  });

  // ── Reset ──────────────────────────────────────────────────────────────
  describe('reset', () => {
    it('restores all fields to initial state', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });
      const { result } = renderHook(() => useLeadForm());

      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
        result.current.setField('phone')({ target: { value: '+48883734171' } });
      });

      await act(async () => {
        await result.current.submit({ preventDefault: vi.fn() });
      });

      act(() => result.current.reset());

      expect(result.current.fields).toEqual({ name: '', phone: '', promo: '' });
      expect(result.current.status).toBe('idle');
      expect(result.current.errorMessage).toBe('');
      expect(result.current.canSubmit).toBe(false);
    });

    it('can be called without prior submission', () => {
      const { result } = renderHook(() => useLeadForm());

      act(() => {
        result.current.setField('name')({ target: { value: 'Анна' } });
      });

      act(() => result.current.reset());

      expect(result.current.fields.name).toBe('');
    });
  });
});
