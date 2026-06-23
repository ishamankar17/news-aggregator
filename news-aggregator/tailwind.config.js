/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f6f3',
          100: '#eeece6',
          200: '#dbd7cc',
          300: '#c3bcad',
          400: '#a89d8b',
          500: '#91836f',
          600: '#7a6b5c',
          700: '#64574b',
          800: '#544941',
          900: '#483f39',
          950: '#272119',
        },
        accent: {
          50: '#fff5f2',
          100: '#ffe8e0',
          200: '#ffd0c0',
          300: '#ffad95',
          400: '#ff7d58',
          500: '#f85a30',
          600: '#e53d12',
          700: '#c12f0d',
          800: '#9f2a12',
          900: '#832815',
          950: '#471106',
        },
        surface: {
          light: '#faf9f7',
          dark: '#0f0e0c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
