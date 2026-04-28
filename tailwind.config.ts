import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: '#6B1A24',
          deep: '#4A0F18',
          soft: '#8B2A35',
        },
        orange: {
          DEFAULT: '#D9531E',
          soft: '#E8723C',
        },
        cream: {
          DEFAULT: '#F5EFE6',
          warm: '#EFE6D6',
        },
        bone: '#FAF5EC',
        ivory: '#FFFCF5',
        ink: {
          DEFAULT: '#1A0F0C',
          soft: '#3A2922',
          mute: '#7A6B60',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Archivo', 'Helvetica Neue', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1440px',
      },
      animation: {
        ticker: 'tickerScroll 38s linear infinite',
        fadeUp: 'fadeUp 1s ease-out backwards',
      },
      keyframes: {
        tickerScroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
