import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), nodePolyfills(), react()],
  server: {
    port: 3001,
  },
  build: {
    sourcemap: true,
    outDir: "build",
  },
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/typography.scss";
                         @import "./src/assets/styles/variables.scss";
                         @import "./src/assets/styles/mixins.scss";`,
      },
    },
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
});
