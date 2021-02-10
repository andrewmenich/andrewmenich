const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './templates/**/*.twig',
    './templates/**/*.html'
  ],
  theme: {
    fontFamily: {
      display: ['Public Sans', 'Helvetica', 'serif'],
      body: ['FiraCode', 'monospaced'],
    },
    colors: {
      transparent: 'transparent',
      black: '#000411',
      white: '#FAFAFA',
      gray: colors.coolGray,
      yellow: colors.amber,
      blue: colors.blue,
      red: colors.red,
    },
    extend: {
      colors: {
        dew: '#E1EFE6',
        gold: '#ffd500',
        ash: '#AEB7B3',
        purple: '#341C5E',
      },
      animation: {
        'fade-in-right': 'fadeInRight .4s ease-out',
        'fade-in': "fadeIn .12s ease-in forwards"
      },
      keyframes: {
        fadeInRight: {
          'from': { opacity: 0, '-webkit-transform': 'translate3d(10%, 0, 0)', transform: 'translate3d(10%, 0, 0)' },
          'to': { opacity: 1, '-webkit-transform': 'translate3d(0, 0, 0)', transform: 'translate3d(0, 0, 0)' }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      }
    },
    container: {
      screens: {
         sm: "100%",
         md: "100%",
         lg: "1024px",
         xl: "1100px"
      }
    },
  },
  variants: {
    animation: ["motion-safe"]
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
  ],
}