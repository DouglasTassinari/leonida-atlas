import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the real production domain before publishing.
export default defineConfig({
  site: 'https://leonida-atlas.example.com',
  integrations: [sitemap()],
});
