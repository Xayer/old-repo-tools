import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pluginRewriteAll()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "node-fetch": "just-use-native-fetch",
    },
  },
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    exclude: ["@tanstack/vue-query", "vue-demi"],
  },
});
