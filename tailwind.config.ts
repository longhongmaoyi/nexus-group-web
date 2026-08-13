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
          50: '#f6f3ea',
          100: '#e9e6db',
          200: '#d4d0c3',
          300: '#b8b39e',
          400: '#9d987d',
          500: '#7f8262',
          600: '#636853',
          700: '#4e5346',
          800: '#393f3a',
          900: '#222924',
          950: '#0d131a'
        },
        forest: '#6b873a',
        ink: '#0d131a',
        cream: '#f6f3ea',
        brand: {
          DEFAULT: '#1d6d8a',
          dark: '#15566d',
          light: '#2b83b4',
          frost: '#8dc8e8',
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(13, 19, 26, 0.08)',
        lift: '0 22px 55px rgba(13, 19, 26, 0.15)',
        deep: '0 28px 80px rgba(13, 19, 26, 0.2)',
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
