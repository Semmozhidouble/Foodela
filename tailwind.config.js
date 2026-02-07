/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4B3A',
        secondary: '#2D2D2D',
        accent: '#FDC55E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 20px rgba(255, 75, 58, 0.3)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}