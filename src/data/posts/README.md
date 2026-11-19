# Scheduled posts

One file per post: `src/data/posts/<slug>.js`, with `export default { ... }`.
Files starting with `_` (and this README) are ignored, so use `_name.js` for drafts.
Post files must be plain data (no imports): `astro.config.mjs` also loads them in Node to filter the sitemap.

## Schema

```js
export default {
  slug: 'my-post',                          // URL: /<lang>/posts/my-post/
  publishAt: '2026-11-20T08:00:00-03:00',   // ISO 8601 WITH the -03:00 offset (Brasilia time)
  cover: 'news',                            // a key of src/data/covers.js (also used as og:image); unknown key -> 'news'
  title:       { en: '...', 'pt-br': '...' },
  description: { en: '...', 'pt-br': '...' },
  sections: [
    {
      h: { en: '...', 'pt-br': '...' },
      p: { en: 'Paragraph one.\n\nParagraph two.', 'pt-br': '...' },   // paragraphs separated by \n\n
      list: { en: ['...'], 'pt-br': ['...'] },                         // optional
    },
  ],
  sources: [{ name: 'Rockstar Games', url: 'https://...', quote: 'short excerpt', checked: '2026-11-19' }],
  video: { youtubeId: 'XXXXXXXXXXX', title: '...', credit: 'Channel name' },   // optional
  tags: ['trailer', 'news'],                // used to pick related posts
  updated: '2026-11-19',                    // dateModified (YYYY-MM-DD)
};
```

`en` is required in every field. `pt-br` is optional but should be complete when present
(a locale counts as translated only if title, description and every section heading/paragraph exist in it).

## Languages

- Translated locales (today `en` and `pt-br`) get real pages with their own text and `hreflang` between them.
- The other 10 locales show the English text with the note "Article available in English",
  `canonical` pointing to the `/en/` version, and are left out of the sitemap.

## Scheduling and the time zone

A post is published when `publishAt <= build time`. Always write the `-03:00` offset so the
moment is unambiguous. Future posts generate no page, no sitemap entry and appear in no list
(posts list, home, related).

**The site is static: a scheduled post only appears after a new build/deploy that runs after
its `publishAt`.** Schedule a daily rebuild (for example a Cloudflare Pages deploy hook triggered
by a cron job at 08:05 -03:00) or rebuild by hand (`npm run build`) after the time has passed.
