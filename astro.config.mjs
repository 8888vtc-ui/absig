import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: netlify(),
  site: 'https://www.galriviera.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
    assets: 'assets'
  },
  vite: {
    build: {
      assetsDir: 'assets',
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Supprime console.log en production
          drop_debugger: true
        }
      }
    },
    css: {
      devSourcemap: false
    }
  },
  image: {
    domains: ['www.galriviera.com'],
    remotePatterns: [{ protocol: 'https' }]
  },
  compressHTML: true
});

