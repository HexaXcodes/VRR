import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    // Optimize bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Code splitting strategy
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.replace(/\\/g, '/')
          if (/\/node_modules\/(react-router|react-router-dom)\//.test(path)) return 'router'
          if (/\/node_modules\/(react|react-dom)\//.test(path)) return 'react'
        },
      },
    },
    // Improve caching
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
  },
  // Performance hints
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
