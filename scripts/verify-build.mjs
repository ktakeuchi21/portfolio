import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
const origin = process.env.SITE_URL || 'https://verification.invalid';
let checked = 0;

async function walk(directory) {
  const children = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(children.map(child => child.isDirectory() ? walk(path.join(directory, child.name)) : path.join(directory, child.name)))).flat();
}

const files = await walk(root);
const pages = files.filter(file => file.endsWith('.html'));
for (const route of ['index.html', 'work/index.html', 'projects/index.html', 'about/index.html', 'projects/pathway/index.html', '404.html']) {
  assert(files.includes(path.join(root, route)), `Missing required page: ${route}`);
}

async function checkLink(raw, source, sourceUrl) {
  const value = raw.replaceAll('&amp;', '&');
  if (/^(?:https?:|mailto:|data:|tel:)/.test(value)) return;
  assert(value && value !== '#', `${source}: empty or placeholder link`);
  const url = new URL(value, sourceUrl);
  if (url.origin !== new URL(origin).origin) return;
  assert(url.pathname === base || url.pathname.startsWith(`${base}/`), `${source}: escapes configured base: ${value}`);
  let target = path.join(root, decodeURIComponent(url.pathname.slice(base.length)));
  assert(target.startsWith(`${root}${path.sep}`) || target === root, 'Path escapes output directory');
  let info;
  try { info = await stat(target); } catch { assert.fail(`${source}: missing local target ${value}`); }
  if (info.isDirectory()) target = path.join(target, 'index.html');
  await stat(target).catch(() => assert.fail(`${source}: missing index for ${value}`));
  if (url.hash && target.endsWith('.html')) {
    const html = await readFile(target, 'utf8');
    const id = decodeURIComponent(url.hash.slice(1));
    assert(html.includes(`id="${id}"`), `${source}: missing fragment ${value}`);
  }
  checked++;
}

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const route = relative.replace(/index\.html$/, '');
  const url = new URL(`${base}/${route}`, origin);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${relative}: expected one h1`);
  assert(html.includes('lang="en"'), `${relative}: missing language`);
  assert(html.includes('name="description"'), `${relative}: missing description`);
  assert(html.includes('property="og:title"'), `${relative}: missing sharing metadata`);
  assert(html.includes('id="main"'), `${relative}: missing main landmark target`);
  assert(!/href="(?:javascript:|#")/.test(html), `${relative}: invalid action`);
  assert(!/\b\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/.test(html), `${relative}: possible private telephone number`);
  if (!new URL(origin).hostname.endsWith('kaitakeuchi.com')) {
    assert(!html.includes('kaitakeuchi.com'), `${relative}: unconfigured custom domain`);
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/alt="[^"]+"/.test(img[0]), `${relative}: image needs meaningful alt text`);
    assert(/width="\d+"/.test(img[0]) && /height="\d+"/.test(img[0]), `${relative}: image dimensions missing`);
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) await checkLink(match[1], relative, url);
  if (process.env.SITE_URL && relative !== '404.html') {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonical?.[1], url.href, `${relative}: incorrect canonical URL`);
  } else if (!process.env.SITE_URL) {
    assert(!html.includes('rel="canonical"'), `${relative}: local build should omit canonical`);
  }
}

for (const file of files.filter(file => file.endsWith('.css'))) {
  const css = await readFile(file, 'utf8');
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  for (const match of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
    await checkLink(match[1], relative, new URL(`${base}/${relative}`, origin));
  }
}

// Derive route expectations from the actual frontmatter, including newly added entries.
for (const collection of ['projects', 'work']) {
  for (const file of (await walk(path.resolve('src/content', collection))).filter(file => /\.mdx?$/.test(file))) {
    const source = await readFile(file, 'utf8');
    const slug = source.match(/^slug:\s*(.+)$/m)?.[1].trim();
    const published = /^draft:\s*false\s*$/m.test(source);
    const output = path.join(root, collection, slug || '', 'index.html');
    assert.equal(files.includes(output), published, `${file}: draft route visibility mismatch`);
  }
}

assert(!files.includes(path.join(root, 'resume/index.html')), 'The résumé page is intentionally removed');
assert(files.every(file => !/Amgen.*\.pdf$/i.test(file)), 'An application PDF must not be published');
console.log(`Verified ${pages.length} pages and ${checked} local asset/link targets at ${base || '/'}. Metadata, images, drafts, and résumé removal passed.`);
