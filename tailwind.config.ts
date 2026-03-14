import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfcfb",
          100: "#f9f7f4",
          200: "#f2ede8",
          300: "#e8e0d8",
          400: "#d4c9bc",
          500: "#b8a898",
        },
        sand: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#e8dfd2",
          300: "#d4c4b0",
        },
        ink: {
          600: "#4a453e",
          700: "#3d3933",
          800: "#2d2a26",
          900: "#1f1d1a",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        postcard: "0.5rem",
        card: "1rem",
      },
      boxShadow: {
        card: "0 4px 24px rgba(45, 42, 38, 0.08)",
        postcard: "0 8px 32px rgba(45, 42, 38, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
