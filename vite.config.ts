import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( )],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    // Adicione esta seção hmr:
    hmr: {
      protocol: 'ws', // Forçar o uso de WebSocket padrão
      host: 'localhost',
    }
  },
})
