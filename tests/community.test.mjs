import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSubmission, validateImage, sniffImage, parseYouTubeId, parseVerdict, verdictIsRisky, tokenOk, rateDecision, ipHash, hasLinkOrHtml, hasBadWord, isRich, hashExpiry } from '../functions/_lib/core.js';
import { onRequestPost as submit } from '../functions/api/submit.js';
import { onRequestGet as adminList } from '../functions/api/admin/list.js';

const good = { category: 'Secrets', title: 'Hidden cave', note: 'Behind the waterfall', consent: true, lang: 'pt-br' };
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]).toString('base64');

test('validation accepts a good post and normalizes lang', () => {
  const r = validateSubmission(good);
  assert.equal(r.ok, true);
  assert.equal(validateSubmission({ ...good, lang: 'xx' }).value.lang, 'en');
});
test('validation rejects: consent, title, note, links, html, offensive', () => {
  assert.equal(validateSubmission({ ...good, consent: false }).code, 'consent');
  assert.equal(validateSubmission({ ...good, consent: 'true' }).code, 'consent');
  assert.equal(validateSubmission({ ...good, title: '' }).code, 'title');
  assert.equal(validateSubmission({ ...good, title: 'x'.repeat(81) }).code, 'title');
  assert.equal(validateSubmission({ ...good, note: 'x'.repeat(281) }).code, 'note');
  assert.equal(validateSubmission({ ...good, note: 'see https://evil.site' }).code, 'text');
  assert.equal(validateSubmission({ ...good, note: 'visit www.foo' }).code, 'text');
  assert.equal(validateSubmission({ ...good, note: 'go to foo.com now' }).code, 'text');
  assert.equal(validateSubmission({ ...good, title: '<b>hi</b>' }).code, 'text');
  assert.equal(validateSubmission({ ...good, note: 'this is shit' }).code, 'blocked');
  assert.equal(validateSubmission({ ...good, note: 'que porra e essa' }).code, 'blocked');
  assert.equal(validateSubmission({ ...good, category: 'Hack' }).code, 'generic');
});
test('normal sentences are not flagged as links', () => {
  assert.equal(hasLinkOrHtml('I found it. It was near the beach, wow.'), false);
  assert.equal(hasBadWord('Class assassin in the passage'), false);
});
test('youtube ids', () => {
  assert.equal(parseYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(parseYouTubeId('https://youtu.be/dQw4w9WgXcQ?t=3'), 'dQw4w9WgXcQ');
  assert.equal(parseYouTubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(parseYouTubeId('https://evil.com/watch?v=dQw4w9WgXcQ'), null);
  assert.equal(parseYouTubeId('https://youtube.com.evil.com/watch?v=dQw4w9WgXcQ'), null);
  assert.equal(parseYouTubeId('javascript:alert(1)'), null);
  assert.equal(validateSubmission({ ...good, youtube: 'nope' }).code, 'youtube');
});
test('magic bytes and image validation', () => {
  assert.equal(sniffImage(Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0])), 'image/jpeg');
  assert.equal(sniffImage(Buffer.from('RIFF\0\0\0\0WEBPVP8 ')), 'image/webp');
  assert.equal(sniffImage(Buffer.from('GIF89a......')), null);
  assert.equal(validateImage(PNG).mime, 'image/png');
  assert.equal(validateImage('data:image/png;base64,' + PNG).mime, 'image/png');
  assert.equal(validateImage(Buffer.from('<svg xmlns=...>').toString('base64')).code, 'image');
  assert.equal(validateImage('not base64!!').code, 'image');
  assert.equal(validateImage(Buffer.concat([Buffer.from([0xff, 0xd8, 0xff]), Buffer.alloc(700 * 1024)]).toString('base64')).code, 'big');
  assert.equal(validateImage(undefined).none, true);
});
test('AI verdict parsing fails closed', () => {
  const ok = parseVerdict('Here: {"adult_explicit":false,"violence_gore":false,"minors":false,"personal_data":false,"game_screenshot_or_fanart":true}');
  assert.equal(verdictIsRisky(ok), false);
  assert.equal(verdictIsRisky(parseVerdict('{"adult_explicit":true,"violence_gore":false,"minors":false,"personal_data":false}')), true);
  assert.equal(parseVerdict('I cannot tell'), null);
  assert.equal(parseVerdict('{"adult_explicit":false}'), null);
  assert.equal(verdictIsRisky(null), true);
});
test('rate limit decision and hash', async () => {
  assert.equal(rateDecision(2, 9), false);
  assert.equal(rateDecision(3, 3), true);
  assert.equal(rateDecision(0, 10), true);
  const d1 = new Date('2026-11-19T10:00:00Z').getTime();
  const a = await ipHash('1.2.3.4', d1, 's'), b = await ipHash('1.2.3.4', d1 + 3600000, 's'), c = await ipHash('1.2.3.4', d1 + 86400000, 's');
  assert.equal(a, b); assert.notEqual(a, c); assert.match(a, /^[a-f0-9]{64}$/); assert.ok(!a.includes('1.2.3.4'));
  assert.equal(hashExpiry(8 * 86400000), 86400000);
});
test('token comparison', async () => {
  assert.equal(await tokenOk('Bearer supersecret1', 'supersecret1'), true);
  assert.equal(await tokenOk('Bearer supersecret2', 'supersecret1'), false);
  assert.equal(await tokenOk('supersecret1', 'supersecret1'), false);
  assert.equal(await tokenOk('Bearer ', ''), false);
  assert.equal(await tokenOk('Bearer x', undefined), false);
  assert.equal(await tokenOk(null, 'supersecret1'), false);
});
test('rich vs thin', () => {
  assert.equal(isRich({ note: 'short', image_key: null }), false);
  assert.equal(isRich({ note: 'x'.repeat(60) }), true);
  assert.equal(isRich({ note: '', image_key: 'a' }), true);
});

