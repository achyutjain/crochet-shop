/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'crochet-pink': '#F8C8DC',
        'crochet-mint': '#D4F4DD',
        'crochet-lavender': '#E6E6FA',
        'crochet-cream': '#FFF8E7'
      },
      fontFamily: {
        'dancing': ['"Dancing Script"', 'cursive']
      }
    },
  },
  plugins: [],
}
