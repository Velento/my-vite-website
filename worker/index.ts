/**
 * Cloudflare Worker — form proxy + server-side interaction log.
 *
 * Routes (all POST/GET, CORS-enabled for the site origin):
 *
 *   POST /          → form submission. Validates + forwards to Telegram, logs
 *                     to INTERACTION_LOG KV with type='form_submit'.
 *   POST /track     → micro-event ping (phone click, messenger click, etc).
 *                     Logged to INTERACTION_LOG with type='contact_click'.
 *                     Returns 204 No Content; fire-and-forget from the page.
 *   GET  /report    → JSON breakdown for a date range. Bearer-auth via
 *                     REPORT_TOKEN.
 *   GET  /export    → CSV dump for the same date range. Same auth.
 *
 * KV entry shape:
 *   key: `event:YYYY-MM-DDTHH:MM:SS.sssZ:UUID`     (sortable by date)
 *   value (JSON): {
 *     id, ts, type, channel, fingerprint, ua, country, referer, utm, lang
 *   }
 *
 * Dedup is done at REPORT time using `fingerprint` + a configurable window
 * (default 24 h). The raw log keeps every event so you can audit dedup choices.
 *
 * Secrets (set via `wrangler secret put …`):
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 *   REPORT_TOKEN          — bearer token for /report and /export
 *
 * Bindings (in wrangler.toml):
 *   INTERACTION_LOG       — kv_namespaces entry
 *   FORM_RATE_LIMITER     - [[ratelimits]] entry, caps form-submit bursts
 *   TRACK_RATE_LIMITER    - [[ratelimits]] entry, caps /track ping bursts
 *
 * Anti-abuse: bot User-Agents are rejected, a honeypot field silently drops
 * scripted submissions, and both public routes are rate-limited per visitor.
 */

/**
 * Cloudflare native rate limiting binding. Declared locally so the worker
 * typechecks regardless of the installed @cloudflare/workers-types version.
 */
interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  REPORT_TOKEN?: string;
  ALLOWED_ORIGINS?: string;
  INTERACTION_LOG?: KVNamespace;
  /** Rate limiter for POST / (form submit). Optional - no-ops if not bound. */
  FORM_RATE_LIMITER?: RateLimit;
  /** Rate limiter for POST /track (click pings). Optional - no-ops if not bound. */
  TRACK_RATE_LIMITER?: RateLimit;
}

/** Honeypot field name - must match the hidden input rendered by the form. */
const HONEYPOT_FIELD = 'website';

const DEFAULT_ALLOWED = ['https://legalline.pl', 'https://www.legalline.pl'];

// `\p{L}` matches any Unicode letter — Latin (incl. Polish ą ć ę ł ń ó ś ź ż),
// Cyrillic, Ukrainian, Belarusian, etc. `\p{M}` covers combining marks.
const NAME_REGEX = /^[\p{L}\p{M}\s'-]{2,50}$/u;
const PHONE_REGEX = /^\+?[\d\s\-()]{9,20}$/;

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const ALLOWED_CHANNELS = new Set([
  'phone',
  'whatsapp',
  'telegram',
  'viber',
  'instagram',
  'email',
]);

// Keep raw events for two years. Plenty for tax/invoice audit, KV cost is
// negligible at this scale (each entry ~300 B).
const KV_TTL_SECONDS = 60 * 60 * 24 * 730;

const DEFAULT_DEDUP_WINDOW_SECONDS = 60 * 60 * 24;

// ── helpers ──────────────────────────────────────────────────────────────────

function corsHeaders(origin: string | null, allowed: string[]): HeadersInit {
  const allow = origin && allowed.includes(origin) ? origin : allowed[0]!;
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
  };
}

