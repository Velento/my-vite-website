import { describe, it, expect } from 'vitest';
import { NAME_REGEX, PHONE_REGEX, leadFormSchema } from './validation';

// The form fields are validated via zod (which uses these regexes); we test
// the regex behavior directly because the regex is the load-bearing piece —
// keeping it correct on edge cases (Cyrillic, Ukrainian, Belarusian, hyphens,
// apostrophes, XSS/SQLi-shaped inputs) is the whole point.

describe('NAME_REGEX', () => {
  it('accepts Latin names', () => {
    expect(NAME_REGEX.test('Anna')).toBe(true);
    expect(NAME_REGEX.test('John')).toBe(true);
  });

  it('accepts Cyrillic names', () => {
    expect(NAME_REGEX.test('Анна')).toBe(true);
    expect(NAME_REGEX.test('Дмитрий')).toBe(true);
  });

  it('accepts Ukrainian characters (Є, І, Ї, Ґ)', () => {
    expect(NAME_REGEX.test('Євгенія')).toBe(true);
    expect(NAME_REGEX.test('Їжак')).toBe(true);
    expect(NAME_REGEX.test('Ґалина')).toBe(true);
  });

  it('accepts Belarusian names', () => {
    expect(NAME_REGEX.test('Алёна')).toBe(true);
  });

  it('accepts Polish names with diacritics (ą ć ę ł ń ó ś ź ż)', () => {
    expect(NAME_REGEX.test('Łukasz')).toBe(true);
    expect(NAME_REGEX.test('Małgorzata')).toBe(true);
    expect(NAME_REGEX.test('Świątek')).toBe(true);
    expect(NAME_REGEX.test('Żółć')).toBe(true);
    expect(NAME_REGEX.test('Łąka')).toBe(true);
  });

  it('accepts hyphenated names', () => {
    expect(NAME_REGEX.test('Anna-Maria')).toBe(true);
    expect(NAME_REGEX.test('Жан-Пьер')).toBe(true);
  });

  it('accepts apostrophe in names', () => {
    expect(NAME_REGEX.test("О'Нил")).toBe(true);
    expect(NAME_REGEX.test("Д'Артаньян")).toBe(true);
  });

  it('accepts compound names with spaces', () => {
    expect(NAME_REGEX.test('Anna Maria')).toBe(true);
    expect(NAME_REGEX.test('Анна Мария')).toBe(true);
  });

  it('rejects single character (min length 2)', () => {
    expect(NAME_REGEX.test('A')).toBe(false);
    expect(NAME_REGEX.test('Я')).toBe(false);
  });

  it('rejects digits', () => {
    expect(NAME_REGEX.test('Anna123')).toBe(false);
    expect(NAME_REGEX.test('123')).toBe(false);
  });

  it('rejects HTML/XSS payloads', () => {
    expect(NAME_REGEX.test('<script>alert(1)</script>')).toBe(false);
    expect(NAME_REGEX.test('<img src=x onerror=alert(1)>')).toBe(false);
  });

  it('rejects SQL injection patterns', () => {
    expect(NAME_REGEX.test("'; DROP TABLE users--")).toBe(false);
    expect(NAME_REGEX.test('1 OR 1=1')).toBe(false);
  });

  it('rejects punctuation', () => {
    expect(NAME_REGEX.test('Anna@email.com')).toBe(false);
    expect(NAME_REGEX.test('Anna!')).toBe(false);
    expect(NAME_REGEX.test('Anna#1')).toBe(false);
  });
});

describe('PHONE_REGEX', () => {
  it('accepts international phone with plus', () => {
    expect(PHONE_REGEX.test('+48883734171')).toBe(true);
  });

  it('accepts phone with spaces', () => {
    expect(PHONE_REGEX.test('+48 883 734 171')).toBe(true);
  });

  it('accepts phone with dashes', () => {
    expect(PHONE_REGEX.test('+48-883-734-171')).toBe(true);
  });

  it('accepts phone with parentheses', () => {
    expect(PHONE_REGEX.test('+48(883)734171')).toBe(true);
  });

  it('accepts Ukrainian numbers', () => {
    expect(PHONE_REGEX.test('+380501234567')).toBe(true);
  });

  it('accepts Belarusian numbers', () => {
    expect(PHONE_REGEX.test('+375291234567')).toBe(true);
  });

  it('accepts numbers without leading plus', () => {
    expect(PHONE_REGEX.test('48883734171')).toBe(true);
  });

  it('rejects too-short numbers', () => {
    expect(PHONE_REGEX.test('12345')).toBe(false);
    expect(PHONE_REGEX.test('+481234')).toBe(false);
  });

  it('rejects letters', () => {
    expect(PHONE_REGEX.test('+48abc123456')).toBe(false);
    expect(PHONE_REGEX.test('phone12345')).toBe(false);
  });

  it('rejects unsupported punctuation', () => {
    expect(PHONE_REGEX.test('+48@883734171')).toBe(false);
    expect(PHONE_REGEX.test('+48#883734171')).toBe(false);
  });
});

describe('leadFormSchema', () => {
  it('accepts a minimal valid lead', () => {
    const result = leadFormSchema.safeParse({
      name: 'Anna',
      phone: '+48883734171',
      promo: '',
    });
    expect(result.success).toBe(true);
  });

  it('accepts a lead with promo', () => {
    const result = leadFormSchema.safeParse({
      name: 'Анна',
      phone: '+48883734171',
      promo: 'PROMO2024',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty name', () => {
    const result = leadFormSchema.safeParse({
      name: '',
      phone: '+48883734171',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid phone', () => {
    const result = leadFormSchema.safeParse({
      name: 'Anna',
      phone: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('trims whitespace before validating', () => {
    const result = leadFormSchema.safeParse({
      name: '  Anna  ',
      phone: '  +48883734171  ',
    });
    expect(result.success).toBe(true);
  });

  it('accepts the honeypot field without failing validation', () => {
    // The honeypot must parse cleanly even when filled - the form (not the
    // schema) decides what to do with a populated value, so a bot never sees
    // a validation error that would reveal the trap.
    const result = leadFormSchema.safeParse({
      name: 'Anna',
      phone: '+48883734171',
      website: 'http://spam.example',
    });
    expect(result.success).toBe(true);
  });
});
