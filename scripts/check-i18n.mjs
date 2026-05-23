/**
 * i18n parity guard.
 *
 * Loads every locale bundle, flattens it to a set of dotted key paths, and
 * fails (exit 1) if any locale is missing keys the others have. Keeps the five
 * translations in lockstep so a missing key never silently falls back to the
 * default language in production.
 *
 * Run locally with `npm run check:i18n`; CI runs it on every push/PR.
 */

import { build } from 'esbuild';
import { pathToFileURL } from 'node:url';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const LOCALES = ['ru', 'pl', 'ua', 'en', 'by'];
const LOCALES_DIR = resolve(process.cwd(), 'src/i18n/locales');

/** Recursively collect dotted key paths (arrays/leaves terminate a path). */
function flatten(obj, prefix = '', out = new Set()) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out.add(key);
  }
  return out;
}

async function loadLocale(name, tmp) {
  const res = await build({
    entryPoints: [join(LOCALES_DIR, `${name}.ts`)],
    bundle: true,
    format: 'esm',
    write: false,
    logLevel: 'silent',
  });
  const file = join(tmp, `${name}.mjs`);
  writeFileSync(file, res.outputFiles[0].text);
  const mod = await import(pathToFileURL(file).href);
  return flatten(mod.default);
}

async function main() {
  const tmp = mkdtempSync(join(tmpdir(), 'i18n-check-'));
  try {
    const sets = {};
    for (const name of LOCALES) sets[name] = await loadLocale(name, tmp);

    const union = new Set();
    for (const name of LOCALES) for (const key of sets[name]) union.add(key);

    let failed = false;
    for (const name of LOCALES) {
      const missing = [...union].filter((key) => !sets[name].has(key)).sort();
      if (missing.length > 0) {
        failed = true;
        console.error(`\n✗ [${name}] missing ${missing.length} key(s):`);
        for (const key of missing) console.error(`    - ${key}`);
      }
    }

    if (failed) {
      console.error('\ni18n parity check FAILED: locales are out of sync.\n');
      process.exit(1);
    }
    console.log(`✓ i18n parity OK: all ${LOCALES.length} locales share ${union.size} keys.`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error('i18n check crashed:', err);
  process.exit(1);
});