function jsonResponse(data: unknown, status: number, extraHeaders: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function uuid(): string {
  // Web Crypto is available in Workers.
  return crypto.randomUUID();
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Constant-time string comparison. Both inputs are hashed to a fixed-length
 * (64-char) SHA-256 hex digest first, so the XOR loop always runs the same
 * number of iterations and the comparison time never leaks how many leading
 * characters of a guessed token were correct.
 */
async function constantTimeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([sha256Hex(a), sha256Hex(b)]);
  let diff = 0;
  for (let i = 0; i < ha.length; i++) {
    diff |= ha.charCodeAt(i) ^ hb.charCodeAt(i);
  }
  return diff === 0;
}

/** True when the honeypot field carries a value - i.e. a bot filled it. */
function isHoneypotTripped(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

/** Stable per-visitor signal for dedup: hashed IP + UA. Not stored. */
async function makeSessionFingerprint(request: Request): Promise<string> {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const ua = request.headers.get('User-Agent') ?? 'unknown';
  return (await sha256Hex(`${ip}::${ua}`)).slice(0, 24);
}

/** Stable per-lead dedup key: hashed phone when available, session fingerprint otherwise. */
async function makeFingerprint(phone: string | null, sessionFp: string): Promise<string> {
  if (phone) {
    const digits = phone.replace(/\D/g, '');
    return `p_${(await sha256Hex(digits)).slice(0, 24)}`;
  }
  return `s_${sessionFp}`;
}

function isBotUserAgent(ua: string | null): boolean {
  if (!ua) return false;
  return /\b(bot|crawler|spider|crawling|preview|scrape|headless|phantom|selenium)\b/i.test(ua);
}

// ── KV log entry ─────────────────────────────────────────────────────────────

type EventType = 'form_submit' | 'contact_click';

type Channel =
  | 'form'
  | 'phone'
  | 'whatsapp'
  | 'telegram'
  | 'viber'
  | 'instagram'
  | 'email';

interface LogEntry {
  id: string;
  ts: string;
  type: EventType;
  channel: Channel;
  fingerprint: string;
  ua: string;
  country: string | null;
  referer: string | null;
  utm: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    term: string | null;
    content: string | null;
  };
  lang: string | null;
}

async function logEvent(env: Env, entry: LogEntry): Promise<void> {
  if (!env.INTERACTION_LOG) {
    console.warn('INTERACTION_LOG KV binding missing; event not persisted', entry.id);
    return;
  }
  const key = `event:${entry.ts}:${entry.id}`;
  await env.INTERACTION_LOG.put(key, JSON.stringify(entry), { expirationTtl: KV_TTL_SECONDS });
}

function pickUtm(url: URL): LogEntry['utm'] {
  const sp = url.searchParams;
  return {
    source: sp.get('utm_source'),
    medium: sp.get('utm_medium'),
    campaign: sp.get('utm_campaign'),
    term: sp.get('utm_term'),
    content: sp.get('utm_content'),
  };
}

// ── form submit (existing path, now logging) ────────────────────────────────

type Lead = { name: string; phone: string; promo?: string };

function validateLead(
  lead: Partial<Lead>
): { ok: true; lead: Lead } | { ok: false; error: string } {
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

function buildCaption(lead: Lead, eventId: string): string {
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
  lines.push('', `🆔 <code>${escapeHtml(eventId)}</code>`);
  return lines.join('\n');
}

async function sendTelegramMessage(env: Env, text: string): Promise<Response> {
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

async function sendTelegramDocument(env: Env, caption: string, file: File): Promise<Response> {
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

async function handleFormSubmit(
  request: Request,
  env: Env,
  cors: HeadersInit
): Promise<Response> {
  const ua = request.headers.get('User-Agent') ?? '';
  if (isBotUserAgent(ua)) {
    return jsonResponse({ ok: false, error: 'Bot blocked' }, 403, cors);
  }

  // Rate limit by per-visitor fingerprint to cap spam bursts hitting the
  // Telegram chat and the KV log. No-ops gracefully when the binding is not
  // provisioned (see wrangler.toml [[ratelimits]]).
  const sessionFp = await makeSessionFingerprint(request);
  if (env.FORM_RATE_LIMITER) {
    const { success } = await env.FORM_RATE_LIMITER.limit({ key: sessionFp });
    if (!success) {
      return jsonResponse({ ok: false, error: 'Too many requests' }, 429, cors);
    }
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

    if (isHoneypotTripped(formData.get(HONEYPOT_FIELD))) {
      // Honeypot filled - acknowledge with a fake success and deliver nothing.
      return jsonResponse({ ok: true, id: uuid() }, 200, cors);
    }

    const candidate = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      promo: formData.get('promo') ?? undefined,
    };
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
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ ok: false, error: 'Invalid JSON' }, 400, cors);
    }
    if (!body || typeof body !== 'object') {
      return jsonResponse({ ok: false, error: 'Invalid payload' }, 400, cors);
    }
    if (isHoneypotTripped((body as Record<string, unknown>)[HONEYPOT_FIELD])) {
      // Honeypot filled - acknowledge with a fake success and deliver nothing.
      return jsonResponse({ ok: true, id: uuid() }, 200, cors);
    }
    const validated = validateLead(body as Partial<Lead>);
    if (!validated.ok) {
      return jsonResponse({ ok: false, error: validated.error }, 400, cors);
    }
    lead = validated.lead;
  }

  const fingerprint = await makeFingerprint(lead.phone, sessionFp);
  const eventId = uuid();
  const ts = new Date().toISOString();
  const url = new URL(request.url);

  const entry: LogEntry = {
    id: eventId,
    ts,
    type: 'form_submit',
    channel: 'form',
    fingerprint,
    ua,
    country: request.headers.get('CF-IPCountry'),
    referer: request.headers.get('Referer'),
    utm: pickUtm(url),
    lang: request.headers.get('Accept-Language')?.split(',')[0] ?? null,
  };
  await logEvent(env, entry);

  const caption = buildCaption(lead, eventId);
  const tgRes = file
    ? await sendTelegramDocument(env, caption, file)
    : await sendTelegramMessage(env, caption);

  if (!tgRes.ok) {
    return jsonResponse({ ok: false, error: 'Upstream error', id: eventId }, 502, cors);
  }
  return jsonResponse({ ok: true, id: eventId }, 200, cors);
}

