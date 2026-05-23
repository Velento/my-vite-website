import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendLeadToTelegram } from './telegram';

const okResponse = () => new Response(JSON.stringify({ ok: true }), { status: 200 });

beforeEach(() => {
  vi.mocked(fetch).mockReset();
  // Restore the direct-mode credentials the global setup provides (later tests
  // may have changed them); proxy URL is set explicitly per test.
  vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', 'test-bot-token');
  vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '123456789');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('proxy mode', () => {
  it('posts JSON to the proxy when VITE_FORM_PROXY_URL is set', async () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', 'https://worker.example/');
    vi.mocked(fetch).mockResolvedValue(okResponse());

    const res = await sendLeadToTelegram({ name: 'Anna', phone: '+48123456789', promo: 'X' });

    expect(res.ok).toBe(true);
    const [url, init] = vi.mocked(fetch).mock.calls[0]!;
    expect(url).toBe('https://worker.example/');
    expect(init!.method).toBe('POST');
    expect(JSON.parse(init!.body as string)).toMatchObject({
      name: 'Anna',
      phone: '+48123456789',
      promo: 'X',
    });
  });

  it('sends multipart form-data when a file is attached', async () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', 'https://worker.example/');
    vi.mocked(fetch).mockResolvedValue(okResponse());

    const file = new File(['hello'], 'doc.pdf', { type: 'application/pdf' });
    await sendLeadToTelegram({ name: 'Anna', phone: '+48123456789', file });

    const body = vi.mocked(fetch).mock.calls[0]![1]!.body as FormData;
    expect(body).toBeInstanceOf(FormData);
    expect(body.get('name')).toBe('Anna');
    expect(body.get('file')).toBeInstanceOf(File);
  });

  it('throws when the proxy responds with an error', async () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', 'https://worker.example/');
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'nope' }), { status: 400 })
    );
    await expect(sendLeadToTelegram({ name: 'Anna', phone: '+48123456789' })).rejects.toThrow(
      /proxy/i
    );
  });
});

describe('direct mode (no proxy)', () => {
  it('calls the Telegram sendMessage API and HTML-escapes the lead', async () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', '');
    vi.mocked(fetch).mockResolvedValue(okResponse());

    await sendLeadToTelegram({ name: '<b>Anna</b>', phone: '+48123456789' });

    const [url, init] = vi.mocked(fetch).mock.calls[0]!;
    expect(String(url)).toContain('api.telegram.org');
    expect(String(url)).toContain('sendMessage');
    const body = JSON.parse(init!.body as string);
    expect(body.chat_id).toBe('123456789');
    expect(body.text).toContain('&lt;b&gt;Anna&lt;/b&gt;');
  });

  it('reports FILE_PROXY_MISSING (but still delivers text) when a file needs a proxy', async () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', '');
    vi.mocked(fetch).mockResolvedValue(okResponse());

    const file = new File(['x'], 'doc.pdf', { type: 'application/pdf' });
    await expect(
      sendLeadToTelegram({ name: 'Anna', phone: '+48123456789', file })
    ).rejects.toMatchObject({ code: 'FILE_PROXY_MISSING' });
  });

  it('throws a helpful error when the bot token is missing', async () => {
    vi.stubEnv('VITE_FORM_PROXY_URL', '');
    vi.stubEnv('VITE_TELEGRAM_BOT_TOKEN', '');
    await expect(sendLeadToTelegram({ name: 'Anna', phone: '+48123456789' })).rejects.toThrow(
      /VITE_TELEGRAM_BOT_TOKEN/
    );
  });
});
