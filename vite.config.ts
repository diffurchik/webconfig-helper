import { defineConfig, loadEnv } from "vite";
import { crx } from "@crxjs/vite-plugin";

export default defineConfig(({ mode }) => {
 
  const env = loadEnv(mode, process.cwd(), '');
  
  const manifest = require("./manifest.config").default;
  process.env = { ...process.env, ...env };
  
  return {
    plugins: [crx({ manifest })],
    build: {
      target: "es2022",
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: true
    },
    server: {
      port: 5173,
      open: false
    }
  };
});
