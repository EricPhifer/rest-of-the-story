import { sentryVitePlugin } from "@sentry/vite-plugin";
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), sentryVitePlugin({
    org: "phifer-web-solutions",
    project: "javascript-vue"
  })],

  test: {
    threads: false,
    environment: 'jsdom',
  },

  build: {
    sourcemap: true
  }, 

  resolve: {
    alias: {
      '@': '/src',
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
})