/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-blue': '#0a0e17',
        'space-light': '#1a1f3a',
        'primary-blue': '#4dabff',
        'primary-purple': '#a855f7',
        'text-light': '#e0f0ff',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo': ['Exo 2', 'sans-serif'],
      },
    },
  },
  plugins: [],
}