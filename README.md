# Legal Line — Lead Generation Landing Page

A modern, conversion-focused landing page for a legal services company helping immigrants in Poland. Built with **React 18** and **Vite 5**, the platform supports five languages and integrates with messaging APIs (Telegram, Viber, WhatsApp) to capture and convert leads in real time.


---

## Key Features

- **Multilingual support (5 languages)** — full i18n coverage for Polish, English, Ukrainian, Russian, and Belarusian via `react-i18next`
- **Lead capture forms** with real-time validation (name, phone, promo code) and double-submit protection
- **Telegram Bot API integration** — leads are sent instantly to a Telegram chat with timeout handling via `AbortController`
- **Messenger quick-links** — one-click contact through Telegram, WhatsApp, and Viber
- **Responsive image slider** with CTA overlay, auto-play, and swipe support (`react-slick`)
- **Accordion-based service catalog** with expandable descriptions and per-service contact modals
- **Trust bar** — social proof section with key company metrics
- **Cookie consent banner** — GDPR-friendly, non-blocking
- **Focus-trap modals** — all dialogs are WCAG 2.1 accessible with keyboard navigation and Escape-to-close
- **Optimized assets** — team photos converted to WebP (16 MB → 190 KB), lazy-loaded images, code-split routes
- **OpenGraph meta tags** — custom `og:image` for rich social sharing previews
- **Semantic HTML5** — `<article>`, `<section>`, `<address>`, `<aside>`, `<nav>`, `<main>` for SEO and accessibility

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI library (functional components + hooks) |
| Vite | 5.2 | Build tool and dev server (HMR, code splitting) |
| react-i18next | 14.1 | Internationalization framework |
| react-slick | 0.30 | Carousel / image slider |
| focus-trap-react | 12.0 | Accessible focus management for modals |
| prop-types | 15.8 | Runtime type checking for components |

### Development & Quality

| Tool | Version | Purpose |
|---|---|---|
| Vitest | 4.1 | Unit & integration testing (Vite-native) |
| React Testing Library | 16.3 | Component testing with user-centric queries |
| ESLint | 8.57 | Static analysis (React, Hooks, JSX-a11y rules) |
| Prettier | 3.2 | Code formatting |
| jsdom | 24.0 | DOM environment for tests |
| gh-pages | 5.0 | Deployment to GitHub Pages |
| @vitest/coverage-v8 | 4.1 | Code coverage reports |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/velento/legal_line.git
cd legal_line

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Edit `.env.local` and fill in the required values:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token    # from @BotFather
VITE_TELEGRAM_CHAT_ID=your_chat_id        # from @userinfobot
```

### Development

```bash
npm run dev           # Start dev server (http://localhost:5173)
```

### Quality Checks

```bash
npm run lint          # Run ESLint
npm run format:check  # Check Prettier formatting
npm test              # Run all tests (Vitest)
npm run test:coverage # Run tests with coverage report
npm run build         # Production build
npm run preview       # Preview production build locally
```

### Deployment

```bash
npm run deploy        # Build and deploy to GitHub Pages
```

---

## Project Architecture

```
src/
├── main.jsx                    # App entry point
├── App.jsx                     # Root component, layout
├── i18n.js                     # i18next config (ru, ua, pl, en, by)
│
├── Components/
│   ├── Header/
│   │   ├── Header.jsx          # Top bar with logo, contacts, language switcher
│   │   ├── Burger.jsx          # Mobile navigation (backdrop, scroll lock, Esc)
│   │   ├── LanguageSwitcher.jsx
│   │   ├── Logo.jsx
│   │   └── Contacts.jsx
│   │
│   ├── Main_page/
│   │   ├── Main_page.jsx       # Page layout — assembles all sections
│   │   ├── Slider.jsx          # Hero carousel with CTA overlay
│   │   ├── TrustBar.jsx        # Social proof metrics
│   │   ├── Pricelist.jsx       # Pricing / reasons section
│   │   ├── MainPageSections.jsx# Benefits + content cards
│   │   ├── MainService.jsx     # Accordion service catalog
│   │   ├── Team.jsx            # Team member gallery (WebP)
│   │   ├── Promotions.jsx      # Current promotions
│   │   ├── Menu.jsx            # Quick navigation links
│   │   ├── LeedForm.jsx        # Primary lead capture form
│   │   ├── FeedBackForm.jsx    # Feedback form (in modal)
│   │   ├── ContactModal.jsx    # Contact dialog (messengers + form)
│   │   ├── Modal.jsx           # Generic reusable modal
│   │   ├── ThankYou.jsx        # Post-submission confirmation
│   │   └── CookieConsent.jsx   # GDPR cookie banner
│   │
│   ├── Footer/
│   │   └── Footer.jsx          # Footer with contacts, copyright
│   │
│   └── images/                 # Static assets (WebP, SVG, PNG)
│
├── services/
│   ├── telegram.js             # Telegram Bot API (send lead, AbortController timeout)
│   ├── viber.js                # Viber deep-link helper
│   ├── analytics.js            # Conversion tracking (gtag)
│   └── validation.js           # Form validation (name, phone)
│
├── features/
│   └── lead-form/
│       └── useLeadForm.js      # Lead form business logic hook
│
└── test/                       # Test setup and utilities
```

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run format` | Prettier format all source files |
| `npm run format:check` | Prettier check (CI-friendly) |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with V8 coverage |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_TELEGRAM_BOT_TOKEN` | Yes | Telegram Bot API token (from [@BotFather](https://t.me/BotFather)) |
| `VITE_TELEGRAM_CHAT_ID` | Yes | Target chat ID for leads (from [@userinfobot](https://t.me/userinfobot)) |

---

## License

This project is private and not licensed for redistribution.