// ---- handler-level tests with a fake D1 / AI ----
function fakeDb(counts = { h: 0, d: 0 }) {
  const db = { inserts: [], stmts: [] };
  db.prepare = (sql) => ({ bind: (...a) => ({
    run: async () => { if (/INSERT INTO posts/.test(sql)) db.inserts.push(a); return { meta: { changes: 1 } }; },
    first: async () => counts,
    all: async () => ({ results: [] }),
  }) });
  db.batch = async () => [];
  return db;
}
const req = (body, headers = {}) => new Request('https://x.test/api/submit', { method: 'POST', body: JSON.stringify(body), headers: { 'cf-connecting-ip': '9.9.9.9', ...headers } });
const clean = '{"adult_explicit":false,"violence_gore":false,"minors":false,"personal_data":false,"game_screenshot_or_fanart":true}';

test('submit: text only -> pending, stores no IP, no AI call', async () => {
  const db = fakeDb(); let ai = 0;
  const res = await submit({ request: req(good), env: { DB: db, AI: { run: async () => { ai++; } } } });
  assert.equal(res.status, 200);
  assert.equal(ai, 0);
  const row = db.inserts[0];
  assert.ok(row.includes('pending'));
  assert.ok(!row.some((v) => typeof v === 'string' && v.includes('9.9.9.9')));
});
test('submit: clean image -> pending and stored', async () => {
  const db = fakeDb();
  const res = await submit({ request: req({ ...good, image: PNG }), env: { DB: db, AI: { run: async () => ({ description: clean }) } } });
  assert.equal(res.status, 200);
  assert.ok(db.inserts[0].includes('pending'));
  assert.ok(db.inserts[0].includes(PNG));
});
test('submit: risky image or AI failure -> blocked and image NOT stored', async () => {
  for (const run of [async () => ({ description: clean.replace('"minors":false', '"minors":true') }), async () => { throw new Error('boom'); }, async () => ({ description: 'nonsense' })]) {
    const db = fakeDb();
    const res = await submit({ request: req({ ...good, image: PNG }), env: { DB: db, AI: { run } } });
    assert.equal(res.status, 200);
    assert.ok(db.inserts[0].includes('blocked'));
    assert.ok(!db.inserts[0].includes(PNG));
  }
});
test('submit: rate limit, consent and turnstile', async () => {
  assert.equal((await submit({ request: req(good), env: { DB: fakeDb({ h: 3, d: 3 }) } })).status, 429);
  assert.equal((await submit({ request: req({ ...good, consent: false }), env: { DB: fakeDb() } })).status, 400);
  const env = { DB: fakeDb(), TURNSTILE_SECRET: 'x' };
  assert.equal((await submit({ request: req(good), env })).status, 403); // token required only when the secret exists
});
test('admin endpoints answer 401 without a valid token', async () => {
  const mk = (h) => new Request('https://x.test/api/admin/list', { headers: h });
  assert.equal((await adminList({ request: mk({}), env: { ADMIN_TOKEN: 'supersecret1' } })).status, 401);
  assert.equal((await adminList({ request: mk({ authorization: 'Bearer wrongwrong1' }), env: { ADMIN_TOKEN: 'supersecret1' } })).status, 401);
  assert.equal((await adminList({ request: mk({ authorization: 'Bearer supersecret1' }), env: {} })).status, 401);
  assert.equal((await adminList({ request: mk({ authorization: 'Bearer supersecret1' }), env: { ADMIN_TOKEN: 'supersecret1', DB: fakeDb() } })).status, 200);
});
