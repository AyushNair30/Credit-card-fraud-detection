/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f6',
          100: '#d4dae8',
          200: '#a8b4cf',
          300: '#7d8eb6',
          400: '#52689d',
          500: '#3b5380',
          600: '#2c4068',
          700: '#1e2d50',
          800: '#142039',
          900: '#0b1528',
          950: '#060c18',
        },
        teal: {
          50: '#effdf8',
          100: '#c8fdef',
          200: '#91f8dd',
          300: '#52f0c6',
          400: '#1de0ad',
          500: '#06c893',
          600: '#03a578',
          700: '#048262',
          800: '#096650',
          900: '#0d5442',
        },
        fraud: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