// ── click tracking ───────────────────────────────────────────────────────────

interface TrackPayload {
  channel?: unknown;
  utm?: {
    source?: unknown;
    medium?: unknown;
    campaign?: unknown;
    term?: unknown;
    content?: unknown;
  };
  referer?: unknown;
  lang?: unknown;
}

function s(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 && value.length < 300 ? value : null;
}

async function handleTrack(request: Request, env: Env, cors: HeadersInit): Promise<Response> {
  const ua = request.headers.get('User-Agent') ?? '';
  if (isBotUserAgent(ua)) {
    return new Response(null, { status: 204, headers: cors });
  }

  const sessionFp = await makeSessionFingerprint(request);
  if (env.TRACK_RATE_LIMITER) {
    const { success } = await env.TRACK_RATE_LIMITER.limit({ key: sessionFp });
    // /track is fire-and-forget - silently drop instead of returning an error.
    if (!success) return new Response(null, { status: 204, headers: cors });
  }

  let body: TrackPayload;
  try {
    body = (await request.json()) as TrackPayload;
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON' }, 400, cors);
  }

  const channel = typeof body.channel === 'string' ? body.channel : '';
  if (!ALLOWED_CHANNELS.has(channel)) {
    return jsonResponse({ ok: false, error: 'Invalid channel' }, 400, cors);
  }

  const fingerprint = await makeFingerprint(null, sessionFp);
  const eventId = uuid();
  const ts = new Date().toISOString();

  const entry: LogEntry = {
    id: eventId,
    ts,
    type: 'contact_click',
    channel: channel as Channel,
    fingerprint,
    ua,
    country: request.headers.get('CF-IPCountry'),
    referer: s(body.referer) ?? request.headers.get('Referer'),
    utm: {
      source: s(body.utm?.source),
      medium: s(body.utm?.medium),
      campaign: s(body.utm?.campaign),
      term: s(body.utm?.term),
      content: s(body.utm?.content),
    },
    lang: s(body.lang) ?? (request.headers.get('Accept-Language')?.split(',')[0] ?? null),
  };

  await logEvent(env, entry);
  return new Response(null, { status: 204, headers: cors });
}

