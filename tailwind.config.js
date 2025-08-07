/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust if using a different structure
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        retro: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        brand: {
          light: '#f1f5f9',
          dark: '#0f172a',
        },
      },
    },
  },
  darkMode: 'class', // Enables dark mode via a class toggle
  plugins: [],
}
