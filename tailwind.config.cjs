/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'font-mv': ['Kufam'],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
