import { sentryVitePlugin } from "@sentry/vite-plugin";
import Sitemap from 'vite-plugin-sitemap';
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    sentryVitePlugin({
      org: "phifer-web-solutions",
      project: "javascript-vue"
    }),
    Sitemap({
      hostname: 'https://therestofthestory.store',
      dynamicRoutes: [
        '/home',
        '/faqs',
        '/sitemap',
        '/blog-pages/category'
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      readable: true
    })
  ],

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

  define: {
    __APP_VERSION__: JSON. stringify(pkg.version),
  }
})