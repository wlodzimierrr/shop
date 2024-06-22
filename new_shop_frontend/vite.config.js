import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4242,
    proxy: {
      "/api": {
        target: "http://10.0.0.2:4000",
        changeOrigin: true,
      },
    },
  },
});
