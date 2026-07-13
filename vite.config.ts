import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves from /renderx/; Vercel and local dev serve from the root
  base: process.env.GITHUB_ACTIONS ? '/renderx/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
