
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-vite-website/', // Укажите базовый путь до корня вашего проекта
  build: {
    rollupOptions: {
      input: '/public/index.html', // Путь к index.html
    }
  }
});