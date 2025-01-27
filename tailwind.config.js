/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#43c651',
        primaryBold: '#056526',
        primaryText: '#555',
        background: 'rgba(255, 255, 255, 1)'
      }
    },
  },
  plugins: [],
}

