// lib/ratelimit.ts
// Simple in-memory rate limit keyed by IP and email.
// Not for clustered environments—good enough for MVP/local.
type Key = string;

interface Bucket {
  count: number;
  resetAt: number; // epoch ms
}

const WINDOW_MS = 60_000; // 1 minute
const MAX_PER_WINDOW = 20; // per IP
const MAX_PER_EMAIL_WINDOW = 5; // per email

const ipBuckets = new Map<Key, Bucket>();
const emailBuckets = new Map<Key, Bucket>();

function hit(map: Map<Key, Bucket>, key: Key, max: number) {
  const now = Date.now();
  let b = map.get(key);
  if (!b || b.resetAt < now) {
    b = { count: 0, resetAt: now + WINDOW_MS };
    map.set(key, b);
  }
  b.count += 1;
  const remaining = Math.max(0, max - b.count);
  const ok = b.count <= max;
  return { ok, remaining, resetMs: Math.max(0, b.resetAt - now) };
}

export function checkIp(ip: string) {
  return hit(ipBuckets, ip || "unknown", MAX_PER_WINDOW);
}

export function checkEmail(email: string) {
  return hit(emailBuckets, (email || "unknown").toLowerCase(), MAX_PER_EMAIL_WINDOW);
}
