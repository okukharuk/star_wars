/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./app/tabs/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'jedi': [ 'Starjedi' ],
        'jout': [ 'Starjout' ],
        'jhol': [ 'Starjhol' ],
        'jmono': [ 'Strjmono' ],
      }
    },
  },
  plugins: [],
}

