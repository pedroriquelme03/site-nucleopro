/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08090B",
          900: "#0B0D10",
          800: "#111418",
          700: "#171B21",
          600: "#20252D",
        },
        brand: {
          DEFAULT: "#a97c50",
          400: "#c9a06e",
          500: "#a97c50",
          600: "#8d643c",
          700: "#6b4a28",
          glow: "#a97c50",
        },
        line: "rgba(255,255,255,0.08)",
        background: "#08090B",
        foreground: "#f1f5f9",
        card: {
          DEFAULT: "#111418",
          foreground: "#f1f5f9",
        },
        popover: {
          DEFAULT: "#111418",
          foreground: "#f1f5f9",
        },
        primary: {
          DEFAULT: "#a97c50",
          foreground: "#08090B",
        },
        secondary: {
          DEFAULT: "#171B21",
          foreground: "#f1f5f9",
        },
        muted: {
          DEFAULT: "#171B21",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#171B21",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        border: "rgba(255,255,255,0.08)",
        input: "rgba(255,255,255,0.12)",
        ring: "#a97c50",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Sora'", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(169,124,80,0.45)",
        "glow-sm": "0 0 24px -8px rgba(169,124,80,0.5)",
        card: "0 8px 40px -12px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 48s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
