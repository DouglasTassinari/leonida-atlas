import { json, publicPost } from '../../_lib/core.js';

export async function onRequestGet({ params, env }) {
  const id = String(params.id || '');
  if (!env.DB || !/^[a-f0-9]{16}$/.test(id)) return json({ error: 'not_found' }, 404);
  const r = await env.DB.prepare("SELECT id, category, title, note, youtube_id, image_key, lang, approved_at, created_at FROM posts WHERE id = ? AND status = 'approved'").bind(id).first();
  if (!r) return json({ error: 'not_found' }, 404);
  return json(publicPost(r), 200, { 'cache-control': 'public, max-age=60' });
}
