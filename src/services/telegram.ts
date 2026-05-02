/**
 * Lead submission service.
 *
 * Two delivery modes:
 *
 *   1. **Worker proxy (recommended)** — set `VITE_FORM_PROXY_URL` to the
 *      deployed Cloudflare Worker URL (see `worker/index.ts`). The Worker
 *      holds the bot token + chat ID as server-side secrets and forwards
 *      validated payloads to Telegram. Nothing sensitive ships to the
 *      browser.
 *
 *   2. **Direct-to-Telegram (fallback)** — used only when the proxy URL is
 *      not configured. Reads `VITE_TELEGRAM_BOT_TOKEN` and
 *      `VITE_TELEGRAM_CHAT_ID` from import.meta.env. Token is visible in
 *      the bundle — fine for testing, replace with the proxy in prod.
 */

const TELEGRAM_API_BASE = 'https://api.telegram.org';

export type LeadPayload = {
  name: string;
  phone: string;
  promo?: string;
};

type ServiceResponse = {
  ok: boolean;
  description?: string;
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildMessage({ name, phone, promo }: LeadPayload): string {
  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safePromo = promo ? escapeHtml(promo) : '';
  const lines = [
    '🆕 <b>Nowa zapyt z LegalLine</b>',
    '',
    `👤 <b>Imię:</b> ${safeName}`,
    `📞 <b>Telefon:</b> <a href="tel:${safePhone}">${safePhone}</a>`,
  ];
  if (safePromo) lines.push(`🎁 <b>Promo:</b> ${safePromo}`);
  return lines.join('\n');
}

async function sendViaProxy(proxyUrl: string, payload: LeadPayload): Promise<ServiceResponse> {
  const response = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data: ServiceResponse | null = null;
  try {
    data = (await response.json()) as ServiceResponse;
  } catch {
    // proxy may have failed before encoding JSON — fall through
  }

  if (!response.ok || !data?.ok) {
    const description = data?.description || `HTTP ${response.status}`;
    throw new Error(`Form proxy ${response.status}: ${description}`);
  }
  return data;
}

async function sendDirect(payload: LeadPayload): Promise<ServiceResponse> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!token) {
    throw new Error('Missing VITE_TELEGRAM_BOT_TOKEN — set it in GitHub Secrets');
  }
  if (!chatId) {
    throw new Error('Missing VITE_TELEGRAM_CHAT_ID — set it in GitHub Secrets');
  }

  const url = `${TELEGRAM_API_BASE}/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage(payload),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  let data: ServiceResponse | null = null;
  try {
    data = (await response.json()) as ServiceResponse;
  } catch {
    // ignore — handled below
  }

  if (!response.ok || !data?.ok) {
    const description = data?.description || `HTTP ${response.status}`;
    throw new Error(`Telegram ${response.status}: ${description}`);
  }
  return data;
}

export async function sendLeadToTelegram(payload: LeadPayload): Promise<ServiceResponse> {
  const proxyUrl = import.meta.env.VITE_FORM_PROXY_URL;
  if (proxyUrl) {
    return sendViaProxy(proxyUrl, payload);
  }
  return sendDirect(payload);
}
