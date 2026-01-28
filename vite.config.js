import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        tataSurya: 'tata-surya.html',
        artikel: 'artikel.html',
        galeri: 'galeri.html',
        gerhana: 'gerhana.html'
      }
    }
  }
})