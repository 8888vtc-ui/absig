import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.absig-consulting.fr',
  integrations: [
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
