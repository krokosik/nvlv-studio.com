import plugin from 'tailwindcss/plugin';
import { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/{app,ui}/**/*.{ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '0.9' }],
      '4xl': ['2.25rem', { lineHeight: '0.8' }],
      '5xl': ['3rem', { lineHeight: '0.8' }],
      '6xl': ['3.75rem', { lineHeight: '0.8' }],
      '7xl': ['4.5rem', { lineHeight: '0.8' }],
      '8xl': ['6rem', { lineHeight: '0.8' }],
      '9xl': ['8rem', { lineHeight: '0.8' }],
    },
    extend: {
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-22': 'span 22 / span 22',
      },
      gridColumnStart: {
        20: '20',
        21: '21',
      },
      colors: {
        ink: '#fff',
        canvas: '#000',
        neutral: '#F5E8C9',
        accent: '#EC6C4F',
      },
      fontFamily: {},
      maxHeight: {
        fold: 'calc(100svh - var(--header-height))',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('header-open', 'body:has(#header-open:checked) &');
      addVariant('header-closed', 'body:has(#header-open:not(:checked)) &');
    }),
    require('tailwindcss-animate'),
  ],
  safelist: [{ pattern: /action.*/ }, 'ghost'],
};

export default config;
