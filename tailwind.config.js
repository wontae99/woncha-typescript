/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  fontFamily: {
    heading: ["Poppins", "san-serif"],
  },
  important: true,
  options: {
    safelist: ["dark"],
  },
};
