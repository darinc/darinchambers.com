import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  // Development server configuration
  server: {
    port: 5173,
    // SPA fallback - serve index.html for all routes during development
    // This is enabled by default in Vite, but making it explicit
  }
});
