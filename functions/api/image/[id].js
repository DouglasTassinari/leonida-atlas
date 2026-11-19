import { b64ToBytes } from '../../_lib/core.js';

export async function onRequestGet({ params, env }) {
  const id = String(params.id || '').replace(/\.\w+$/, '');
  const nf = () => new Response('Not found', { status: 404, headers: { 'cache-control': 'no-store' } });
  if (!env.DB || !/^[a-f0-9]{16}$/.test(id)) return nf();
  const r = await env.DB.prepare("SELECT image_mime, image_data FROM posts WHERE id = ? AND status = 'approved' AND image_data IS NOT NULL").bind(id).first();
  if (!r || !['image/jpeg', 'image/png', 'image/webp'].includes(r.image_mime)) return nf();
  return new Response(b64ToBytes(r.image_data), {
    headers: { 'content-type': r.image_mime, 'cache-control': 'public, max-age=3600', 'x-content-type-options': 'nosniff', 'content-security-policy': "default-src 'none'; sandbox" },
  });
}
