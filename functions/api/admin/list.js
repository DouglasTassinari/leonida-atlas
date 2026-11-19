import { json } from '../../_lib/core.js';
import { requireAdmin } from '../../_lib/admin.js';

// GET /api/admin/list?status=pending|blocked|approved  (Authorization: Bearer <ADMIN_TOKEN>)
export async function onRequestGet({ request, env }) {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  const status = new URL(request.url).searchParams.get('status') || 'pending';
  if (!['pending', 'blocked', 'approved', 'rejected'].includes(status)) return json({ error: 'bad_status' }, 400);
  const { results } = await env.DB.prepare('SELECT id, created_at, category, title, note, youtube_id, image_key, image_mime, status, ai_verdict, report_count, lang FROM posts WHERE status = ? ORDER BY created_at DESC LIMIT 100').bind(status).all();
  return json({ items: results });
}
