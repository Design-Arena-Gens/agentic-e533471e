import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#7c3aed",
        accent: "#f59e0b",
        ink: {
          50: "#f8fafc",
          100: "#ecf3ff",
          200: "#dfe8ff",
          300: "#c1d0f8",
          400: "#9db3ed",
          500: "#7b94d5",
          600: "#5e74b4",
          700: "#485a8c",
          800: "#323f63",
          900: "#1f2740",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(37, 99, 235, 0.35)",
        panel: "0 16px 60px rgba(15, 23, 42, 0.45)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "cursor-pulse": "cursor-pulse 1.5s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
      },
      keyframes: {
        "cursor-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.2)", opacity: "0.5" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
