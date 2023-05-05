/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#3BECB8'
      },
      scrollbar: {
        thumb: '#6b7280'
      }
    },
  },
  variants: {
    scrollbar: ['rounded']
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
