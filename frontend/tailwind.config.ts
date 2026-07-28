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
        background: "#000000",
        surface: {
          50: "#0a0a0a",
          100: "#111111",
          200: "#1a1a1a",
        },
        primary: "#ffffff",
        muted: "#71717a",
        border: "#27272a",
        hover: "#18181b",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      borderRadius: {
        card: "8px",
        btn: "6px",
      }
    },
  },
  plugins: [],
};
export default config;
