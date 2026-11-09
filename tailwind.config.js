/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Augere Labs brand tokens (see app/globals.css)
      colors: {
        ink: token("ink"),
        raised: token("raised"),
        paper: token("paper"),
        dim: token("dim"),
        faint: token("faint"),
        lilac: token("lilac"),
        "lilac-deep": token("lilac-deep"),
        signal: token("signal"),
        line: "rgb(236 232 255 / 0.1)",
      },
      fontFamily: {
        brand: ['"Bricolage Grotesque Variable"', '"Geist Variable"', "system-ui", "sans-serif"],
        sans: ['"Geist Variable"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono Variable"', "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
