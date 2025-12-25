import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
