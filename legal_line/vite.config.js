
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/legal_line/', // Укажите базовый путь до корня вашего проекта
  build: {
    rollupOptions: {
      input: './index.html' // Путь к index.html в корне проекта
    }
  }
});