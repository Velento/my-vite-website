/**
 * Cloudflare Worker that proxies form submissions to Telegram.
 *
 * The bot token + chat ID live as Worker secrets — they are NEVER shipped to
 * the browser. The site calls this Worker; the Worker calls Telegram.
 *
 * Deploy:
 *   wrangler deploy
 *
 * Set secrets (one-time):
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

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: 'Invalid JSON' }, 400, cors);
    }
    if (!body || typeof body !== 'object') {
      return jsonResponse({ ok: false, error: 'Invalid payload' }, 400, cors);
    }

    const { name, phone, promo } = body as Record<string, unknown>;
    if (typeof name !== 'string' || !NAME_REGEX.test(name.trim())) {
      return jsonResponse({ ok: false, error: 'Invalid name' }, 400, cors);
    }
    if (typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
      return jsonResponse({ ok: false, error: 'Invalid phone' }, 400, cors);
    }
    if (promo !== undefined && (typeof promo !== 'string' || promo.length > 30)) {
      return jsonResponse({ ok: false, error: 'Invalid promo' }, 400, cors);
    }

    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safePromo = typeof promo === 'string' && promo.trim() ? escapeHtml(promo.trim()) : '';

    const lines = [
      '🆕 <b>Nowa zapyt z LegalLine</b>',
      '',
      `👤 <b>Imię:</b> ${safeName}`,
      `📞 <b>Telefon:</b> <a href="tel:${safePhone}">${safePhone}</a>`,
    ];
    if (safePromo) lines.push(`🎁 <b>Promo:</b> ${safePromo}`);

    const tgRes = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: lines.join('\n'),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );

    if (!tgRes.ok) {
      // Don't leak Telegram's response body — could contain bot details.
      return jsonResponse({ ok: false, error: 'Upstream error' }, 502, cors);
    }

    return jsonResponse({ ok: true }, 200, cors);
  },
};
