import { defineConfig, loadEnv } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";

export default defineConfig(({ mode }) => {
 
  const env = loadEnv(mode, process.cwd(), '');
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
