import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/{app,ui}/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
