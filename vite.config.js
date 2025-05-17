import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // Assuming it exists

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
