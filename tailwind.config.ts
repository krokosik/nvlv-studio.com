import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/{app,ui}/**/*.{ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        32: 'repeat(32, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-22': 'span 22 / span 22',
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
  ],
  safelist: [{ pattern: /action.*/ }, 'ghost'],
};

export default config;
