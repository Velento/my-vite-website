/**
 * Telegram Service — единственное место где происходит взаимодействие с Telegram API.
 * Токен берётся из переменных окружения, никогда не из кода.
 */

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

/**
 * @param {{ name: string, phone: string, promo?: string }} data
 * @returns {Promise<void>}
 */
export async function sendLeadToTelegram(data) {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error('Telegram credentials not configured. Create .env.local from .env.example');
  }

  const lines = ['📋 *Новая заявка*', `👤 Имя: ${data.name}`, `📞 Телефон: ${data.phone}`];
  if (data.promo) lines.push(`🎁 Промо: ${data.promo}`);

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: lines.join('\n'),
      parse_mode: 'Markdown',
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(`Telegram API error ${response.status}: ${body.description ?? 'unknown'}`);
  }
}
