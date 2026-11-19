-- Leonida Atlas community wall. Images live in D1 as base64 (max 600 KB decoded).
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,          -- ms since epoch
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  youtube_id TEXT,
  image_key TEXT,                       -- = id when an image is stored, else NULL
  image_mime TEXT,
  image_data TEXT,                      -- base64
  status TEXT NOT NULL CHECK (status IN ('pending','approved','rejected','blocked')),
  ai_verdict TEXT,                      -- JSON text with the AI classification
  ai_score REAL,
  report_count INTEGER NOT NULL DEFAULT 0,
  lang TEXT NOT NULL DEFAULT 'en',
  ip_hash TEXT,                         -- SHA-256(ip + daily salt); nulled after 7 days
  approved_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_posts_status_approved ON posts(status, approved_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_iphash ON posts(ip_hash, created_at);

CREATE TABLE IF NOT EXISTS reports (
  post_id TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (post_id, ip_hash)
);
