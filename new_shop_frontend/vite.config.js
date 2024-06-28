import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4242,
    proxy: {
      "/api": {
        target: "http://172.18.0.3:4000",
        changeOrigin: true,
      },
    },
  },
});
