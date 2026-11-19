import { json, publicPost } from '../_lib/core.js';

// GET /api/community?before=<ms>&limit=12  -> approved posts, newest first, no blobs.
export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ items: [], next: null }, 200);
  const u = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(u.searchParams.get('limit') || '12', 10) || 12, 1), 30);
  const before = parseInt(u.searchParams.get('before') || '', 10);
  const has = Number.isFinite(before);
  const stmt = env.DB.prepare(`SELECT id, category, title, note, youtube_id, image_key, lang, approved_at, created_at FROM posts WHERE status = 'approved' ${has ? 'AND approved_at < ?' : ''} ORDER BY approved_at DESC LIMIT ?`);
  const { results } = await (has ? stmt.bind(before, limit + 1) : stmt.bind(limit + 1)).all();
  const more = results.length > limit;
  const rows = results.slice(0, limit);
  return json({ items: rows.map(publicPost), next: more ? rows[rows.length - 1].approved_at : null }, 200, { 'cache-control': 'public, max-age=60' });
}
