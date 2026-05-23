/**
 * Cloudflare Worker tests.
 *
 * Runs in Vitest's default (jsdom) environment; the global setup stubs `fetch`.
 * We exercise the worker's `fetch` handler end to end with an in-memory KV mock
 * and a hashed-token report auth, covering the lead pipeline (validation,
 * honeypot, captcha, rate limit), click tracking, and the report/export/
 * dashboard surfaces.
 */

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { webcrypto } from 'node:crypto';
import worker from './index';

// jsdom ships a partial `crypto` without `subtle`/`randomUUID`; the worker
// needs both. Swap in Node's full Web Crypto when the stub is incomplete.
beforeAll(() => {
  if (!globalThis.crypto?.subtle) {
    Object.defineProperty(globalThis, 'crypto', { value: webcrypto, configurable: true });
  }
});

const ORIGIN = 'https://legalline.pl';
const REPORT_TOKEN = 'super-secret-report-token';
const TODAY = new Date().toISOString().slice(0, 10);

type KVRecord = { value: string; expiration?: number };

/** Minimal in-memory KVNamespace covering get/put/list/delete used by the worker. */
function makeKV() {
  const store = new Map<string, KVRecord>();
  return {
    _store: store,
    async get(key: string) {
      return store.get(key)?.value ?? null;
    },
    async put(key: string, value: string) {
      store.set(key, { value });
    },
    async delete(key: string) {
      store.delete(key);
    },
    async list({ prefix = '', limit = 1000 }: { prefix?: string; cursor?: string; limit?: number } = {}) {
      const keys = [...store.keys()]
        .filter((k) => k.startsWith(prefix))
        .sort()
        .slice(0, limit)
        .map((name) => ({ name }));
      return { keys, list_complete: true, cursor: '' };
    },
  };
}

function makeEnv(overrides: Record<string, unknown> = {}) {
  return {
    TELEGRAM_BOT_TOKEN: 'test-bot-token',
    TELEGRAM_CHAT_ID: '123456789',
    REPORT_TOKEN,
    INTERACTION_LOG: makeKV(),
    ...overrides,
  } as never;
}

function jsonRequest(path: string, body: unknown, headers: Record<string, string> = {}) {
  return new Request(`https://proxy.example${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: ORIGIN,
      'User-Agent': 'Mozilla/5.0 (Test Runner)',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function getRequest(path: string, headers: Record<string, string> = {}) {
  return new Request(`https://proxy.example${path}`, {
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0 (Test Runner)', ...headers },
  });
}

/** Default fetch mock: every upstream call (Telegram, hCaptcha) succeeds. */
function mockUpstreamOk() {
  vi.mocked(fetch).mockImplementation(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes('hcaptcha')) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ ok: true, result: {} }), { status: 200 });
  });
}

const VALID_LEAD = { name: 'Anna Kowalska', phone: '+48123456789' };

beforeEach(() => {
  vi.mocked(fetch).mockReset();
  mockUpstreamOk();
});

describe('routing & CORS', () => {
  it('answers OPTIONS preflight with 204 and echoes the allowed origin', async () => {
    const res = await worker.fetch(
      new Request('https://proxy.example/', { method: 'OPTIONS', headers: { Origin: ORIGIN } }),
      makeEnv()
    );
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
  });

  it('rejects a disallowed origin on public routes', async () => {
    const res = await worker.fetch(
      jsonRequest('/', VALID_LEAD, { Origin: 'https://evil.example' }),
      makeEnv()
    );
    expect(res.status).toBe(403);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns 404 for an unknown route', async () => {
    const res = await worker.fetch(jsonRequest('/nope', {}), makeEnv());
    expect(res.status).toBe(404);
  });
});

