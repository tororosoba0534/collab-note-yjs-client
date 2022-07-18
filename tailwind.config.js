const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        scrollIn: {
          "0%": { transform: "translateX(40px)", opacity: 0 },
          "100%": { transform: "", opacity: 1 },
        },
      },
      animation: {
        scrollIn: "scrollIn 1s",
      },
    },
  },
  plugins: [],
};
