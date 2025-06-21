/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'roobert': ['Roobert TRIAL', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#161618',
        'container-bg': '#525252',
        'card-bg': '#3a3a3a',
        'border-gray': '#404040',
        'text-primary': '#ffffff',
        'text-secondary': '#a3a3a3',
        'accent-green': '#a3e635',
        'accent-lime': '#84cc16',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};