import { json } from '../../_lib/core.js';
import { requireAdmin } from '../../_lib/admin.js';

// POST {id, action:'approve'|'reject'}
export async function onRequestPost({ request, env }) {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  let b;
  try { b = await request.json(); } catch { return json({ error: 'bad_json' }, 400); }
  if (!/^[a-f0-9]{16}$/.test(String(b?.id)) || !['approve', 'reject'].includes(b?.action)) return json({ error: 'bad_request' }, 400);
  const r = b.action === 'approve'
    ? await env.DB.prepare("UPDATE posts SET status = 'approved', approved_at = ?, report_count = 0 WHERE id = ?").bind(Date.now(), b.id).run()
    : await env.DB.prepare("UPDATE posts SET status = 'rejected', image_data = NULL, image_key = NULL, image_mime = NULL WHERE id = ?").bind(b.id).run();
  if (b.action === 'approve') await env.DB.prepare('DELETE FROM reports WHERE post_id = ?').bind(b.id).run();
  return json({ ok: true, changed: r.meta?.changes ?? 0 });
}
