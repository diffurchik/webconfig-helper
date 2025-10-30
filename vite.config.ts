import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";

// Vite configuration for a Manifest V3 (MV3) extension
export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    target: "es2022",        // same as your tsconfig target
    outDir: "dist",          // built extension folder
    emptyOutDir: true,       // clear dist on each build
    sourcemap: true          // better debugging in DevTools
  },
  server: {
    port: 5173,              // dev server (optional)
    open: false
  }
});
