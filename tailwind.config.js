/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "title-mobile": [
          "1.8rem",
          {
            lineHeight: "1.5",
          },
        ],
        title: [
          "2.3rem",
          {
            lineHeight: "1.5",
          },
        ],
        "question-title-mobile": [
          "2rem",
          {
            lineHeight: "1.2",
            fontWeight: 600,
          },
        ],
        "question-title": [
          "3rem",
          {
            lineHeight: "1.2",
            fontWeight: 600,
          },
        ],
        "nav-item": [
          "1.3rem",
          {
            fontWeight: 500,
          },
        ],
        "nav-item-mobile": [
          "1.2rem",
          {
            fontWeight: 500,
          },
        ],
      },
      spacing: {
        "95%": "95%",
        920: "920px",
      },
      screens: {
        custom: "400px",
      },
      colors: {
        mint: "#effdfa",
        darkmint: "#3f9381",
      },
    },
  },
  plugins: [],
};
