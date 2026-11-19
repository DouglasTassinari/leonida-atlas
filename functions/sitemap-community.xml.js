import { isRich, xmlEscape, LOCALES } from './_lib/core.js';

// Only approved AND rich posts (image, or note >= 60 chars). Thin ones are noindex on their page.
export async function onRequestGet({ request, env }) {
  const origin = new URL(request.url).origin;
  let rows = [];
  if (env.DB) {
    const r = await env.DB.prepare("SELECT id, note, image_key, lang, approved_at FROM posts WHERE status = 'approved' ORDER BY approved_at DESC LIMIT 5000").all();
    rows = r.results.filter(isRich);
  }
  const urls = [`<url><loc>${origin}/en/community/</loc></url>`].concat(rows.map((p) => {
    const lang = LOCALES.includes(p.lang) ? p.lang : 'en';
    return `<url><loc>${xmlEscape(`${origin}/${lang}/community/item/?id=${p.id}`)}</loc><lastmod>${new Date(p.approved_at).toISOString().slice(0, 10)}</lastmod></url>`;
  }));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, {
    headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=900' },
  });
}
