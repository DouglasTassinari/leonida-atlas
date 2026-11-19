import { tokenOk, json } from './core.js';

// Returns a 401 Response when the Bearer token does not match env.ADMIN_TOKEN, otherwise null.
export async function requireAdmin(request, env) {
  if (await tokenOk(request.headers.get('authorization'), env.ADMIN_TOKEN)) return null;
  return json({ error: 'unauthorized' }, 401, { 'www-authenticate': 'Bearer' });
}
