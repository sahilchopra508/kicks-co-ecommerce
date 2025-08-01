/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nike-black': '#111111',
        'nike-gray': '#757575',
        'nike-light-gray': '#f5f5f5',
        'nike-red': '#ff0000',
        'nike-orange': '#ff6b35',
      },
      fontFamily: {
        'nike': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 