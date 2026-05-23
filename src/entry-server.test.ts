import { describe, it, expect } from 'vitest';
import { render } from './entry-server';

// Guards the prerender pipeline: if a component starts throwing during a
// server render (or i18n setup breaks), this fails in CI before the broken
// build ships.
describe('entry-server render (prerender)', () => {
  it('produces a substantial static HTML string for the app shell', async () => {
    const { html } = await render();
    expect(html.length).toBeGreaterThan(1000);
    expect(html).toContain('class="App"');
    expect(html).toContain('<header');
  });

  it('returns a localised title and description per language', async () => {
    const pl = await render('pl');
    const en = await render('en');
    expect(pl.title).toContain('Karta pobytu');
    expect(en.title).toMatch(/Residence card/i);
    expect(pl.description).not.toBe(en.description);
  });
});
