/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f8f7f4",
        secondary: "#fe784f",
        tertiary: "#222222",
        secondaryRed: "#f42c37",
        secondaryYellow: "#fdc62e",
        secondaryGreen: "#2dcc6f",
        secondaryBlue: "#1376f4",
        secondaryWhite: "#eeeeee",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "linear-gradient(to right, rgba(255, 224, 130, 1), rgba(255, 236, 179, 0.5)), url(/src/assets/background.jpg)",
        banneroffer: "linear-gradient(to bottom, rgba(255, 224, 130, 0.9), rgba(28, 25, 23, 0.7)), url(/src/assets/banner.png)",
      },      
    },
  },
  plugins: [],
};