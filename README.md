# Leonida Atlas

Unofficial GTA VI fan site (12 locales, English default). Not affiliated with Rockstar Games or Take-Two. Built with Astro.

## Run

```
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
```

## Before publishing

- Set the real domain in `astro.config.mjs` (`site`) and in `public/robots.txt` (Sitemap line).
- Add facts only in `src/data/facts.js`, each with an official source URL and a check date.

## Deploy on Cloudflare Pages

Connect the repo (or upload `dist`) and use: build command `npm run build`, output directory `dist`.
