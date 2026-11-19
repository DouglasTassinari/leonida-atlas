import { parseVerdict, verdictIsRisky } from './core.js';

// Workers AI vision model used for image moderation. Change here if you prefer another one
// (e.g. '@cf/meta/llama-3.2-11b-vision-instruct', which needs a one-time license acceptance).
export const VISION_MODEL = '@cf/llava-hf/llava-1.5-7b-hf';
export const AI_TIMEOUT_MS = 20000;

const PROMPT = 'You are a strict image safety classifier. Look at the image and answer ONLY with one JSON object, no other text, with exactly these boolean keys: {"adult_explicit": true if nudity or sexual content, "violence_gore": true if graphic violence, blood or gore, "minors": true if a real child or minor appears, "personal_data": true if it shows readable personal data (faces of real people, IDs, phone numbers, addresses, screens with private info), "game_screenshot_or_fanart": true if it looks like a video game screenshot or fan art}.';

// Returns { risky:boolean, verdict:object|null, error?:string }. Fails closed: any problem => risky.
export async function classifyImage(env, bytes) {
  if (!env.AI) return { risky: true, verdict: null, error: 'no_ai_binding' };
  try {
    const run = env.AI.run(VISION_MODEL, { image: [...bytes], prompt: PROMPT, max_tokens: 200 });
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), AI_TIMEOUT_MS));
    const res = await Promise.race([run, timeout]);
    const text = typeof res === 'string' ? res : res?.description ?? res?.response ?? '';
    const verdict = parseVerdict(text);
    if (!verdict) return { risky: true, verdict: null, error: 'unparsable' };
    return { risky: verdictIsRisky(verdict), verdict };
  } catch (e) {
    return { risky: true, verdict: null, error: String(e?.message || e).slice(0, 80) };
  }
}
