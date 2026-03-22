import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.vetinstant.com',
        changeOrigin: true,
        secure: false,
        // timeout: 10000,
        // proxyTimeout: 10000,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Origin', 'https://api.vetinstant.com');
            proxyReq.setHeader('Referer', 'https://api.vetinstant.com');
          });
        },
      },
    },
  },
})
