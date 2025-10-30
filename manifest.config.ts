import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "WebConfig Helper",
  version: "1.0.0",
  description: "Floating menu to set local storage parameter and copy auth token.",

  // === Permissions your extension needs ===
  permissions: ["storage", "clipboardWrite", "scripting"],

  // === Which websites this runs on ===
  host_permissions: [
    process.env.VITE_HOST_PERMISSION || "*://*/*"
  ],

  // ... rest of the config stays the same
  content_scripts: [
    {
      js: ["src/main.ts"],
      run_at: "document_idle",
      matches: ["<all_urls>"]
    }
  ],

  web_accessible_resources: [
    {
      resources: ["public/injected.js"],
      matches: ["<all_urls>"]
    }
  ],

  options_page: "options.html"
});