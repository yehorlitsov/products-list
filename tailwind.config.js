/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          main: 'hsl(var(--background-main))',
        },
        button: {
          primary: {
            DEFAULT: 'hsl(var(--button-primary))',
            accent: 'hsl(var(--button-primary-accent))',
          },
        },
      },
    },
  },
  plugins: [],
};
