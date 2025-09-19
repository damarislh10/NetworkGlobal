/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff', 100: '#d9ecff', 200: '#bfe0ff', 300: '#96cdff',
          400: '#62b0ff', 500: '#3a92ff', 600: '#1e73f2', 700: '#165cd6',
          800: '#1747a7', 900: '#163f8a'
        }
      }
    }
  },
  plugins: []
}