describe('POST / (lead submission)', () => {
  it('blocks bot user-agents', async () => {
    const res = await worker.fetch(
      jsonRequest('/', VALID_LEAD, { 'User-Agent': 'python-requests bot crawler' }),
      makeEnv()
    );
    expect(res.status).toBe(403);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('silently accepts but drops honeypot submissions', async () => {
    const res = await worker.fetch(
      jsonRequest('/', { ...VALID_LEAD, website: 'http://spam.example' }),
      makeEnv()
    );
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(fetch).not.toHaveBeenCalled(); // never forwarded to Telegram
  });

  it('rejects an invalid name', async () => {
    const res = await worker.fetch(jsonRequest('/', { name: 'A', phone: '+48123456789' }), makeEnv());
    expect(res.status).toBe(400);
  });

  it('rejects an invalid phone', async () => {
    const res = await worker.fetch(jsonRequest('/', { name: 'Anna', phone: '12' }), makeEnv());
    expect(res.status).toBe(400);
  });

  it('forwards a valid lead to Telegram and logs it to KV', async () => {
    const env = makeEnv();
    const res = await worker.fetch(jsonRequest('/', VALID_LEAD), env);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.id).toBeTruthy();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(String(vi.mocked(fetch).mock.calls[0]![0])).toContain('sendMessage');
    expect(env.INTERACTION_LOG._store.size).toBe(1);
  });

  it('accepts a multipart submission without a file', async () => {
    const fd = new FormData();
    fd.append('name', VALID_LEAD.name);
    fd.append('phone', VALID_LEAD.phone);
    const req = new Request('https://proxy.example/', {
      method: 'POST',
      headers: { Origin: ORIGIN, 'User-Agent': 'Mozilla/5.0' },
      body: fd,
    });
    const res = await worker.fetch(req, makeEnv());
    expect(res.status).toBe(200);
  });

  it('returns 429 when the form rate limiter trips', async () => {
    const env = makeEnv({ FORM_RATE_LIMITER: { limit: async () => ({ success: false }) } });
    const res = await worker.fetch(jsonRequest('/', VALID_LEAD), env);
    expect(res.status).toBe(429);
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('hCaptcha gate', () => {
  it('rejects when the secret is set but no token is supplied', async () => {
    const env = makeEnv({ HCAPTCHA_SECRET: 'hc-secret' });
    const res = await worker.fetch(jsonRequest('/', VALID_LEAD), env);
    expect(res.status).toBe(403);
  });

  it('passes when siteverify succeeds', async () => {
    const env = makeEnv({ HCAPTCHA_SECRET: 'hc-secret' });
    const res = await worker.fetch(jsonRequest('/', { ...VALID_LEAD, captchaToken: 'tok' }), env);
    expect(res.status).toBe(200);
  });

  it('rejects when siteverify fails', async () => {
    vi.mocked(fetch).mockImplementation(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('hcaptcha')) {
        return new Response(JSON.stringify({ success: false }), { status: 200 });
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    const env = makeEnv({ HCAPTCHA_SECRET: 'hc-secret' });
    const res = await worker.fetch(jsonRequest('/', { ...VALID_LEAD, captchaToken: 'bad' }), env);
    expect(res.status).toBe(403);
  });
});

describe('POST /track', () => {
  it('logs a valid contact-click channel and returns 204', async () => {
    const env = makeEnv();
    const res = await worker.fetch(jsonRequest('/track', { channel: 'phone' }), env);
    expect(res.status).toBe(204);
    expect(env.INTERACTION_LOG._store.size).toBe(1);
  });

  it('rejects an unknown channel', async () => {
    const res = await worker.fetch(jsonRequest('/track', { channel: 'carrier-pigeon' }), makeEnv());
    expect(res.status).toBe(400);
  });

  it('silently ignores bot user-agents without logging', async () => {
    const env = makeEnv();
    const res = await worker.fetch(
      jsonRequest('/track', { channel: 'phone' }, { 'User-Agent': 'evil scraper bot' }),
      env
    );
    expect(res.status).toBe(204);
    expect(env.INTERACTION_LOG._store.size).toBe(0);
  });
});

describe('GET /report & /export (token-protected)', () => {
  it('rejects a missing token', async () => {
    const res = await worker.fetch(getRequest(`/report?from=${TODAY}&to=${TODAY}`), makeEnv());
    expect(res.status).toBe(401);
  });

  it('rejects a wrong token', async () => {
    const res = await worker.fetch(
      getRequest(`/report?from=${TODAY}&to=${TODAY}&token=wrong`),
      makeEnv()
    );
    expect(res.status).toBe(401);
  });

  it('rejects a malformed date range', async () => {
    const res = await worker.fetch(
      getRequest(`/report?from=2026&to=2026&token=${REPORT_TOKEN}`),
      makeEnv()
    );
    expect(res.status).toBe(400);
  });

  it('summarises logged events for the range', async () => {
    const env = makeEnv();
    await worker.fetch(jsonRequest('/', VALID_LEAD), env); // form_submit
    await worker.fetch(jsonRequest('/track', { channel: 'whatsapp' }), env); // contact_click

    const res = await worker.fetch(
      getRequest(`/report?from=${TODAY}&to=${TODAY}&token=${REPORT_TOKEN}`),
      env
    );
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.report.total_raw).toBe(2);
    expect(data.report.by_type.form_submit).toBe(1);
    expect(data.report.by_channel.whatsapp).toBe(1);
  });

  it('exports CSV with the right content type', async () => {
    const env = makeEnv();
    await worker.fetch(jsonRequest('/', VALID_LEAD), env);
    const res = await worker.fetch(
      getRequest(`/export?from=${TODAY}&to=${TODAY}&token=${REPORT_TOKEN}`),
      env
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/csv');
    const csv = await res.text();
    expect(csv.split('\n')[0]).toContain('id,ts,type,channel');
  });
});

describe('GET /dashboard', () => {
  it('returns a 401 HTML page without a token', async () => {
    const res = await worker.fetch(getRequest('/dashboard'), makeEnv());
    expect(res.status).toBe(401);
    expect(res.headers.get('Content-Type')).toContain('text/html');
  });

  it('renders the dashboard with a valid token', async () => {
    const res = await worker.fetch(getRequest(`/dashboard?token=${REPORT_TOKEN}`), makeEnv());
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });
});
