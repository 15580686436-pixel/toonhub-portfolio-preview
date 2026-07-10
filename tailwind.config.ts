import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#050d0b",
        mint: "#62f5c3",
        paper: "#effff9",
        ink: "#0a1210",
        muted: "#648078",
        line: "#b9d9ce",
        accent: "#62f5c3",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Inter Tight",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "soft-line": "0 1px 0 rgba(23, 21, 17, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
