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

import { ALLOWED_LEAD_FILE_TYPES, escapeHtml, MAX_LEAD_FILE_BYTES } from '../shared/leadRules';

// Re-exported so the attachment limits stay importable from this module (part of
// the lead payload's public contract); they are defined in the shared module
// that the Worker proxy validates against too.
export { ALLOWED_LEAD_FILE_TYPES, MAX_LEAD_FILE_BYTES };

const TELEGRAM_API_BASE = 'https://api.telegram.org';

// Note: do NOT hardcode bot tokens or chat IDs in client source.
// For local development/tests, set `VITE_TELEGRAM_BOT_TOKEN` and
// `VITE_TELEGRAM_CHAT_ID` (tests can stub these values). In production,
// prefer a server-side proxy (Cloudflare Worker) and set `VITE_FORM_PROXY_URL`.

export type LeadPayload = {
  name: string;
  phone: string;
  promo?: string;
  /** Optional file attachment (PDF / JPG / PNG / WEBP / DOC / DOCX, max 10 MB). */
  file?: File | null;
  /** hCaptcha response token, verified server-side by the Worker. */
  captchaToken?: string;
};

type ServiceResponse = {
  ok: boolean;
  description?: string;
  error?: string;
};

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
          if (payload.captchaToken) fd.append('captchaToken', payload.captchaToken);
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
          captchaToken: payload.captchaToken,
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

async function deliverTextOnly(
  token: string,
  chatId: string,
  payload: LeadPayload
): Promise<ServiceResponse> {
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

async function sendDirect(payload: LeadPayload): Promise<ServiceResponse> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!token) {
    throw new Error(
      'Missing VITE_TELEGRAM_BOT_TOKEN — do not embed bot tokens in the client. ' +
        'Use Cloudflare Worker (set VITE_FORM_PROXY_URL) or set this only for local tests.'
    );
  }
  if (!chatId) {
    throw new Error(
      'Missing VITE_TELEGRAM_CHAT_ID — set the chat id via env for tests or use a server proxy.'
    );
  }
  // No file proxy → deliver the lead text only and tell the form to ask the
  // user to send the file separately via Telegram/WhatsApp. The contact
  // details still reach the agent, so the lead isn't lost.
  if (payload.file) {
    const textResult = await deliverTextOnly(token, chatId, payload);
    const err = new Error(
      'File upload requires VITE_FORM_PROXY_URL (Cloudflare Worker). Lead text was delivered, file was not.'
    ) as Error & { code?: string; textResult?: ServiceResponse };
    err.code = 'FILE_PROXY_MISSING';
    err.textResult = textResult;
    throw err;
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
