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
          50: '#F6F6F6',
          100: '#EEEEEE',
          300: '#BBBFC8',
          500: '#7F838E',
          700: '#4F525B',
          900: '#242730',
          1000: '#0E111A'
        },
        "extra-neutral": '#181C25',
        "blue-x": '#DAE6FD',
        "blue-y": '#5885F0',
        "blue-z": '#163BB8',
        "error": '#FF4D4F',
        "credit": '#t'
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
