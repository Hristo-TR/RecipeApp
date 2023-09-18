/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'tabletop': "url('/src/assets/tabletop.jpg')",
        'pasta': "url('/src/assets/tabletop2.jpg')"
      })
    },
    fontFamily: {
      signature: ["Ephesis"],
      signature2: ["Borel"]
    }
  },
  plugins: [],
}

