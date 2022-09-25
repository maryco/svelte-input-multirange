const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const postcssNested = require('postcss-nested')

const config = {
  plugins: [tailwind, autoprefixer, postcssNested],
}

module.exports = config
