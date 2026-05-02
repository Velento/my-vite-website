/**
 * Telegram Bot lead submission.
 *
 * Sends form submissions directly to Telegram via the Bot API.
 * Token + chat ID come from VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID
 * env vars (set as GitHub Actions secrets, baked into the bundle at build time).
 *
 * Trade-off: the token is visible in the client bundle. Telegram bots are
 * cheap to rotate — if a token leaks, run /revoke in @BotFather and replace
 * the GitHub secret. Misuse is bounded by the SUBMIT_COOLDOWN_MS rate limit
 * in useLeadForm and Telegram's own anti-abuse for /sendMessage.
 */

const TELEGRAM_API_BASE = 'https://api.telegram.org';

function getBotToken(): string {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error('Missing VITE_TELEGRAM_BOT_TOKEN — set it in GitHub Secrets');
  }
  return token;
}

function getChatId(): string {
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!chatId) {
    throw new Error('Missing VITE_TELEGRAM_CHAT_ID — set it in GitHub Secrets');
  }
  return chatId;
}

export type LeadPayload = {
  name: string;
  phone: string;
  promo?: string;
};

type TelegramResponse = {
  ok: boolean;
  description?: string;
  result?: unknown;
};

// HTML escape for Telegram parse_mode='HTML' — bot rejects messages with
// unescaped <, >, & so we sanitise user input before interpolation.
function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function sendLeadToTelegram({
  name,
  phone,
  promo,
}: LeadPayload): Promise<TelegramResponse> {
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

  const text = lines.join('\n');
  const url = `${TELEGRAM_API_BASE}/bot${getBotToken()}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: getChatId(),
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  let data: TelegramResponse | null = null;
  try {
    data = (await response.json()) as TelegramResponse;
  } catch {
    // ignore — handled below via response.ok
  }

  if (!response.ok || !data?.ok) {
    const description = data?.description || `HTTP ${response.status}`;
    throw new Error(`Telegram ${response.status}: ${description}`);
  }

  return data;
}
