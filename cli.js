'use strict';
// weavin-secret-egress-demo — prove a user-provided secret is injected, then reach a declared host.
// Zero dependencies (Node 22 built-in global fetch).
// Required env var (user secret): DEMO_API_KEY
// Egress host: example.com   (IANA reserved, always-up, fast — reliable for a smoke test)
//
// SECURITY: the secret is validated LOCALLY (presence only) and is NEVER transmitted off the
// sandbox — the network request to the declared host is UNauthenticated. This proves SP5b-4's
// mechanism (secret reaches the run env + egress to the consented host) without sending any
// secret value to a third party.
const TOKEN = process.env.DEMO_API_KEY;
(async () => {
  if (!TOKEN || TOKEN.length < 8) {
    process.stdout.write(JSON.stringify({ ok: false, error: 'DEMO_API_KEY missing or too short' }) + '\n');
    process.exit(1);
  }
  try {
    // Unauthenticated egress to the single declared host. No secret is sent.
    const res = await fetch('https://example.com/', { signal: AbortSignal.timeout(30000) });
    process.stdout.write(JSON.stringify({ ok: res.ok, status: res.status, secretPresent: true }) + '\n');
    process.exit(res.ok ? 0 : 1);
  } catch (err) {
    process.stdout.write(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }) + '\n');
    process.exit(1);
  }
})();
