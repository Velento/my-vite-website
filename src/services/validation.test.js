import { describe, it, expect } from 'vitest';
import { isValidName, isValidPhone, canSubmitForm, NAME_REGEX, PHONE_REGEX } from './validation';

describe('validation.js', () => {
  // ── isValidName ──────────────────────────────────────────────────────────
  describe('isValidName', () => {
    it('returns true for empty string (optional field state)', () => {
      expect(isValidName('')).toBe(true);
    });

    it('accepts Latin names', () => {
      expect(isValidName('Anna')).toBe(true);
      expect(isValidName('John')).toBe(true);
    });

    it('accepts Cyrillic names', () => {
      expect(isValidName('Анна')).toBe(true);
      expect(isValidName('Дмитрий')).toBe(true);
    });

    it('accepts Ukrainian characters (Є, І, Ї, Ґ)', () => {
      expect(isValidName('Євгенія')).toBe(true);
      expect(isValidName('Їжак')).toBe(true);
      expect(isValidName('Ґалина')).toBe(true);
    });

    it('accepts Belarusian names', () => {
      expect(isValidName('Алёна')).toBe(true);
    });

    it('accepts hyphenated names', () => {
      expect(isValidName('Anna-Maria')).toBe(true);
      expect(isValidName('Жан-Пьер')).toBe(true);
    });

    it('accepts apostrophe in names', () => {
      expect(isValidName("О'Нил")).toBe(true);
      expect(isValidName("Д'Артаньян")).toBe(true);
    });

    it('accepts names with spaces (multi-word)', () => {
      expect(isValidName('Anna Maria')).toBe(true);
      expect(isValidName('Анна Мария')).toBe(true);
    });

    it('trims whitespace before validation', () => {
      expect(isValidName('  Анна  ')).toBe(true);
    });

    it('rejects single character (min length 2)', () => {
      expect(isValidName('A')).toBe(false);
      expect(isValidName('Я')).toBe(false);
    });

    it('rejects digits in name', () => {
      expect(isValidName('Anna123')).toBe(false);
      expect(isValidName('123')).toBe(false);
    });

    it('rejects HTML tags (XSS attempt)', () => {
      expect(isValidName('<script>alert(1)</script>')).toBe(false);
      expect(isValidName('<img src=x onerror=alert(1)>')).toBe(false);
    });

    it('rejects SQL injection patterns', () => {
      expect(isValidName("'; DROP TABLE users--")).toBe(false);
      expect(isValidName('1 OR 1=1')).toBe(false);
    });

    it('rejects special characters', () => {
      expect(isValidName('Anna@email.com')).toBe(false);
      expect(isValidName('Anna!')).toBe(false);
      expect(isValidName('Anna#1')).toBe(false);
    });

    it('rejects only whitespace', () => {
      expect(isValidName('   ')).toBe(false);
    });
  });

  // ── isValidPhone ─────────────────────────────────────────────────────────
  describe('isValidPhone', () => {
    it('returns true for empty string (optional field state)', () => {
      expect(isValidPhone('')).toBe(true);
    });

    it('accepts Polish format (+48)', () => {
      expect(isValidPhone('+48883734171')).toBe(true);
      expect(isValidPhone('+48 883 734 171')).toBe(true);
    });

    it('accepts format with dashes', () => {
      expect(isValidPhone('+48-883-734-171')).toBe(true);
    });

    it('accepts format with parentheses', () => {
      expect(isValidPhone('+48(883)734171')).toBe(true);
    });

    it('accepts Ukrainian format (+380)', () => {
      expect(isValidPhone('+380501234567')).toBe(true);
    });

    it('accepts Belarusian format (+375)', () => {
      expect(isValidPhone('+375291234567')).toBe(true);
    });

    it('accepts number without + prefix', () => {
      expect(isValidPhone('48883734171')).toBe(true);
    });

    it('rejects phone that is too short (< 9 digits)', () => {
      expect(isValidPhone('12345')).toBe(false);
      expect(isValidPhone('+481234')).toBe(false);
    });

    it('rejects letters in phone number', () => {
      expect(isValidPhone('+48abc123456')).toBe(false);
      expect(isValidPhone('phone12345')).toBe(false);
    });

    it('rejects empty-looking strings with only spaces', () => {
      expect(isValidPhone('   ')).toBe(false);
    });

    it('rejects special characters not typically in phones', () => {
      expect(isValidPhone('+48@883734171')).toBe(false);
      expect(isValidPhone('+48#883734171')).toBe(false);
    });
  });

  // ���─ canSubmitForm ──────���─────────────────────────────────────────────────
  describe('canSubmitForm', () => {
    it('returns true for valid name and phone', () => {
      expect(canSubmitForm('Анна', '+48883734171')).toBe(true);
    });

    it('returns true for Latin name with valid phone', () => {
      expect(canSubmitForm('Anna', '+48123456789')).toBe(true);
    });

    it('returns false when name is empty', () => {
      expect(canSubmitForm('', '+48883734171')).toBe(false);
    });

    it('returns false when phone is empty', () => {
      expect(canSubmitForm('Анна', '')).toBe(false);
    });

    it('returns false when both are empty', () => {
      expect(canSubmitForm('', '')).toBe(false);
    });

    it('returns false when name is invalid', () => {
      expect(canSubmitForm('A', '+48883734171')).toBe(false);
    });

    it('returns false when phone is invalid', () => {
      expect(canSubmitForm('Анна', '123')).toBe(false);
    });

    it('returns false when both are invalid', () => {
      expect(canSubmitForm('A', '123')).toBe(false);
    });

    it('trims whitespace and still validates correctly', () => {
      expect(canSubmitForm('  Анна  ', '  +48883734171  ')).toBe(true);
    });

    it('rejects whitespace-only name', () => {
      expect(canSubmitForm('   ', '+48883734171')).toBe(false);
    });

    it('rejects whitespace-only phone', () => {
      expect(canSubmitForm('Анна', '   ')).toBe(false);
    });
  });

  // ── Regex exports ───────���────────────────────────────────────────────────
  describe('exported regex patterns', () => {
    it('NAME_REGEX is exported and functional', () => {
      expect(NAME_REGEX).toBeInstanceOf(RegExp);
      expect(NAME_REGEX.test('Анна')).toBe(true);
    });

    it('PHONE_REGEX is exported and functional', () => {
      expect(PHONE_REGEX).toBeInstanceOf(RegExp);
      expect(PHONE_REGEX.test('+48883734171')).toBe(true);
    });
  });
});
