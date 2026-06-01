# AGENTS.md

Working guide for this repository. Read this before making changes.

## What this is

Legal Line is a multilingual (ru / pl / ua / en / by) single-page marketing
site for residence-permit and legalization services in Gdańsk. It is a React +
TypeScript app, statically prerendered per language, and deployed to GitHub
Pages at <https://legalline.pl>. Lead submissions are forwarded to Telegram
through a Cloudflare Worker proxy, which also keeps a server-side audit log used
to settle the per-lead commission.

## Stack

- React 18, TypeScript (strict), Vite 8, Tailwind 4
- i18next + react-i18next, react-hook-form + zod
- Vitest + Testing Library
- Cloudflare Worker (`worker/`) on the edge
- PWA via vite-plugin-pwa (Workbox); Partytown runs third-party tags off the main thread

## Commands

```bash
npm run dev              # dev server (no CSP, HMR works)
npm run build            # production build; postbuild runs the per-language prerender
npm test                 # vitest run
npm run test:coverage    # vitest with coverage
npm run lint             # eslint src
npm run format:check     # prettier check (src only)
npm run typecheck        # tsc for the app
npm run typecheck:worker # tsc for the worker
npm run check:i18n       # assert all locales share the same keys
npx wrangler dev         # run the worker locally
npx wrangler deploy      # deploy the worker
```

## Layout

```text
src/
  Components/        UI (Header, Footer, Floating, Main_page/*)
  services/          telegram, analytics, consent gates, validation
  hooks/             useFormDraft, useCountUp, useBodyScrollLock, ...
  i18n/locales/      ru, pl, ua, en, by translation bundles
  shared/            rules shared between the app and the worker (leadRules.ts)
  entry-server.tsx   SSR entry used by the prerender step
worker/              Cloudflare Worker: form proxy + KV audit + /report /export /dashboard
scripts/             prerender.mjs (SSG), check-i18n.mjs, generate-og-image.mjs
public/              static assets, self-hosted fonts, manifest, robots, sitemap
```

## Architecture notes

- **SSG + hydration.** `scripts/prerender.mjs` renders the app to static HTML per
  language into `dist/<lang>/index.html` (plus root and `404.html`). The client
  hydrates in place when the detected language matches `data-prerender-lang`
  (`src/main.tsx`); otherwise it does a clean render.
- **i18n.** Language comes from the URL path segment (`/pl/`, `/ru/`, ...) or
  `localStorage`, falling back to `ru`. Locale bundles are lazy-loaded as chunks.
- **Lead pipeline.** Form (`LeadFormFields`) -> `services/telegram` -> Worker
  `POST /` -> Telegram message + KV log. The worker enforces a honeypot, optional
  hCaptcha, per-visitor rate limiting, an Origin allowlist, and a file
  magic-byte check. Field formats, upload limits and HTML escaping live once in
  `src/shared/leadRules.ts` and are imported by both the app and the worker.
- **Analytics is consent-gated (RODO).** GTM and Meta Pixel load only after the
  cookie banner grants consent; events flow through `dataLayer`/Partytown and a
  server beacon to the worker `/track`. The billing trail keeps working even
  when client tags are ad-blocked.
- **Security headers.** GitHub Pages cannot set HTTP headers, so the CSP and
  Referrer-Policy are injected into the built HTML by `securityMetaPlugin()` in
  `vite.config.js` (build only, never in dev, where an enforcing CSP would break
  HMR). `frame-ancestors` cannot be set via meta and is a known gap on Pages.

## Deploy

- **Site:** push to `my-vite-website` triggers `.github/workflows/deploy.yml`
  (build + GitHub Pages). Custom domain `legalline.pl` via `CNAME`.
- **Worker:** `npx wrangler deploy`. Secrets via `wrangler secret put`:
  `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `REPORT_TOKEN`, optional
  `HCAPTCHA_SECRET`.
- **Build-time env** (GitHub Actions secrets): `VITE_FORM_PROXY_URL`,
  `VITE_GOOGLE_ADS_CONVERSION_ID`, `VITE_HCAPTCHA_SITE_KEY`. See `.env.example`.
- Repository hardening (branch protection, Pages HTTPS) is a one-shot
  `workflow_dispatch` in `.github/workflows/branch-protection.yml` and needs a
  `REPO_ADMIN_TOKEN` PAT.

## Conventions

- Conventional commits with a scope, imperative mood, concise
  (`feat(worker): ...`, `fix(seo): ...`, `ci: ...`). Match the existing history.
- TypeScript strict; prefer the `@` alias for imports under `src`.
- Prettier + ESLint are enforced in CI and by a husky `pre-commit` hook
  (lint-staged, `src` only). Keep `npm run check:i18n` green when touching locales.
- Use a plain hyphen, never an em-dash, in code, docs and commit messages.
- Never commit secrets. `REPORT_TOKEN` lives in `.report-token.local` (gitignored);
  gitleaks runs in CI and blocks a push that leaks one.
