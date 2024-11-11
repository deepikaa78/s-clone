import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/https://github.com/deepikaa78/Spotify_clone.git/',
  plugins: [react()],
})
