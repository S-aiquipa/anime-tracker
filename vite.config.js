import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/search": "http://localhost:5000",
      "/animes": "http://localhost:5000",
      "/register": "http://localhost:5000",
      "/login": "http://localhost:5000",
    },
  },
});
