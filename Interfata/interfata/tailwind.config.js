/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'darkest-blue': '#04082e',
        'dark-blue': '#0C134F',
        'light-blue': '#1D267D',
        'dark-purple': '#5C469C',
        'light-purple': '#D4ADFC',
      },
    },
  },
  plugins: [],
}

