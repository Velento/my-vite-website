import { describe, it, expect } from 'vitest';

describe('Первый запуск Vitest', () => {
  it('проверяет, что базовая математика работает', () => {
    expect(1 + 1).toBe(2);
  });

  it('проверяет работу со строками', () => {
    expect('Hello Podman').toContain('Podman');
  });
});