// ── reporting / export ───────────────────────────────────────────────────────

async function checkToken(request: Request, env: Env): Promise<boolean> {
  const token = env.REPORT_TOKEN;
  if (!token) return false;
  const header = request.headers.get('Authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  if (match !== null && (await constantTimeEqual(match[1]!, token))) return true;
  // Also accept ?token= so dashboard bookmarks and CSV links work without JS.
  const queryToken = new URL(request.url).searchParams.get('token');
  return queryToken !== null && (await constantTimeEqual(queryToken, token));
}

interface ReportParams {
  from: string;
  to: string;
  dedup: boolean;
  dedupWindowSeconds: number;
}

function parseReportParams(url: URL): { ok: true; params: ReportParams } | { ok: false; error: string } {
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  if (!from || !to || !/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
    return { ok: false, error: 'from/to must be YYYY-MM-DD' };
  }
  const dedup = url.searchParams.get('dedup') !== 'false';
  const dedupWindowSeconds = Number(
    url.searchParams.get('dedup_window_seconds') ?? DEFAULT_DEDUP_WINDOW_SECONDS
  );
  if (!Number.isFinite(dedupWindowSeconds) || dedupWindowSeconds < 0) {
    return { ok: false, error: 'dedup_window_seconds must be a non-negative number' };
  }
  return { ok: true, params: { from, to, dedup, dedupWindowSeconds } };
}

async function loadEvents(
  env: Env,
  fromIso: string,
  toIsoExclusive: string
): Promise<LogEntry[]> {
  if (!env.INTERACTION_LOG) return [];

  const events: LogEntry[] = [];
  let cursor: string | undefined;
  const prefix = 'event:';
  const startKey = `event:${fromIso}`;
  const endKey = `event:${toIsoExclusive}`;

  do {
    const page = await env.INTERACTION_LOG.list({ prefix, cursor, limit: 1000 });
    for (const k of page.keys) {
      if (k.name < startKey) continue;
      if (k.name >= endKey) {
        // Keys are returned sorted; we can stop here.
        return events;
      }
      const raw = await env.INTERACTION_LOG.get(k.name);
      if (raw) {
        try {
          events.push(JSON.parse(raw) as LogEntry);
        } catch {
          // Skip malformed entry.
        }
      }
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return events;
}

function dedupEvents(events: LogEntry[], windowSeconds: number): LogEntry[] {
  if (windowSeconds <= 0) return events;
  const lastSeen = new Map<string, number>();
  const kept: LogEntry[] = [];
  for (const e of events) {
    const tsMs = Date.parse(e.ts);
    const key = `${e.type}:${e.channel}:${e.fingerprint}`;
    const prev = lastSeen.get(key);
    if (prev === undefined || tsMs - prev > windowSeconds * 1000) {
      kept.push(e);
      lastSeen.set(key, tsMs);
    }
  }
  return kept;
}

function buildReport(events: LogEntry[], deduped: LogEntry[]) {
  const byType: Record<string, number> = {};
  const byChannel: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  const byDay: Record<string, number> = {};

  for (const e of deduped) {
    byType[e.type] = (byType[e.type] ?? 0) + 1;
    byChannel[e.channel] = (byChannel[e.channel] ?? 0) + 1;
    const src = e.utm.source ?? 'direct';
    bySource[src] = (bySource[src] ?? 0) + 1;
    const day = e.ts.slice(0, 10);
    byDay[day] = (byDay[day] ?? 0) + 1;
  }

  return {
    total_raw: events.length,
    total_unique: deduped.length,
    by_type: byType,
    by_channel: byChannel,
    by_source: bySource,
    by_day: byDay,
  };
}

async function handleReport(request: Request, env: Env): Promise<Response> {
  if (!(await checkToken(request, env))) {
    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
  }
  const url = new URL(request.url);
  const parsed = parseReportParams(url);
  if (!parsed.ok) return jsonResponse({ ok: false, error: parsed.error }, 400);

  const fromIso = `${parsed.params.from}T00:00:00.000Z`;
  // exclusive upper bound: next day after `to`
  const toDate = new Date(`${parsed.params.to}T00:00:00.000Z`);
  toDate.setUTCDate(toDate.getUTCDate() + 1);
  const toIsoExclusive = toDate.toISOString();

  const events = await loadEvents(env, fromIso, toIsoExclusive);
  const deduped = parsed.params.dedup
    ? dedupEvents(events, parsed.params.dedupWindowSeconds)
    : events;

  return jsonResponse({
    ok: true,
    from: parsed.params.from,
    to: parsed.params.to,
    dedup: parsed.params.dedup,
    dedup_window_seconds: parsed.params.dedupWindowSeconds,
    report: buildReport(events, deduped),
  }, 200);
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

async function handleExport(request: Request, env: Env): Promise<Response> {
  if (!(await checkToken(request, env))) {
    return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
  }
  const url = new URL(request.url);
  const parsed = parseReportParams(url);
  if (!parsed.ok) return jsonResponse({ ok: false, error: parsed.error }, 400);

  const fromIso = `${parsed.params.from}T00:00:00.000Z`;
  const toDate = new Date(`${parsed.params.to}T00:00:00.000Z`);
  toDate.setUTCDate(toDate.getUTCDate() + 1);
  const toIsoExclusive = toDate.toISOString();

  const events = await loadEvents(env, fromIso, toIsoExclusive);
  const rows = parsed.params.dedup
    ? dedupEvents(events, parsed.params.dedupWindowSeconds)
    : events;

  const header = [
    'id',
    'ts',
    'type',
    'channel',
    'fingerprint',
    'country',
    'utm_source',
    'utm_campaign',
    'lang',
    'referer',
  ];
  const lines = [header.join(',')];
  for (const e of rows) {
    lines.push(
      [
        e.id,
        e.ts,
        e.type,
        e.channel,
        e.fingerprint,
        e.country ?? '',
        e.utm.source ?? '',
        e.utm.campaign ?? '',
        e.lang ?? '',
        e.referer ?? '',
      ]
        .map((v) => csvEscape(String(v)))
        .join(',')
    );
  }

  return new Response(lines.join('\n') + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads_${parsed.params.from}_${parsed.params.to}.csv"`,
    },
  });
}

// ── dashboard ────────────────────────────────────────────────────────────────

const MONTHS_PL = [
  'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
  'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień',
];

const CHANNEL_LABELS: Record<string, string> = {
  form: '📋 Formularz (potwierdzony)',
  phone: '📞 Kliknięcie – telefon',
  whatsapp: '💬 WhatsApp',
  telegram: '✈️ Telegram',
  viber: '📳 Viber',
  instagram: '📸 Instagram',
  email: '✉️ E-mail',
};

function dashboardHtml(p: {
  monthName: string; year: number; from: string; to: string;
  report: ReturnType<typeof buildReport>;
  prevUrl: string; nextUrl: string; csvUrl: string;
  isCurrentMonth: boolean; generatedAt: string;
}): string {
  const { monthName, year, from, to, report, prevUrl, nextUrl, csvUrl, isCurrentMonth, generatedAt } = p;
  const entries = Object.entries(report.by_channel || {}).sort(([, a], [, b]) => b - a);
  const maxVal = Math.max(...entries.map(([, n]) => n), 1);
  const forms = report.by_channel.form ?? 0;
  const clicks = report.total_unique - forms;

  const rows = entries.map(([key, count]) => {
    const label = CHANNEL_LABELS[key] ?? key;
    const pct = Math.round((count / maxVal) * 100);
    const chip = key === 'form'
      ? '<span class="chip cf">forma</span>'
      : '<span class="chip cc">klik</span>';
    return `<div class="row">
      <span class="row-lbl">${label}${chip}</span>
      <div class="bar-w"><div class="bar" style="width:${pct}%"></div></div>
      <span class="row-n">${count}</span>
    </div>`;
  }).join('');

  const nextDisabled = isCurrentMonth ? ' style="background:#ccc;pointer-events:none"' : '';

  return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Legal Line — Kontakty ${monthName} ${year}</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f5f5f0;color:#1a2332;min-height:100vh}
.hd{background:#1a2332;color:#fff;padding:18px 28px;display:flex;align-items:center;justify-content:space-between}
.hd h1{font-size:.95rem;letter-spacing:.14em;font-weight:700}
.hd p{font-size:.72rem;opacity:.5}
.wrap{max-width:620px;margin:0 auto;padding:26px 16px}
.nav{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:22px}
.nav a{background:#1a2332;color:#fff;text-decoration:none;padding:8px 18px;border-radius:6px;font-size:1.1rem;line-height:1;transition:background .15s}
.nav a:hover{background:#b8943e}
.nav-lbl{font-size:1.2rem;font-weight:600;min-width:190px;text-align:center}
.card{background:#fff;border-radius:10px;padding:22px;margin-bottom:14px;box-shadow:0 1px 5px rgba(0,0,0,.07)}
.hero{text-align:center;padding:30px 20px}
.hero .num{font-size:5.5rem;font-weight:800;color:#b8943e;line-height:1}
.hero .lbl{font-size:.95rem;color:#555;margin-top:8px}
.hero .sub{font-size:.78rem;color:#aaa;margin-top:5px}
.sec{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#aaa;margin-bottom:14px}
.row{display:flex;align-items:center;gap:10px;margin-bottom:9px}
.row-lbl{flex:1;font-size:.86rem}
.bar-w{width:110px;height:8px;background:#f0f0ea;border-radius:4px;overflow:hidden}
.bar{height:100%;background:#b8943e;border-radius:4px}
.row-n{font-weight:700;font-size:.9rem;min-width:26px;text-align:right}
.chip{display:inline-block;padding:1px 7px;border-radius:20px;font-size:.63rem;font-weight:600;margin-left:5px}
.cf{background:#e8f5e9;color:#2e7d32}.cc{background:#fff3e0;color:#e65100}
.csv-row{display:flex;justify-content:center;margin-top:8px}
.csv-btn{background:#1a2332;color:#fff;text-decoration:none;padding:11px 28px;border-radius:6px;font-size:.9rem;display:inline-block;transition:background .15s}
.csv-btn:hover{background:#b8943e}
.note{font-size:.73rem;color:#aaa;text-align:center;margin-top:18px;line-height:1.6}
</style>
</head>
<body>
<div class="hd">
  <h1>LEGAL LINE &mdash; Raport Kontakt&oacute;w</h1>
  <p>Cloudflare KV &middot; ${from} &mdash; ${to} &middot; ${generatedAt}</p>
</div>
<div class="wrap">
  <div class="nav">
    <a href="${prevUrl}">&larr;</a>
    <span class="nav-lbl">${monthName} ${year}</span>
    <a href="${nextUrl}"${nextDisabled}>&rarr;</a>
  </div>
  <div class="card hero">
    <div class="num">${report.total_unique}</div>
    <div class="lbl">unikalnych kontakt&oacute;w (dedup 24&nbsp;h)</div>
    <div class="sub">zdarze&#324; w logu: ${report.total_raw}&nbsp;&nbsp;&middot;&nbsp;&nbsp;formularze: ${forms}&nbsp;&nbsp;&middot;&nbsp;&nbsp;klikni&#281;cia: ${clicks}</div>
  </div>
  <div class="card">
    <div class="sec">Podzia&#322; wed&#322;ug kana&#322;u</div>
    ${rows || '<p style="color:#aaa;font-size:.85rem">Brak danych za ten miesi&#261;c.</p>'}
  </div>
  <div class="csv-row">
    <a class="csv-btn" href="${csvUrl}">&#8659;&nbsp; Pobierz CSV &mdash; ${from} do ${to}</a>
  </div>
  <p class="note">
    Timestamp ustawia Cloudflare (nie da si&#281; sfabrykowa&#263;).<br>
    Dedup: jedno zdarzenie na (typ&nbsp;+&nbsp;kana&#322;&nbsp;+&nbsp;identyfikator) w&nbsp;24&nbsp;h.
  </p>
</div>
</body>
</html>`;
}

async function handleDashboard(request: Request, env: Env): Promise<Response> {
  if (!(await checkToken(request, env))) {
    return new Response(
      '<!DOCTYPE html><html lang="pl"><body style="font-family:sans-serif;text-align:center;padding:80px">' +
      '<h2 style="color:#c0392b">401 &mdash; Brak dost&#281;pu</h2>' +
      '<p style="color:#666;margin-top:12px">Link zawiera nieprawid&#322;owy lub brakuj&#261;cy token.</p>' +
      '</body></html>',
      { status: 401, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }

  const url = new URL(request.url);
  const token = url.searchParams.get('token') ?? '';

  const now = new Date();
  const monthParam = url.searchParams.get('month') ?? '';
  let year: number, month: number; // month is 1-based
  if (/^\d{4}-\d{2}$/.test(monthParam)) {
    const parts = monthParam.split('-').map(Number);
    year = parts[0]!;
    month = parts[1]!;
  } else {
    year = now.getUTCFullYear();
    month = now.getUTCMonth() + 1;
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const from = `${year}-${pad(month)}-01`;
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const to = `${year}-${pad(month)}-${pad(lastDay)}`;

  const fromIso = `${from}T00:00:00.000Z`;
  const toEnd = new Date(`${to}T00:00:00.000Z`);
  toEnd.setUTCDate(toEnd.getUTCDate() + 1);

  const events = await loadEvents(env, fromIso, toEnd.toISOString());
  const deduped = dedupEvents(events, DEFAULT_DEDUP_WINDOW_SECONDS);
  const report = buildReport(events, deduped);

  const prevD = new Date(Date.UTC(year, month - 2, 1));
  const nextD = new Date(Date.UTC(year, month, 1));
  const fmtMonth = (d: Date) =>
    `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`;

  const base = `${url.origin}/dashboard?token=${encodeURIComponent(token)}`;
  const prevUrl = `${base}&month=${fmtMonth(prevD)}`;
  const nextUrl = `${base}&month=${fmtMonth(nextD)}`;
  const csvUrl =
    `${url.origin}/export?token=${encodeURIComponent(token)}&from=${from}&to=${to}&dedup=true`;

  const isCurrentMonth =
    year === now.getUTCFullYear() && month === now.getUTCMonth() + 1;

  const generatedAt = now.toLocaleTimeString('pl-PL', { timeZone: 'Europe/Warsaw' });

  const html = dashboardHtml({
    monthName: MONTHS_PL[month - 1]!,
    year, from, to, report,
    prevUrl, nextUrl, csvUrl,
    isCurrentMonth, generatedAt,
  });

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    },
  });
}

// ── router ───────────────────────────────────────────────────────────────────

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

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    // Admin endpoints — no CORS required (browser/curl, token-protected)
    if (path === '/dashboard' && request.method === 'GET') {
      return handleDashboard(request, env);
    }
    if (path === '/report' && request.method === 'GET') {
      return handleReport(request, env);
    }
    if (path === '/export' && request.method === 'GET') {
      return handleExport(request, env);
    }

    // Public routes — enforce the Origin allowlist.
    if (origin && !allowed.includes(origin)) {
      return jsonResponse({ ok: false, error: 'Forbidden origin' }, 403, cors);
    }

    if (path === '/track' && request.method === 'POST') {
      return handleTrack(request, env, cors);
    }
    if (path === '/' && request.method === 'POST') {
      return handleFormSubmit(request, env, cors);
    }

    return jsonResponse({ ok: false, error: 'Not found' }, 404, cors);
  },
};
