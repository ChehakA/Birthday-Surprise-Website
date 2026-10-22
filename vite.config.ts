import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps every path relative, so the built site works on
// Vercel, Netlify, GitHub Pages or any sub-folder without changes.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/app[extname]",
      },
    },
  },
});
