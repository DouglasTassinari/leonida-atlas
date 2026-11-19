import { LIMITS, validateSubmission, validateImage, ipHash, hashExpiry, rateDecision, newId, json } from '../_lib/core.js';
import { classifyImage } from '../_lib/moderate.js';

async function turnstileOk(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true; // only enforced when the secret is configured
  if (!token || typeof token !== 'string') return false;
  try {
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET);
    form.append('response', token);
    if (ip) form.append('remoteip', ip);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    return (await r.json()).success === true;
  } catch { return false; }
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, code: 'generic' }, 500);
  const len = Number(request.headers.get('content-length') || 0);
  if (len > LIMITS.body) return json({ ok: false, code: 'big' }, 413);
  let body;
  try {
    const raw = await request.text();
    if (raw.length > LIMITS.body) return json({ ok: false, code: 'big' }, 413);
    body = JSON.parse(raw);
  } catch { return json({ ok: false, code: 'generic' }, 400); }

  const v = validateSubmission(body);
  if (!v.ok) return json({ ok: false, code: v.code }, 400);
  const img = validateImage(body.image);
  if (!img.ok) return json({ ok: false, code: img.code }, 400);

  const ip = request.headers.get('cf-connecting-ip') || '';
  if (!(await turnstileOk(env, body.turnstileToken, ip))) return json({ ok: false, code: 'captcha' }, 403);

  const now = Date.now();
  const hash = await ipHash(ip || 'unknown', now, env.IP_SALT || '');
  // retention: drop hashes older than 7 days (the posts themselves stay)
  await env.DB.batch([
    env.DB.prepare('UPDATE posts SET ip_hash = NULL WHERE ip_hash IS NOT NULL AND created_at < ?').bind(hashExpiry(now)),
    env.DB.prepare('DELETE FROM reports WHERE created_at < ?').bind(hashExpiry(now)),
  ]);
  const counts = await env.DB.prepare('SELECT SUM(created_at > ?) AS h, COUNT(*) AS d FROM posts WHERE ip_hash = ? AND created_at > ?').bind(now - 3600000, hash, now - 86400000).first();
  if (rateDecision(counts?.h || 0, counts?.d || 0)) return json({ ok: false, code: 'rate' }, 429);

  let status = 'pending', verdict = null, store = !img.none;
  if (!img.none) {
    const res = await classifyImage(env, img.bytes);
    verdict = JSON.stringify(res.verdict ? { ...res.verdict, risky: res.risky } : { error: res.error || 'failed', risky: true });
    if (res.risky) { status = 'blocked'; store = false; } // the image is never stored when flagged or when the AI fails
  }

  const id = newId();
  await env.DB.prepare(
    'INSERT INTO posts (id, created_at, category, title, note, youtube_id, image_key, image_mime, image_data, status, ai_verdict, report_count, lang, ip_hash) VALUES (?,?,?,?,?,?,?,?,?,?,?,0,?,?)'
  ).bind(id, now, v.value.category, v.value.title, v.value.note, v.value.youtube_id, store ? id : null, store ? img.mime : null, store ? img.b64 : null, status, verdict, v.value.lang, hash).run();

  // Same answer for pending and blocked: nothing is ever public without a human.
  return json({ ok: true, code: 'received' });
}
