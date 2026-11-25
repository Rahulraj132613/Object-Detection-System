import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          cyan: "#06b6d4",
          emerald: "#10b981",
        },
        dark: {
          bg: "#0b0f19",
          card: "#111827",
          border: "#1f2937",
          hover: "#1e293b",
        }
      },
    },
  },
  plugins: [],
};
export default config;
