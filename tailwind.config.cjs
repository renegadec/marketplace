/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#37B068",
        secondary: "rgba(150, 150, 150, 0.38)",
        productBg: "rgba(74, 156, 128, 0.23)",
      },
      fontFamily: {
        'mont': ['Montserrat', 'sans-serif'],
    },
  },
},
  plugins: [require("daisyui")],
}
