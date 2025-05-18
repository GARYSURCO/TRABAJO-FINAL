// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
  },
  // ⬇️ Esta es la clave para solucionar el error
  base: '/',
  // Esto asegura que cualquier ruta (como /register) se sirva desde index.html
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
