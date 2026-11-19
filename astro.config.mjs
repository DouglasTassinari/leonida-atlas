import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import { isPublished, translatedLangs } from './src/data/posts-core.js';

// Published posts (publishAt <= build time) -> locales with a real translation. Mirrors src/data/posts/index.js.
const postDir = new URL('./src/data/posts/', import.meta.url);
const publishedPosts = {};
for (const f of fs.readdirSync(postDir)) {
  if (!f.endsWith('.js') || f === 'index.js' || f.startsWith('_')) continue;
  const p = (await import(new URL(f, postDir).href)).default;
  if (p && p.slug && isPublished(p)) publishedPosts[p.slug] = translatedLangs(p);
}
const sitemapFilter = (page) => {
  const path = new URL(page).pathname;
  if (path === '/') return false;
  if (path.startsWith('/admin-review') || /\/community\/item\/$/.test(path)) return false;
  const m = path.match(/^\/([^/]+)\/posts\/([^/]+)\/$/);
  // Article pages only for real translations (other locales canonicalize to English).
  if (m) return !!publishedPosts[m[2]] && publishedPosts[m[2]].includes(m[1]);
  return true;
};

// TODO: replace with the real production domain before publishing (also update public/robots.txt).
const locales = ['en', 'fr', 'de', 'it', 'ko', 'pl', 'pt-br', 'ru', 'zh-hans', 'zh-hant', 'es-mx', 'es-es'];
const sitemapLocales = { en: 'en', fr: 'fr', de: 'de', it: 'it', ko: 'ko', pl: 'pl', 'pt-br': 'pt-BR', ru: 'ru', 'zh-hans': 'zh-Hans', 'zh-hant': 'zh-Hant', 'es-mx': 'es-MX', 'es-es': 'es-ES' };

export default defineConfig({
  site: 'https://leonida-atlas-4z0.pages.dev',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales,
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  // Old English-only URLs keep working.
  redirects: {
    '/log': '/en/log/',
    '/fact-check': '/en/fact-check/',
    '/reality-check': '/en/reality-check/',
    '/about': '/en/about/',
    '/disclaimer': '/en/disclaimer/',
    '/privacy': '/en/privacy/',
  },
  integrations: [sitemap({ filter: sitemapFilter, customSitemaps: ['https://leonida-atlas-4z0.pages.dev/sitemap-community.xml'], i18n: { defaultLocale: 'en', locales: sitemapLocales } })],
});
