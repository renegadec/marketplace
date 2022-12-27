/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#37B068",
        secondary: "rgba(150, 150, 150, 0.38)",
        mainBg: "#F5F5F5",
      }
    },
  },
  plugins: [],
}
