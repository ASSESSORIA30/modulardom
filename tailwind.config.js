/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EDF4',
          100: '#C5CFDE',
          200: '#8A9AB8',
          300: '#4F6592',
          400: '#2A3F66',
          500: '#162A4A',
          600: '#0F1F38',
          700: '#0A1628',  // primary deep navy
          800: '#060E1B',
          900: '#03070F',
        },
        gold: {
          50: '#FAF5E8',
          100: '#F2E6C4',
          200: '#E8D5A8',  // champagne
          300: '#DCC285',
          400: '#C9A961',  // primary gold
          500: '#B18F47',
          600: '#8E7338',
          700: '#6B562A',
          800: '#4A3B1D',
          900: '#2A2110',
        },
        cream: {
          50: '#FFFDFA',
          100: '#FBF8F1',
          200: '#F7F4EE',  // primary cream
          300: '#EDE6D7',
          400: '#D9CCB1',
        },
        ink: '#0A0A0A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 10vw, 12rem)',
        'display': 'clamp(2.5rem, 6vw, 7rem)',
        'title': 'clamp(2rem, 4vw, 4.5rem)',
      },
      letterSpacing: {
        'tightest': '-0.06em',
        'tighter-2': '-0.04em',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
