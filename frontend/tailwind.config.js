/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071A33', 'navy-deep': '#040F20', 'navy-light': '#0E294E',
          gold: '#C8922F', 'gold-hover': '#B37E22', 'gold-light': '#F7EACB',
          bg: '#FCFBF7', neutral: '#F5F4EF', surface: '#FFFFFF',
          border: '#E6E4DC', muted: '#5C6470', dark: '#121A26',
        },
        // Existing About/Courses components retain their tokens with the new brand palette.
        primaryBlue: '#071A33', darkBlue: '#040F20', lightBlue: '#F5F4EF',
        primaryGold: '#C8922F', white: '#FFFFFF', gray: '#F5F4EF', darkText: '#121A26',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { layout: '1440px' },
    },
  },
  plugins: [],
}
