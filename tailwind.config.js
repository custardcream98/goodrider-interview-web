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
          "2rem",
          {
            lineHeight: "1.5",
          },
        ],
        title: [
          "3rem",
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
      },
      spacing: {
        "3px": "3px",
      },
    },
  },
  plugins: [],
};
