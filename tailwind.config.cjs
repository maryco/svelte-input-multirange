const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'app-pale-green': '#ecfff4',
        'app-warm-gray': '#dddecf',
        'app-dark-green': '#596760',
        'app-text': '#596760',
      },
      fontFamily: {
        sans: ['Kufam', ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
