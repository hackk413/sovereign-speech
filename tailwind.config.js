/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf8eb',
          100: '#f5eecc',
          200: '#eddca0',
          300: '#e3c46e',
          400: '#d9ac42',
          500: '#c59325',
          600: '#aa741d',
          700: '#88541a',
          800: '#71431b',
          900: '#60371a',
          950: '#381c0b',
        },
        obsidian: {
          800: '#14171f',
          850: '#0f1218',
          900: '#0a0c10',
          950: '#05070a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
