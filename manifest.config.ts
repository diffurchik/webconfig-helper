import { defineManifest } from "@crxjs/vite-plugin";

const hostEnv = (process.env.VITE_HOST_PERMISSION || "*://*/*")
  .split(/[, \n]+/)
  .filter(Boolean);

  console.log("host: ", hostEnv)

export default defineManifest({
  manifest_version: 3,
  name: "WebConfig Helper",
  version: "1.0.0",
  description: "Floating menu to set local storage parameter and copy auth token.",

  // === Permissions your extension needs ===
  permissions: ["storage", "clipboardWrite", "scripting"],

  // === Which websites this runs on ===
  host_permissions: hostEnv,

  // ... rest of the config stays the same
  content_scripts: [
    {
      js: ["src/main.ts"],
      run_at: "document_idle",
      matches: hostEnv,
    }
  ],

  web_accessible_resources: [
    {
      resources: ["injected.js"],
      matches: hostEnv,
    }
  ],

  options_page: "options.html"
});