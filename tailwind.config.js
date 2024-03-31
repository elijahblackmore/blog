/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.js", "./src/app/**/*.js"],
  theme: {
    extend: {
      textDecorationColor: {
        light: {
          underline: "#CAC4D0",
        },
        dark: {
          underline: "#49454F",
        },
      },
      colors: {
        light: {
          surface: "#FEF7FF",
          heading: "#1D1B20",
          body: "49454F",
          icon: "79747E",
        },
        dark: {
          surface: "#141218",
          heading: "#E6E0E9",
          body: "#CAC4D0",
          icon: "#938F99",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
