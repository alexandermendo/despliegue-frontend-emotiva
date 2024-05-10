import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Cambia '/my-react-project/' a tu ruta base deseada
  plugins: [
    react({
      jsx: 'react-jsx',
    }),
  ],
})
