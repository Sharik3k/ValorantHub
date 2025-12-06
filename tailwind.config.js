/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'glitch': 'glitch 0.3s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        glitch: {
          '0%': {
            textShadow: '2px 2px #ff4655, -2px -2px cyan',
          },
          '25%': {
            textShadow: '-2px -2px #ff4655, 2px 2px cyan',
          },
          '50%': {
            textShadow: '2px -2px #ff4655, -2px 2px cyan',
          },
          '75%': {
            textShadow: '-2px 2px #ff4655, 2px -2px cyan',
          },
          '100%': {
            textShadow: '2px 2px #ff4655, -2px -2px cyan',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(255, 70, 85, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 70, 85, 0.5), 0 0 30px rgba(255, 70, 85, 0.5)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
      },
    },
  },
  plugins: [],
};
