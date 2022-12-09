/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./node_modules/flowbite-react/**/*.js"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px"
      }
    },
  },
  plugins: [],
}
