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
        canvas: "#F8FAFC",
        surface: {
          DEFAULT: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
        primary: {
          DEFAULT: "#09090B",
          hover: "#18181B",
          active: "#27272A",
        },
        muted: "#71717A",
        border: "#E4E4E7",
        brand: {
          50: "#F8FAFC",
          100: "#F4F4F5",
          200: "#E4E4E7",
          500: "#09090B",
          600: "#09090B",
          700: "#18181B",
          800: "#27272A",
          900: "#09090B",
        },
        paper: {
          cream: "#fbfbf7",
          ivory: "#fefcf6",
          ruled: "#94a3b8",
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

