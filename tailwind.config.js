/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: { xs: "430px" },
      fontFamily: { sans: ["Manrope", "ui-sans-serif", "system-ui"] },
    },
  },
  plugins: [],
};
