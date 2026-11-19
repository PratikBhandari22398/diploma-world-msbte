/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080d1a',
          surface: '#0f172a',
          card: '#1e293b',
          cardHover: '#24344d',
          accent: '#2563eb',
          gold: '#f59e0b',
          goldText: '#fbbf24',
          cyan: '#38bdf8'
        }
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
