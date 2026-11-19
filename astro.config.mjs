import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  integrations: [sitemap({ filter: (page) => new URL(page).pathname !== '/', i18n: { defaultLocale: 'en', locales: sitemapLocales } })],
});
