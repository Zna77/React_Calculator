/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts}", "./public/**/*.{html,js,jsx,ts}"],
  theme: {
    minHeight: {
      15: "15px",
    },
    extend: {
      fontFamily: {
        "share-tech-mono": ["Share Tech Mono", "monospace"],
        digital: ["Digital"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    plugins: [],
  },
};
