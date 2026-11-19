import { b64ToBytes } from '../../_lib/core.js';
import { requireAdmin } from '../../_lib/admin.js';

// GET /api/admin/image?id=...  serves the stored image in any status (admin only)
export async function onRequestGet({ request, env }) {
  const denied = await requireAdmin(request, env);
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get('id') || '';
  const r = /^[a-f0-9]{16}$/.test(id) ? await env.DB.prepare('SELECT image_mime, image_data FROM posts WHERE id = ? AND image_data IS NOT NULL').bind(id).first() : null;
  if (!r) return new Response('Not found', { status: 404 });
  return new Response(b64ToBytes(r.image_data), { headers: { 'content-type': r.image_mime, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
}
