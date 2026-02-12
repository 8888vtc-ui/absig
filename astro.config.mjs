import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://absigg.netlify.app',
  integrations: [],
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
