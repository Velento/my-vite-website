import '@testing-library/jest-dom';
import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Очищаем DOM после каждого теста
afterEach(cleanup);

// Мокаем переменные окружения для тестов
vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', 'test-bot-token');
vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '123456789');

// Мокаем fetch глобально — тесты не делают реальных HTTP запросов
global.fetch = vi.fn();

// Мокаем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
