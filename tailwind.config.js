/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#49393B',
      'black': '#F4ECD6',
      'blue': {
        100: '#23C0D1',
        200: '#21B0C0',
        300: '#1EA0AE',
        400: '#1B909D',
        500: '#18808C',
        600: '#15707A',
        700: '#126069',
        800: '#0F5057',
        900: '#0C4046',
      },
      'lightblue': '#598381',
      'neutral': {
        100: '#D1D0DD',
        200: '#C5C4D4',
        300: '#B9B8CC',
        400: '#ADACC3',
        500: '#A2A0BA',
        600: '#9795B2',
        700: '#8B89A9',
        800: '#7F7DA1',
        900: '#737198',
      },
      'slate': {
        100: '#77B9CF',
        200: '#68B1CA',
        300: '#59AAC5',
        400: '#4AA2BF',
        500: '#4098B5',
        600: '#3A8BA6',
        700: '#357E97',
        800: '#307288',
        900: '#2A6579',
      },
      'pink': {
        100: '#F9F0F7',
        200: '#F3E2F0',
        300: '#EDD4E8',
        400: '#E7C5E0',
        500: '#E0B0D5',
        600: '#DBA9D1',
        700: '#D59AC9',
        800: '#CF8CC1',
        900: '#C97EB9',
      }
    },
  },
  plugins: [],
}
