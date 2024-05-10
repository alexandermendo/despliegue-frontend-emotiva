import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
    exclude: ['vue-demi', '@vite/client', '@vite/env'],
  }
})

