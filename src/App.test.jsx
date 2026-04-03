import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Мок i18n — не грузим реальные переводы в тестах ──────────────────────
vi.mock('./i18n', () => ({}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'ru', changeLanguage: vi.fn() },
  }),
  I18nextProvider: ({ children }) => children,
}));

// ── Мок компонентов с тяжёлыми зависимостями ─────────────────────────────
vi.mock('./Components/Main_page/Slider', () => ({
  default: () => <div data-testid="slider">Slider</div>,
}));
vi.mock('./Components/Main_page/Pricelist', () => ({
  default: () => <div data-testid="pricelist">Pricelist</div>,
}));
vi.mock('./Components/Main_page/Team', () => ({
  default: () => <div data-testid="team">Team</div>,
}));

// ── Тесты useLeadForm hook ────────────────────────────────────────────────
import { renderHook } from '@testing-library/react';
import { useLeadForm } from './features/lead-form/useLeadForm';

describe('useLeadForm', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  it('начинает с пустыми полями и заблокированной кнопкой', () => {
    const { result } = renderHook(() => useLeadForm());
    expect(result.current.fields.name).toBe('');
    expect(result.current.fields.phone).toBe('');
    expect(result.current.canSubmit).toBe(false);
    expect(result.current.status).toBe('idle');
  });

  it('принимает валидное имя (только буквы)', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
    });
    expect(result.current.isNameValid).toBe(true);
  });

  it('отклоняет имя с цифрами', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: 'Anna123' } });
    });
    expect(result.current.isNameValid).toBe(false);
    expect(result.current.canSubmit).toBe(false);
  });

  it('принимает валидный телефон', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('phone')({ target: { value: '+48123456789' } });
    });
    expect(result.current.isPhoneValid).toBe(true);
  });

  it('разрешает submit при валидных данных', () => {
    const { result } = renderHook(() => useLeadForm());
    act(() => {
      result.current.setField('name')({ target: { value: 'Анна' } });
      result.current.setField('phone')({ target: { value: '+48123456789' } });
    });
    expect(result.current.canSubmit).toBe(true);
  });

  it('успешно отправляет форму и переходит в success', async () => {
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

  it('переходит в error если Telegram API недоступен', async () => {
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

  it('reset возвращает форму в начальное состояние', async () => {
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
});

// ── Тесты telegram service ─────────────────────────────────────────────────
import { sendLeadToTelegram } from './services/telegram';

describe('sendLeadToTelegram', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockReset();
  });

  it('отправляет POST запрос к Telegram API', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });

    await sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' });

    expect(global.fetch).toHaveBeenCalledOnce();
    const [url, options] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toContain('api.telegram.org');
    expect(options.method).toBe('POST');
  });

  it('включает промо-код в сообщение если передан', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({ ok: true });

    await sendLeadToTelegram({ name: 'Анна', phone: '+48123456789', promo: 'START24' });

    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.text).toContain('START24');
  });

  it('бросает ошибку если API вернул не OK', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ description: 'Unauthorized' }),
    });

    await expect(sendLeadToTelegram({ name: 'Анна', phone: '+48123456789' })).rejects.toThrow(
      '401'
    );
  });
});
