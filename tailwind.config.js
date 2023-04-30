/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryDark: "#252525",
        primaryWhite: "#FAFAFA",
        primaryCoral: "#E0736D",
      },
    },
  },
  plugins: [],
};
