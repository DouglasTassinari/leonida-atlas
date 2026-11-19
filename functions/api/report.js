import { LIMITS, json, ipHash } from '../_lib/core.js';

// POST {id}. One report per person per post (hash of IP + daily salt). At 3 reports the post goes back to 'pending'.
export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false }, 500);
  let body;
  try { body = await request.json(); } catch { return json({ ok: false }, 400); }
  const id = String(body?.id || '');
  if (!/^[a-f0-9]{16}$/.test(id)) return json({ ok: false }, 400);
  const now = Date.now();
  const hash = await ipHash(request.headers.get('cf-connecting-ip') || 'unknown', now, env.IP_SALT || '');
  const ins = await env.DB.prepare("INSERT OR IGNORE INTO reports (post_id, ip_hash, created_at) SELECT id, ?, ? FROM posts WHERE id = ? AND status = 'approved'").bind(hash, now, id).run();
  if (ins.meta?.changes) {
    await env.DB.prepare("UPDATE posts SET report_count = report_count + 1, status = CASE WHEN report_count + 1 >= ? THEN 'pending' ELSE status END WHERE id = ? AND status = 'approved'").bind(LIMITS.reportsToHide, id).run();
  }
  return json({ ok: true });
}
