/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.js", "./src/app/**/*.js"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        theme: {
          css: {
            "--tw-prose-body": theme("colors.light[body]"),
            "--tw-prose-headings": theme("colors.light[heading]"),
            "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": theme("colors.pink[900]"),
            "--tw-prose-bold": theme("colors.pink[900]"),
            "--tw-prose-counters": theme("colors.pink[600]"),
            "--tw-prose-bullets": theme("colors.pink[400]"),
            "--tw-prose-hr": theme("colors.pink[300]"),
            "--tw-prose-quotes": theme("colors.pink[900]"),
            "--tw-prose-quote-borders": theme("colors.pink[300]"),
            "--tw-prose-captions": theme("colors.pink[700]"),
            "--tw-prose-code": theme("colors.pink[900]"),
            "--tw-prose-pre-code": theme("colors.pink[100]"),
            "--tw-prose-pre-bg": theme("colors.pink[900]"),
            "--tw-prose-th-borders": theme("colors.pink[300]"),
            "--tw-prose-td-borders": theme("colors.pink[200]"),
            "--tw-prose-invert-body": theme("colors.dark[body]"),
            "--tw-prose-invert-headings": theme("colors."),
            "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.pink[400]"),
            "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            "--tw-prose-invert-hr": theme("colors.pink[700]"),
            "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
            "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
          },
        },
      }),
      fontFamily: {
        sans: ["var(--font-outfit)"],
        mono: ["var(--font-jetbrains-mono)"],
      },

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
          underline: "#49454F",
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
