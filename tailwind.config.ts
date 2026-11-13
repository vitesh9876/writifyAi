import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          900: "#701a75",
          accent: "#ec4899",
        },
        paper: {
          cream: "#fbfbf7",
          ivory: "#fefcf6",
          ruled: "#94a3b8",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        cursiveReal: ["'Cursive Real'", "'Caveat'", "cursive"],
        cursive2: ["'Cursive 2'", "'Marck Script'", "cursive"],
        darlington: ["'Darlington'", "'Dancing Script'", "cursive"],
        halimun: ["'Halimun'", "'Great Vibes'", "cursive"],
        southampton: ["'Southampton'", "'Sacramento'", "cursive"],
        tomatoes: ["'Tomatoes'", "'Shadows Into Light'", "cursive"],
        handwritten: ["'Handwritten'", "'Kalam'", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;

