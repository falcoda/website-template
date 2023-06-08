import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [nodePolyfills(),react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'https://mcnscan.io/',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      'buffer': 'buffer'
    }
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
        generateScopedName: "[name]__[local]__[hash:base64:5]"
    }
  },

})
