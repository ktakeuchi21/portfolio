import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/analytics.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
const websiteId = '11111111-1111-4111-8111-111111111111';

function harness({ href = 'https://kaitakeuchi.com/projects/?utm_source=linkedin&private=value#personal', storage = {}, dnt, gpc, hidden = false, storageError = false } = {}) {
  const events = [];
  const scripts = [];
  const timers = new Map();
  let now = 0;
  let nextTimer = 0;
  class Target {
    listeners = new Map();
    addEventListener(name, callback) {
      const callbacks = this.listeners.get(name) || [];
      callbacks.push(callback);
      this.listeners.set(name, callbacks);
    }
    dispatch(name, props = {}) { for (const callback of this.listeners.get(name) || []) callback({ type: name, ...props }); }
  }
  class Element extends Target {
    dataset = {};
    removed = false;
    remove() { this.removed = true; }
    closest() { return this; }
    getAttribute() { return null; }
  }
  const document = Object.assign(new Target(), {
    hidden, title: 'Projects | Kai Takeuchi', referrer: 'https://www.linkedin.com/feed/?private=secret',
    documentElement: { scrollHeight: 2000 },
    head: { append: script => scripts.push(script) }, createElement: () => new Element(),
  });
  const setTimeout = (fn, delay) => { const id = ++nextTimer; timers.set(id, { at: now + delay, fn }); return id; };
  const clearTimeout = id => timers.delete(id);
  const window = Object.assign(new Target(), { setTimeout, innerHeight: 800, scrollY: 0 });
  const context = vm.createContext({
    exports: {}, URL, URLSearchParams, window, document, Element,
    location: new URL(href), navigator: { language: 'en-US', doNotTrack: dnt, globalPrivacyControl: gpc },
    localStorage: {
      getItem: key => { if (storageError) throw Error('Storage blocked'); return storage[key] ?? null; },
      setItem: (key, value) => { storage[key] = value; }, removeItem: key => { delete storage[key]; },
    },
    performance: { now: () => now }, screen: { width: 1440, height: 900 }, setTimeout, clearTimeout,
  });
  vm.runInContext(compiled, context);
  context.exports.startAnalytics(websiteId);
  async function flush() { for (let i = 0; i < 50; i++) await Promise.resolve(); }
  async function load() {
    window.umami = { track: async payload => { events.push(JSON.parse(JSON.stringify(payload))); } };
    scripts[0].dispatch('load');
    await flush();
  }
  async function advance(ms) {
    const until = now + ms;
    while (true) {
      const next = [...timers.entries()].filter(([, timer]) => timer.at <= until).sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      timers.delete(next[0]); now = next[1].at; next[1].fn();
    }
    now = until;
    await flush();
  }
  return { context, events, scripts, document, window, Element, storage, load, advance, flush };
}

// Local/preview/spoofed origins never load a tracker or collect a view.
for (const href of ['http://localhost:4324/', 'http://127.0.0.1:4324/', 'https://preview.example.com/', 'https://kaitakeuchi.com.evil.example/', 'http://kaitakeuchi.com/', 'https://kaitakeuchi.com:444/']) {
  assert.equal(harness({ href }).scripts.length, 0, href);
}
for (const option of [{ storage: { 'umami.disabled': '1' } }, { dnt: '1' }, { gpc: true }, { storageError: true }, { href: 'https://kaitakeuchi.com/?analytics=off' }]) {
  assert.equal(harness(option).scripts.length, 0, JSON.stringify(option));
}
const enabled = harness({ href: 'https://kaitakeuchi.com/?analytics=on', storage: { 'umami.disabled': '1' } });
assert.equal(enabled.scripts.length, 1);
assert.equal(enabled.storage['umami.disabled'], undefined);

const page = harness();
assert.equal(page.scripts.length, 1);
assert.equal(page.scripts[0].dataset.autoTrack, 'false');
page.document.dispatch('portfolio:project-category', { detail: 'Everyday life' });
await page.load();
assert.equal(page.events.length, 2, 'Preload category selection should follow exactly one page view');
assert.equal(page.events[0].name, undefined);
assert.equal(page.events[0].url, '/projects/?utm_source=linkedin');
assert.equal(page.events[0].referrer, 'https://www.linkedin.com');
assert.equal(page.events[1].data.category, 'Everyday life');
assert(!JSON.stringify(page.events).includes('private'));
page.document.dispatch('portfolio:project-category', { detail: 'untrusted-value' });
await page.flush();
assert.equal(page.events.length, 2);

const outbound = Object.assign(new page.Element(), { href: 'https://github.com/ktakeuchi21/portfolio?token=secret#readme', textContent: '  View\n GitHub  ' });
page.document.dispatch('click', { target: outbound, button: 0 });
page.document.dispatch('auxclick', { target: outbound, button: 1 });
page.document.dispatch('auxclick', { target: outbound, button: 2 });
page.document.dispatch('click', { target: Object.assign(new page.Element(), { href: 'https://kaitakeuchi.com/about/' }) });
await page.flush();
assert.equal(page.events.filter(event => event.name === 'outbound-link').length, 2);
assert.deepEqual(page.events[2].data, { destination: 'https://github.com/ktakeuchi21/portfolio', label: 'View GitHub' });

await page.advance(20000);
page.document.hidden = true;
page.document.dispatch('visibilitychange');
await page.advance(120000);
assert.equal(page.events.filter(event => event.name?.startsWith('visible-')).length, 0, 'Background time must not count');
page.document.hidden = false;
page.document.dispatch('visibilitychange');
await page.advance(10000);
assert.equal(page.events.filter(event => event.name === 'visible-30s').length, 1);
await page.advance(30000);
await page.advance(60000);
assert.equal(page.events.filter(event => event.name === 'visible-60s').length, 1);
page.window.scrollY = 899;
page.window.dispatch('scroll');
await page.flush();
assert.equal(page.events.filter(event => event.name === 'scroll-75').length, 0);
page.window.scrollY = 900;
page.window.dispatch('scroll');
page.window.dispatch('scroll');
await page.flush();
assert.equal(page.events.filter(event => event.name === 'scroll-75').length, 1);

page.storage['umami.disabled'] = '1';
const before = page.events.length;
page.document.dispatch('click', { target: outbound, button: 0 });
await page.flush();
assert.equal(page.events.length, before, 'Opting out during a visit stops collection');

const timeout = harness();
await timeout.advance(10001);
assert(timeout.scripts[0].removed);
await timeout.load();
assert.equal(timeout.events.length, 0, 'Late script load must not replay a timed-out queue');
const blocked = harness();
blocked.scripts[0].dispatch('error');
await blocked.load();
assert.equal(blocked.events.length, 0);

console.log('Analytics checks passed: production-only loading, preferences, sanitized payloads, page/event ordering, outbound clicks, category events, visible-time milestones, scroll deduplication, and tracker failure handling.');
