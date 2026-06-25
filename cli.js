'use strict';
// weavin-secret-egress-demo — call an auth-gated public API using a user-provided secret.
// Zero dependencies (Node 22 built-in global fetch).
// Required env var (user secret): DEMO_API_KEY  — sent as a Bearer token.
// Egress host: httpbin.org  (https://httpbin.org/bearer returns 200 only when a bearer is present).
const TOKEN = process.env.DEMO_API_KEY;
(async () => {
  try {
    const res = await fetch('https://httpbin.org/bearer', {
      headers: { Authorization: `Bearer ${TOKEN ?? ''}` },
      signal: AbortSignal.timeout(15000),
    });
    // Print ONLY the auth outcome + status — never the token (it would be echoed by httpbin otherwise).
    process.stdout.write(JSON.stringify({ ok: res.ok, status: res.status, authenticated: res.ok }) + '\n');
    process.exit(res.ok ? 0 : 1);
  } catch (err) {
    process.stdout.write(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }) + '\n');
    process.exit(1);
  }
})();
