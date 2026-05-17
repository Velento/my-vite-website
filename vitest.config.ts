import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

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
      exclude: [
        'src/test/**',
        'src/main.tsx',
        'src/i18n.ts',
        'src/vite-env.d.ts',
        '**/*.css',
        '**/*.config.*',
      ],
      thresholds: {
        lines: 38,
        functions: 30,
        branches: 26,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
