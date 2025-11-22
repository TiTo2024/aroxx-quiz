import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/aroxx-quiz/',
  plugins: [react()],
  server: {
    port: 5173,
    // ⭐️ إضافة إعدادات Proxy لربط مسارات API بالخادم المحلي 4000 أثناء التطوير
    proxy: {
      '/submit': 'http://localhost:4000',
      '/questions': 'http://localhost:4000',
      '/leaderboard': 'http://localhost:4000',
    }
  }
})