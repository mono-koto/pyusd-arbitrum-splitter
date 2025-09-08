import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pyusd-arbitrum-splitter/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  define: {
    global: 'globalThis',
  },
})
