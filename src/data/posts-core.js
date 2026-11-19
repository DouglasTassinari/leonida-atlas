// Plain ES module (no Vite-only APIs) so astro.config.mjs can import it too.
export const isPublished = (p, now = new Date()) => {
  const t = Date.parse(p && p.publishAt);
  return Number.isFinite(t) && t <= now.getTime();
};

// Locales that have a real translation of this post (hreflang only between these).
export const translatedLangs = (p) =>
  Object.keys(p.title || {}).filter((l) => p.title[l] && p.description?.[l]
    && (p.sections || []).every((s) => s.h?.[l] && s.p?.[l]));

// Text in the requested locale, falling back to English.
export const postText = (p, lang) => {
  const real = translatedLangs(p).includes(lang);
  const l = real ? lang : 'en';
  return {
    lang: l, translated: real,
    title: p.title[l], description: p.description[l],
    sections: p.sections.map((s) => ({
      h: s.h[l], paras: String(s.p[l]).split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean), list: s.list?.[l] || [],
    })),
  };
};

export const readMinutes = (p, lang) => {
  const x = postText(p, lang);
  const text = [x.title, ...x.sections.flatMap((s) => [s.h, ...s.paras, ...s.list])].join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
};

export const fmtDate = (iso, htmlLang) => {
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso + 'T12:00:00Z' : iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(htmlLang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: /^\d{4}-\d{2}-\d{2}$/.test(iso) ? 'UTC' : 'America/Sao_Paulo' });
};
export const isoDay = (iso) => (/^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : new Date(iso).toISOString());

export const related = (all, p, n = 3) => {
  const tags = new Set(p.tags || []);
  return all.filter((x) => x.slug !== p.slug)
    .map((x) => ({ x, s: (x.tags || []).filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.s - a.s || Date.parse(b.x.publishAt) - Date.parse(a.x.publishAt))
    .slice(0, n).map((o) => o.x);
};
