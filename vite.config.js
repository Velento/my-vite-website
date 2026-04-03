import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/legal_line/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    // Предупреждать если chunk > 500KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Разделяем бандл на чанки по node_modules пути
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react';
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }
            if (id.includes('react-slick') || id.includes('slick-carousel')) {
              return 'vendor-slider';
            }
          }
        },
      },
    },
    // Убираем console.log/debugger в продакшне
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'],
    },
  },
  // Для тестов
  test: undefined,
});
