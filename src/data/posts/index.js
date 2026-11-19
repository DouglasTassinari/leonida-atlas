// Scheduled posts: only posts whose publishAt <= build time are exported.
// Files starting with "_" are ignored (drafts/examples). See README.md.
import { isPublished } from '../posts-core.js';
import { coverSlugs } from '../covers.js';

const mods = import.meta.glob(['./*.js', '!./index.js', '!./_*.js'], { eager: true });
const now = new Date();
const seen = new Set();

export const posts = Object.entries(mods)
  .map(([file, m]) => ({ file, p: m.default }))
  .filter(({ file, p }) => {
    if (!p || !p.slug || !p.title?.en || !p.description?.en || !Array.isArray(p.sections) || !p.sections.length) {
      console.warn(`[posts] ${file} skipped: missing slug/title.en/description.en/sections`); return false;
    }
    if (!Number.isFinite(Date.parse(p.publishAt))) { console.warn(`[posts] ${file} skipped: invalid publishAt`); return false; }
    if (seen.has(p.slug)) { console.warn(`[posts] ${file} skipped: duplicate slug ${p.slug}`); return false; }
    seen.add(p.slug);
    return isPublished(p, now);
  })
  .map(({ p }) => ({ ...p, cover: coverSlugs.includes(p.cover) ? p.cover : 'news' }))
  .sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt));
