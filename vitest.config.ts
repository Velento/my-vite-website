import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom — браузерное окружение для React-компонентов
    environment: 'jsdom',
    // Глобальные функции (describe, it, expect) без импорта
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Исключаем файлы которые не тестируем напрямую
      exclude: ['src/test/**', 'src/main.jsx', 'src/i18n.js', '**/*.config.*'],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 40,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
