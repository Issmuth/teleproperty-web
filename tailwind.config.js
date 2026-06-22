/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0B8F55',
          'primary-strong': '#0A7A4A',
          'primary-muted': '#166534',
          accent: '#18C36A',
        },
      },
    },
  },
  plugins: [],
}
