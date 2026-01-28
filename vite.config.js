import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',  // Pastikan ini '/' untuk root domain
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