import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';

const { changeLanguage, loadBundle } = vi.hoisted(() => ({
  changeLanguage: vi.fn(),
  loadBundle: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: unknown) => (typeof fallback === 'string' ? fallback : key),
    i18n: { language: 'ru', changeLanguage },
  }),
}));

vi.mock('../../i18n', () => ({
  loadBundle,
  LANG_STORAGE_KEY: 'legal_line_lang',
  isSupportedLang: (v: string | null | undefined) =>
    typeof v === 'string' && ['ru', 'pl', 'ua', 'en', 'by'].includes(v),
}));

beforeEach(() => {
  localStorage.clear();
  changeLanguage.mockClear();
  loadBundle.mockClear();
});

describe('LanguageSwitcher', () => {
  it('shows the current language and no dropdown until opened', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the dropdown with all five languages', () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch language' }));
    const list = screen.getByRole('listbox');
    for (const code of ['RU', 'UA', 'PL', 'EN', 'BY']) {
      expect(within(list).getByText(code)).toBeInTheDocument();
    }
  });

  it('switches language, persists it and updates the URL', async () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch language' }));
    const list = screen.getByRole('listbox');
    fireEvent.click(within(list).getByText('PL'));

    expect(loadBundle).toHaveBeenCalledWith('pl');
    // changeLanguage runs after the awaited loadBundle resolves.
    await vi.waitFor(() => expect(changeLanguage).toHaveBeenCalledWith('pl'));
    expect(localStorage.getItem('legal_line_lang')).toBe('pl');
    expect(window.location.pathname).toContain('/pl/');
  });
});
