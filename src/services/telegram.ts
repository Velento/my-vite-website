/**
 * Lead submission service.
 *
 * Two delivery modes:
 *
 *   1. **Worker proxy (recommended)** — set `VITE_FORM_PROXY_URL` to the
 *      deployed Cloudflare Worker URL. The Worker holds the bot token + chat
 *      ID as server-side secrets. Supports JSON (text-only) AND multipart
 *      (file attachment) submissions.
 *
 *   2. **Direct-to-Telegram (fallback)** — used when the proxy URL is not
 *      configured. JSON-only, no file uploads (Telegram's sendDocument needs
 *      multipart and the bot token, both of which we don't want in the client).
 */

const TELEGRAM_API_BASE = 'https://api.telegram.org';

// Hardcoded fallback for the bot token + chat ID.
// Owner explicitly asked to bake them into the bundle; security trade-off
// (anyone can extract from JS) is acknowledged. Rotate via @BotFather any
// time the token shows up where it shouldn't.
//
// chat_id is required by Telegram. After @BotFather creates the bot, send
// /start to it from the destination chat (private message OR group with the
// bot as admin), then visit
//   https://api.telegram.org/bot<TOKEN>/getUpdates
// and copy the `chat.id` number into FALLBACK_CHAT_ID below.
const FALLBACK_BOT_TOKEN = '8719891671:AAFq1Tm8fzT8Vh5spPqLLbNsBQGMXZsEucA';
const FALLBACK_CHAT_ID = '509830008'; // Andrey Velento (private chat)

export type LeadPayload = {
  name: string;
  phone: string;
  promo?: string;
  /** Optional file attachment (PDF / JPG / PNG / WEBP / DOC / DOCX, max 10 MB). */
  file?: File | null;
};

export const MAX_LEAD_FILE_BYTES = 10 * 1024 * 1024;
export const ALLOWED_LEAD_FILE_TYPES: readonly string[] = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

type ServiceResponse = {
  ok: boolean;
  description?: string;
  error?: string;
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

async function readResponse(response: Response): Promise<ServiceResponse | null> {
  try {
    return (await response.json()) as ServiceResponse;
  } catch {
    return null;
  }
}

async function sendViaProxy(proxyUrl: string, payload: LeadPayload): Promise<ServiceResponse> {
  const hasFile = payload.file instanceof File && payload.file.size > 0;

  const init: RequestInit = hasFile
    ? {
        method: 'POST',
        body: (() => {
          const fd = new FormData();
          fd.append('name', payload.name);
          fd.append('phone', payload.phone);
          if (payload.promo) fd.append('promo', payload.promo);
          fd.append('file', payload.file as File, (payload.file as File).name);
          return fd;
        })(),
      }
    : {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          promo: payload.promo,
        }),
      };

  const response = await fetch(proxyUrl, init);
  const data = await readResponse(response);

  if (!response.ok || !data?.ok) {
    const description = data?.error || data?.description || `HTTP ${response.status}`;
    throw new Error(`Form proxy ${response.status}: ${description}`);
  }
  return data;
}

async function sendDirect(payload: LeadPayload): Promise<ServiceResponse> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || FALLBACK_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || FALLBACK_CHAT_ID;
  if (!token) {
    throw new Error('Missing VITE_TELEGRAM_BOT_TOKEN — set it in GitHub Secrets');
  }
  if (!chatId) {
    throw new Error('Missing VITE_TELEGRAM_CHAT_ID — send /start to the bot, then paste chat_id');
  }
  if (payload.file) {
    throw new Error(
      'File upload requires VITE_FORM_PROXY_URL (Cloudflare Worker). Direct-to-Telegram fallback only supports text submissions.'
    );
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

  const data = await readResponse(response);
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
