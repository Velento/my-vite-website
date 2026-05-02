/**
 * Cloudflare Worker that proxies form submissions to Telegram.
 *
 * Two paths:
 *   1. Content-Type: application/json   → text-only lead, sendMessage
 *   2. Content-Type: multipart/form-data → lead with attached document,
 *      forwarded as multipart to Telegram's sendDocument endpoint.
 *
 * Bot token + chat ID live as Worker secrets — they are NEVER shipped to
 * the browser.
 *
 * Deploy: wrangler deploy
 * Set secrets:
 *   wrangler secret put TELEGRAM_BOT_TOKEN
 *   wrangler secret put TELEGRAM_CHAT_ID
 */

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  /** Comma-separated list of allowed Origins. Optional — defaults to legalline.pl */
  ALLOWED_ORIGINS?: string;
}

const DEFAULT_ALLOWED = ['https://legalline.pl', 'https://www.legalline.pl'];

const NAME_REGEX = /^[A-Za-zА-Яа-яЁёЄєІіЇїҐґ\s'-]{2,50}$/u;
const PHONE_REGEX = /^\+?[\d\s\-()]{9,20}$/;

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

function corsHeaders(origin: string | null, allowed: string[]): HeadersInit {
  const allow = origin && allowed.includes(origin) ? origin : allowed[0]!;
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function jsonResponse(data: unknown, status: number, extraHeaders: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

type Lead = { name: string; phone: string; promo?: string };

function validateLead(lead: Partial<Lead>): { ok: true; lead: Lead } | { ok: false; error: string } {
  const { name, phone, promo } = lead;
  if (typeof name !== 'string' || !NAME_REGEX.test(name.trim())) {
    return { ok: false, error: 'Invalid name' };
  }
  if (typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
    return { ok: false, error: 'Invalid phone' };
  }
  if (promo !== undefined && (typeof promo !== 'string' || promo.length > 30)) {
    return { ok: false, error: 'Invalid promo' };
  }
  return { ok: true, lead: { name: name.trim(), phone: phone.trim(), promo: promo?.trim() } };
}

function buildCaption(lead: Lead): string {
  const safeName = escapeHtml(lead.name);
  const safePhone = escapeHtml(lead.phone);
  const safePromo = lead.promo ? escapeHtml(lead.promo) : '';

  const lines = [
    '🆕 <b>Nowa zapyt z LegalLine</b>',
    '',
    `👤 <b>Imię:</b> ${safeName}`,
    `📞 <b>Telefon:</b> <a href="tel:${safePhone}">${safePhone}</a>`,
  ];
  if (safePromo) lines.push(`🎁 <b>Promo:</b> ${safePromo}`);
  return lines.join('\n');
}

async function sendMessage(env: Env, text: string): Promise<Response> {
  return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
}

async function sendDocument(env: Env, caption: string, file: File): Promise<Response> {
  const tgForm = new FormData();
  tgForm.append('chat_id', env.TELEGRAM_CHAT_ID);
  tgForm.append('caption', caption);
  tgForm.append('parse_mode', 'HTML');
  tgForm.append('document', file, file.name);
  return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`, {
    method: 'POST',
    body: tgForm,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const allowed = env.ALLOWED_ORIGINS
      ? env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
      : DEFAULT_ALLOWED;
    const cors = corsHeaders(origin, allowed);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return jsonResponse({ ok: false, error: 'Method not allowed' }, 405, cors);
    }
    if (origin && !allowed.includes(origin)) {
      return jsonResponse({ ok: false, error: 'Forbidden origin' }, 403, cors);
    }

    const contentType = request.headers.get('Content-Type') || '';
    let lead: Lead;
    let file: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      let formData: FormData;
      try {
        formData = await request.formData();
      } catch {
        return jsonResponse({ ok: false, error: 'Invalid multipart' }, 400, cors);
      }

      const candidate = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        promo: formData.get('promo') ?? undefined,
      };
      // FormData entries can be File or string — coerce to string for validation.
      const validated = validateLead({
        name: typeof candidate.name === 'string' ? candidate.name : undefined,
        phone: typeof candidate.phone === 'string' ? candidate.phone : undefined,
        promo: typeof candidate.promo === 'string' ? candidate.promo : undefined,
      });
      if (!validated.ok) {
        return jsonResponse({ ok: false, error: validated.error }, 400, cors);
      }
      lead = validated.lead;

      const fileEntry = formData.get('file');
      // Duck-type instead of `instanceof File` — the global File type is
      // available in Workers but tsc with @cloudflare/workers-types isn't
      // happy with `instanceof File` in strict mode.
      if (
        fileEntry !== null &&
        typeof fileEntry !== 'string' &&
        typeof fileEntry === 'object' &&
        'size' in fileEntry &&
        'type' in fileEntry &&
        'name' in fileEntry
      ) {
        const f = fileEntry as File;
        if (f.size > 0) {
          if (f.size > MAX_FILE_BYTES) {
            return jsonResponse({ ok: false, error: 'File too large (max 10 MB)' }, 413, cors);
          }
          if (!ALLOWED_FILE_TYPES.has(f.type)) {
            return jsonResponse({ ok: false, error: 'File type not allowed' }, 415, cors);
          }
          file = f;
        }
      }
    } else {
      // application/json path
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ ok: false, error: 'Invalid JSON' }, 400, cors);
      }
      if (!body || typeof body !== 'object') {
        return jsonResponse({ ok: false, error: 'Invalid payload' }, 400, cors);
      }
      const validated = validateLead(body as Partial<Lead>);
      if (!validated.ok) {
        return jsonResponse({ ok: false, error: validated.error }, 400, cors);
      }
      lead = validated.lead;
    }

    const caption = buildCaption(lead);
    const tgRes = file ? await sendDocument(env, caption, file) : await sendMessage(env, caption);

    if (!tgRes.ok) {
      return jsonResponse({ ok: false, error: 'Upstream error' }, 502, cors);
    }
    return jsonResponse({ ok: true }, 200, cors);
  },
};
