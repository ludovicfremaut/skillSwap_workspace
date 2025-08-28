const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A8D0E6",
        secondary: "#24305E",
        accent: "#BF350B",
        whitish: "#FAF5F5",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
