import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
  },
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});
