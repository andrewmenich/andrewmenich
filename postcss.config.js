module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-import": {},
    "postcss-preset-env":{ 
      stage: 1 ,
      autoprefixer: { grid: true },
      features: {
        'focus-within-pseudo-class': false
      }
    },
    "postcss-focus-visible": {},
  }
}