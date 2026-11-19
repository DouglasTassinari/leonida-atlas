// Pure helpers shared by the Pages Functions (no Cloudflare APIs here, so they can be unit-tested with node --test).

export const CATEGORIES = ['Locations', 'Characters', 'Vehicles', 'Activities', 'Secrets'];
export const LOCALES = ['en', 'fr', 'de', 'it', 'ko', 'pl', 'pt-br', 'ru', 'zh-hans', 'zh-hant', 'es-mx', 'es-es'];
export const LIMITS = { title: 80, note: 280, image: 600 * 1024, body: 1024 * 1024, perHour: 3, perDay: 10, reportsToHide: 3, hashDays: 7 };

// ---------- text validation ----------
const LINK_RE = /(https?:|ftp:|www\.|:\/\/|\b[a-z0-9-]{2,}\.(com|net|org|io|br|ru|gg|tv|xyz|info|ly|app|dev|link|site|online|shop|store|club|top|cc|cn)\b)/i;
const HTML_RE = /[<>]|&#?\w+;/;
// Short EN/PT list; matched on lowercase, accent-stripped text at word starts. Extend as needed.
const BAD_WORDS = ['fuck', 'shit', 'bitch', 'cunt', 'nigger', 'nigga', 'faggot', 'retard', 'whore', 'slut', 'kys', 'kill yourself', 'porra', 'caralho', 'buceta', 'viado', 'arrombado', 'filho da puta', 'vai se foder', 'puta que'];

const LEET = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', $: 's', '@': 'a' };
export function normalize(s) {
  return String(s).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[01345$@]/g, (c) => LEET[c]);
}
export const hasLinkOrHtml = (s) => HTML_RE.test(s) || LINK_RE.test(s);
export function hasBadWord(s) {
  const n = ' ' + normalize(s).replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
  return BAD_WORDS.some((w) => n.includes(' ' + w));
}
// control chars (except \n) are stripped; whitespace collapsed
export function clean(s) {
  return String(s ?? '').replace(/[\u0000-\u0009\u000b-\u001f\u007f​-‏‪-‮⁦-⁩]/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

export function parseYouTubeId(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  let u;
  try { u = new URL(/^https?:\/\//i.test(s) ? s : 'https://' + s); } catch { return null; }
  const host = u.hostname.replace(/^www\.|^m\./, '');
  let id = null;
  if (host === 'youtu.be') id = u.pathname.split('/')[1];
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts[0] === 'watch') id = u.searchParams.get('v');
    else if (['embed', 'shorts', 'live', 'v'].includes(parts[0])) id = parts[1];
  }
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

// Returns { ok:true, value } or { ok:false, code }. Codes match the client messages.
export function validateSubmission(body) {
  if (!body || typeof body !== 'object') return { ok: false, code: 'generic' };
  if (body.consent !== true) return { ok: false, code: 'consent' };
  if (!CATEGORIES.includes(body.category)) return { ok: false, code: 'generic' };
  const title = clean(body.title).replace(/\n/g, ' ');
  const note = clean(body.note);
  if (!title || [...title].length > LIMITS.title) return { ok: false, code: 'title' };
  if ([...note].length > LIMITS.note) return { ok: false, code: 'note' };
  if (hasLinkOrHtml(title) || hasLinkOrHtml(note)) return { ok: false, code: 'text' };
  if (hasBadWord(title) || hasBadWord(note)) return { ok: false, code: 'blocked' };
  let youtube_id = null;
  if (body.youtube) {
    youtube_id = parseYouTubeId(body.youtube);
    if (!youtube_id) return { ok: false, code: 'youtube' };
  }
  const lang = LOCALES.includes(body.lang) ? body.lang : 'en';
  return { ok: true, value: { category: body.category, title, note, youtube_id, lang } };
}

// ---------- image ----------
export function sniffImage(b) {
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return 'image/png';
  if (b.length > 12 && b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'image/webp';
  return null;
}
export function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
// Accepts raw base64 (a data: prefix is tolerated). Returns { ok, bytes, mime, b64 } or { ok:false, code }.
export function validateImage(input) {
  if (input === undefined || input === null || input === '') return { ok: true, none: true };
  if (typeof input !== 'string') return { ok: false, code: 'image' };
  const b64 = input.replace(/^data:[^,]*,/, '');
  if (b64.length > Math.ceil((LIMITS.image * 4) / 3) + 8) return { ok: false, code: 'big' };
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(b64)) return { ok: false, code: 'image' };
  let bytes;
  try { bytes = b64ToBytes(b64); } catch { return { ok: false, code: 'image' }; }
  if (bytes.length > LIMITS.image) return { ok: false, code: 'big' };
  const mime = sniffImage(bytes);
  if (!mime) return { ok: false, code: 'image' };
  return { ok: true, bytes, mime, b64 };
}

// ---------- AI verdict ----------
const RISKS = ['adult_explicit', 'violence_gore', 'minors', 'personal_data'];
export function parseVerdict(text) {
  if (typeof text !== 'string') return null;
  const m = text.match(/\{[\s\S]*?\}/);
  if (!m) return null;
  let o;
  try { o = JSON.parse(m[0]); } catch { return null; }
  if (!o || typeof o !== 'object') return null;
  const v = {};
  for (const k of RISKS) {
    if (typeof o[k] !== 'boolean') return null;
    v[k] = o[k];
  }
  v.game_screenshot_or_fanart = o.game_screenshot_or_fanart === true;
  return v;
}
export const verdictIsRisky = (v) => !v || RISKS.some((k) => v[k]);

// ---------- rate limit / hashing ----------
export async function sha256Hex(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
export function dailySalt(now = Date.now(), secret = '') {
  return new Date(now).toISOString().slice(0, 10) + ':' + secret;
}
export const ipHash = (ip, now, secret) => sha256Hex(`${ip}|${dailySalt(now, secret)}`);
export function rateDecision(countLastHour, countLastDay) {
  return countLastHour >= LIMITS.perHour || countLastDay >= LIMITS.perDay;
}
export const hashExpiry = (now = Date.now()) => now - LIMITS.hashDays * 86400000;

// ---------- auth ----------
export async function tokenOk(header, secret) {
  if (!secret || typeof secret !== 'string' || secret.length < 8) return false;
  const m = /^Bearer (.+)$/.exec(header || '');
  if (!m) return false;
  // compare digests so length differences do not leak and the loop is constant-time
  const [a, b] = await Promise.all([sha256Hex(m[1]), sha256Hex(secret)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ---------- misc ----------
export const isRich = (p) => !!p && (!!p.image_key || [...(p.note || '')].length >= 60);
export const newId = () => [...crypto.getRandomValues(new Uint8Array(8))].map((x) => x.toString(16).padStart(2, '0')).join('');
export const json = (obj, status = 200, headers = {}) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...headers } });
export const publicPost = (r) => ({ id: r.id, category: r.category, title: r.title, note: r.note, youtube_id: r.youtube_id || null, has_image: !!r.image_key, lang: r.lang, at: r.approved_at || r.created_at });
export const xmlEscape = (s) => String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
