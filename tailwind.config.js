module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        mobile: { max: '767px' },
        desktop: { min: '768px' },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
