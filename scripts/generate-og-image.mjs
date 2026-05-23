/**
 * Open Graph banner generator.
 *
 * Renders a branded 1200x630 social-share image (public/og-image.jpg) from an
 * inline SVG via sharp. Kept in the repo so the banner is reproducible and
 * editable as code instead of an opaque exported asset.
 *
 * Run with: npm run og
 */

import sharp from 'sharp';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), 'public/og-image.jpg');
const W = 1200;
const H = 630;

const NAVY = '#16202e';
const NAVY_DARK = '#0e1620';
const GOLD = '#b8943e';
const GOLD_LIGHT = '#d8b15f';
const WHITE = '#ffffff';
const MUTED = '#aeb9c7';
const FONT = "'Liberation Sans','Noto Sans','DejaVu Sans',sans-serif";

/** A gold check-disc with a white tick at (x, y). */
function check(x, y) {
  return `
    <circle cx="${x}" cy="${y}" r="15" fill="${GOLD}"/>
    <path d="M ${x - 7} ${y} l 5 5 l 9 -10" fill="none" stroke="${WHITE}"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
}

const benefits = [
  'Карта временного и постоянного пребывания',
  'Воссоединение семьи · бизнес-визы',
  'Гарантия возврата средств',
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_DARK}"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD_LIGHT}"/>
      <stop offset="1" stop-color="${GOLD}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- soft depth accents -->
  <circle cx="1050" cy="120" r="320" fill="${GOLD}" opacity="0.06"/>
  <circle cx="1180" cy="560" r="220" fill="${GOLD}" opacity="0.05"/>
  <rect x="0" y="0" width="10" height="${H}" fill="url(#gold)"/>

  <!-- brand -->
  <g transform="translate(70,78)">
    <rect x="0" y="-2" width="34" height="34" rx="7" fill="url(#gold)"/>
    <text x="14" y="22" font-family="${FONT}" font-size="22" font-weight="800" fill="${NAVY}" text-anchor="middle">LL</text>
    <text x="52" y="24" font-family="${FONT}" font-size="30" font-weight="700" letter-spacing="6" fill="${WHITE}">LEGAL LINE</text>
  </g>

  <!-- headline -->
  <text x="68" y="250" font-family="${FONT}" font-size="88" font-weight="800" fill="${WHITE}" letter-spacing="1">KARTA POBYTU</text>
  <rect x="72" y="278" width="128" height="7" rx="3.5" fill="url(#gold)"/>
  <text x="70" y="328" font-family="${FONT}" font-size="33" font-weight="500" fill="${MUTED}">Легализация в Гданьске — под ключ</text>

  <!-- benefits -->
  <g font-family="${FONT}" font-size="27" font-weight="500" fill="#e7ecf3">
    ${benefits
      .map((b, i) => {
        const y = 400 + i * 50;
        return `${check(86, y - 8)}<text x="116" y="${y}">${b}</text>`;
      })
      .join('\n    ')}
  </g>

  <!-- price pill -->
  <g transform="translate(70,548)">
    <rect x="0" y="0" width="232" height="58" rx="29" fill="url(#gold)"/>
    <text x="116" y="39" font-family="${FONT}" font-size="30" font-weight="800" fill="${NAVY}" text-anchor="middle">от 750 zł</text>
    <text x="252" y="38" font-family="${FONT}" font-size="22" font-weight="500" fill="${MUTED}">первая консультация — бесплатно</text>
  </g>

  <!-- residence-card motif -->
  <g transform="translate(1022,318) rotate(-8)">
    <rect x="-165" y="-108" width="330" height="216" rx="20" fill="#ffffff" opacity="0.97"/>
    <rect x="-165" y="-108" width="330" height="216" rx="20" fill="none" stroke="${GOLD}" stroke-width="2"/>
    <rect x="-165" y="-108" width="330" height="50" rx="20" fill="${NAVY}"/>
    <rect x="-165" y="-78" width="330" height="20" fill="${NAVY}"/>
    <text x="-145" y="-75" font-family="${FONT}" font-size="17" font-weight="700" letter-spacing="2" fill="${GOLD_LIGHT}">KARTA POBYTU</text>
    <circle cx="-110" cy="0" r="40" fill="#e7ecf3"/>
    <circle cx="-110" cy="-12" r="15" fill="#c2ccd8"/>
    <path d="M -134 22 a 24 20 0 0 1 48 0 z" fill="#c2ccd8"/>
    <rect x="-48" y="-30" width="190" height="13" rx="6.5" fill="#d9e0e8"/>
    <rect x="-48" y="-4" width="160" height="13" rx="6.5" fill="#d9e0e8"/>
    <rect x="-48" y="22" width="120" height="13" rx="6.5" fill="#d9e0e8"/>
    <rect x="-40" y="58" width="56" height="38" rx="6" fill="url(#gold)"/>
  </g>

  <!-- footer -->
  <text x="${W - 70}" y="600" font-family="${FONT}" font-size="26" font-weight="700" fill="${GOLD_LIGHT}" text-anchor="end">legalline.pl</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 92, mozjpeg: true }).toFile(OUT);
console.log(`og-image written: ${OUT} (${W}x${H})`);
