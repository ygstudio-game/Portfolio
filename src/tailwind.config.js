// tailwind.config.js
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0d0f12",
        secondary: "#1a1a1a",

        "accent-blue": "#3b82f6",
        "accent-purple": "#a855f7",
        "accent-pink": "#ec4899",

        accent: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          pink: "#ec4899",
        }
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -30px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" },
        },
      },

      animation: {
        float: "float 20s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
});
