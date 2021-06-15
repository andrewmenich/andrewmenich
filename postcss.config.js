const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('postcss-preset-env')({ 
      stage: 1 ,
      autoprefixer: { grid: true },
      features: {
        'focus-within-pseudo-class': false
      }
    }),
    require('postcss-focus-visible'),
  ]
}