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
        charcoal: {
          DEFAULT: "#0B0D10",
          dark: "#0B0D10",
          medium: "#121417",
          card: "#1a1d21",
        },
        gold: {
          DEFAULT: "#C9A227",
          hover: "#d4af2e",
        },
        "off-white": "#FAFAFA",
        "body-gray": "#A3A3A3",
        forecast: {
          bg: "#F5F3EE",
          surface: "#FFFFFF",
          elevated: "#FDFCFA",
          border: "#E8E4DC",
          muted: "#5C6370",
          text: "#0B0D10",
          "text-secondary": "#3D4349",
        },
      },
      boxShadow: {
        forecast: "0 1px 3px rgba(11, 13, 16, 0.06), 0 8px 24px rgba(11, 13, 16, 0.04)",
        "forecast-lg": "0 4px 24px rgba(11, 13, 16, 0.08)",
      },
      maxWidth: {
        content: "1160px",
        "hero-copy": "700px",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      transitionDuration: {
        DEFAULT: "250ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
      keyframes: {
        "soft-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.03)" },
        },
        "dash-flow": {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "320" },
          "100%": { strokeDashoffset: "0" },
        },
        "bar-rise": {
          "0%": { transform: "scaleY(0)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      animation: {
        "soft-pulse": "soft-pulse 3s ease-in-out infinite",
        "dash-flow": "dash-flow 2.4s linear infinite",
        "draw-line": "draw-line 1.8s ease-out forwards",
        "bar-rise": "bar-rise 0.7s ease-out forwards",
        float: "float 5s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
