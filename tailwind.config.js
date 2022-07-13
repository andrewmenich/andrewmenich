const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./templates/**/*.twig', './public/assets/svg/**/*.svg'],
  theme: {
    fontFamily: {
      display: ['Public Sans', 'Helvetica', 'serif'],
      body: ['FiraCode', 'monospaced'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000411',
      white: '#FAFAFA',
      gray: colors.gray,
      yellow: colors.amber,
      blue: colors.blue,
      red: colors.red,
    },
    extend: {
      colors: {
        night: '#102040',
        teal: '#025E73',
        sand: '#F2C879',
        froly: '#F28177',
        valencia: '#D94E4E'
      },
      animation: {
        'fade-in-right': 'fadeInRight .4s ease-out forwards',
        'fade-in': "fadeIn .12s ease-in forwards",
        'bounce-right': 'bounceRight 1s infinite'
      },
      keyframes: {
        fadeInRight: {
          'from': { opacity: 0, '-webkit-transform': 'translate3d(7%, 0, 0)', transform: 'translate3d(7%, 0, 0)' },
          'to': { opacity: 1, '-webkit-transform': 'translate3d(0, 0, 0)', transform: 'translate3d(0, 0, 0)' }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        bounceRight: {
          '0%, 100%': {
            transform: 'translateX(25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#000411',
          },
        },
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
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
  ],
}
