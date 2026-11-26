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
        cream: {
          50: "#FFFDF8",
          100: "#FAF5EB",
          200: "#F2E9DA",
          300: "#E8DAC4",
        },
        brown: {
          50: "#FBF7F2",
          100: "#EFE4D5",
          200: "#DFCBB3",
          300: "#C9AD8D",
          400: "#B28D67",
          500: "#8F6A47",
          600: "#6F5034",
          700: "#523923",
          800: "#372516",
        },
        sage: {
          50: "#F2F6F0",
          100: "#E2EBE0",
          200: "#C5D8C1",
          300: "#9FB99A",
          400: "#799B74",
          500: "#5A7D55",
          600: "#476643",
          700: "#375034",
        },
        terracotta: {
          50: "#FDF4F1",
          100: "#F9E3DC",
          200: "#EEBFB1",
          500: "#B8523B",
          600: "#9A412D",
        },
      },
      boxShadow: {
        "warm-sm": "0 2px 10px -2px rgba(82, 57, 35, 0.08)",
        "warm-md": "0 12px 30px -10px rgba(82, 57, 35, 0.14)",
        "sage-glow": "0 8px 22px -5px rgba(71, 102, 67, 0.30)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(220%) skewX(-18deg)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.55)", opacity: "0" },
          "100%": { transform: "scale(1.55)", opacity: "0" },
        },
        "scan-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.15s ease-out",
        "float-gentle": "float-gentle 3.4s ease-in-out infinite",
        "fade-up": "fade-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.24, 0, 0.38, 1) infinite",
        "scan-sweep": "scan-sweep 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
