/* eslint-disable */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        graphik: ["Graphik", "sans-serif"],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          50: '#E1F5FE',
          100: '#B3E5FC',
          200: '#81D4FA',
          300: '#4FC3F7',
          400: '#29B6F6',
          500: '#00A6F6',
          600: '#0091EA',
          700: '#007AC1',
          800: '#006494',
          900: '#004D73',
        },
        common: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#CCCCCC',
          500: '#BEBEBE',
          600: '#9E9E9E',
          700: '#7E7E7E',
          800: '#616161',
          900: '#424242',
        },
        secondary: {
          50: '#EDEAFF',
          100: '#D4D1FF',
          200: '#BBB8FF',
          300: '#A29FFF',
          400: '#8B86FF',
          500: '#6F64F6',
          600: '#5E54E1',
          700: '#4B45CB',
          800: '#3A37B5',
          900: '#2B2A99',
        },
        danger: {
          50: '#FFE6E6',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF4B4B',
          600: '#E60000',
          700: '#CC0000',
          800: '#B20000',
          900: '#800000',
        },
        success: {
          50: '#E6FFED',
          100: '#CCFFDA',
          200: '#99FFB5',
          300: '#66FF90',
          400: '#33FF6B',
          500: '#0EDD65',
          600: '#0CC256',
          700: '#0AA646',
          800: '#087937',
          900: '#055C2A',
        },
        warning: {
          50: '#FFFBE6',
          100: '#FFF5CC',
          200: '#FFEB99',
          300: '#FFE066',
          400: '#FFD633',
          500: '#ECC911',
          600: '#D4B200',
          700: '#B39600',
          800: '#937900',
          900: '#735C00',
        },
        background: {
          50: '#FBF6FF',
          100: '#F5EEFE',
          200: '#EAD7FD',
          300: '#E0C0FC',
          400: '#D5A8FA',
          500: '#CB91F9',
          600: '#C07AF8',
          700: '#B663F7',
          800: '#AB4CF6',
          900: '#A035F5',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp"),addVariablesForColors],
};
export {};
 