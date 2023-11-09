/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-quicksand)'],
      },
      colors: {
        'neutral': {
          DEFAULT: '#FFFFFF',
          50: '#F8F8F8',
          100: '#F1F1F1',
          300: '#D6D5D6',
          500: '#BAB9BA',
          700: '#7F7E7F',
          900: '#444344',
          1000: '#262526'
        },
        "extra-neutral": '#181C25',
        "blue-x": '#DAE6FD',
        "blue-y": '#5885F0',
        "blue-z": '#163BB8',
        "error": '#FF4D4F',
        "credit": '#t',
        "green-1": {
          100: "#EAF3E6",
          300: "#C1DCB3",
          400: "#ADD199",
          500: "#98C580",
          600: "#7CA268",
          900: "#293721",
        },
        "green-2": {
          200: "#ACD993",
          500: "#48A516",
          600: "#3A8412",
        },
        "cream": {
          500 : "#F9F5F4",
          600: "#EFE9E8",
          700: "#E1D4D1",
        },
        "orange": {
          100: "#F9EFE7",
          400: "#FDC69D",
          500: "#FDB885",
          600: "#DC9B6B",
        },
        "grey": {
          200: "#D4D6E3",
          500: "#9499B8",
        },
        "red": {
          DEFAULT: "#E73032",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
