/* eslint-disable */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        graphik: ["Graphik", "sans-serif"],
      },
      colors: {
        primary: {
          '50': '#f5f6f6',
          '100': '#e6e7e7',
          '200': '#d0d1d1',
          '300': '#afb1b0',
          '400': '#878988',
          '500': '#6c6e6d',
          '600': '#5c5e5d',
          '700': '#4e5050',
          '800': '#444646',
          '900': '#3c3d3d',
          '950': '#2f3030',
      },
        tertiary: {
          '50': '#ecffff',
          '100': '#c0fdff',
          '200': '#a3f9fe',
          '300': '#64f2fc',
          '400': '#1ee1f2',
          '500': '#02c4d8',
          '600': '#049cb6',
          '700': '#0b7d93',
          '800': '#136477',
          '900': '#145365',
          '950': '#073745',
      },
      secondary: {
          '50': '#fefde8',
          '100': '#fffcaf',
          '200': '#fff788',
          '300': '#ffeb44',
          '400': '#fed911',
          '500': '#eec004',
          '600': '#cd9501',
          '700': '#a46a04',
          '800': '#87530c',
          '900': '#734410',
          '950': '#432305',
      },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
export {};
