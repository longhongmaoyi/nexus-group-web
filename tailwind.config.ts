import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          50: '#f4f7f5',
          100: '#e4ebe7',
          200: '#c9d8cf',
          300: '#a4bdad',
          400: '#7b9d87',
          500: '#5d806b',
          600: '#496657',
          700: '#3c5248',
          800: '#33433c',
          900: '#1e302b',
          950: '#071b21'
        },
        forest: '#708a3d',
        ink: '#071b2b',
        cream: '#f5f3ec'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(7, 27, 43, 0.12)',
        lift: '0 24px 70px rgba(7, 27, 43, 0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
