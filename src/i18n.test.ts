import { describe, it, expect } from 'vitest';
import { isSupportedLang, SUPPORTED_LANGS } from './i18n';

describe('isSupportedLang', () => {
  it('accepts every supported language code', () => {
    for (const lang of SUPPORTED_LANGS) {
      expect(isSupportedLang(lang)).toBe(true);
    }
  });

  it('rejects unknown, wrong-case, empty and nullish values', () => {
    for (const value of ['xx', 'EN', 'russian', '', null, undefined]) {
      expect(isSupportedLang(value)).toBe(false);
    }
  });

  it('exposes the canonical five-language set', () => {
    expect([...SUPPORTED_LANGS].sort()).toEqual(['by', 'en', 'pl', 'ru', 'ua']);
  });
});
