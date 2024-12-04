/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default sans-serif
        poppins: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        display: ['Oswald', 'sans-serif'],
        handwriting: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}

