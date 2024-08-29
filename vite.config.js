import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    rollupOptions: {
      input: 'index.html' // Путь к index.html относительно папки legal_line
    }
  }
});
