import { sentryVitePlugin } from "@sentry/vite-plugin";
import Sitemap from 'vite-plugin-sitemap';
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'

// Only emit + upload source maps to Sentry on Netlify deploy builds, so local
// `npm run build` stays fast and doesn't push maps on every run.
const uploadSourcemaps = !!process.env.NETLIFY

export default defineConfig({
  plugins: [
    vue(),
    ...(uploadSourcemaps
      ? [sentryVitePlugin({ org: "phifer-web-solutions", project: "javascript-vue" })]
      : []),
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
    sourcemap: uploadSourcemaps ? 'hidden' : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          sanity: ['@sanity/client', '@sanity/image-url'],
        }
      }
    }
  },

  resolve: {
    alias: {
      '@': '/src'
    }
  },

  define: {
    __APP_VERSION__: JSON. stringify(pkg.version),
  }
})