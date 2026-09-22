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
const socialImagePath = '/images/social-preview.png';
const socialImage = await readFile(path.join(root, socialImagePath));
assert.equal(socialImage.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Social preview must be a PNG');
assert.equal(socialImage.readUInt32BE(16), 1200, 'Social preview width must match its metadata');
assert.equal(socialImage.readUInt32BE(20), 630, 'Social preview height must match its metadata');
for (const route of ['index.html', 'work/index.html', 'projects/index.html', 'about/index.html', 'projects/pathway/index.html', 'projects/patient-access-orchestration/index.html', 'projects/what-i-made/index.html', 'projects/interlude/index.html', 'projects/table-for-one/index.html', '404.html']) {
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
  const meta = (key) => html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]+)"`))?.[1];
  const socialUrl = new URL(meta('og:image'));
  assert.equal(socialUrl.pathname, `${base}${socialImagePath}`, `${relative}: social image must respect the configured base`);
  assert(['http:', 'https:'].includes(socialUrl.protocol), `${relative}: social image must use an absolute HTTP URL`);
  if (process.env.SITE_URL) assert.equal(socialUrl.origin, new URL(origin).origin, `${relative}: social image must use the configured site origin`);
  assert.equal(meta('og:image:type'), 'image/png', `${relative}: incorrect social image type`);
  assert.equal(meta('og:image:width'), '1200', `${relative}: incorrect social image width`);
  assert.equal(meta('og:image:height'), '630', `${relative}: incorrect social image height`);
  assert(meta('og:image:alt'), `${relative}: social image needs alt text`);
  assert.equal(meta('twitter:card'), 'summary_large_image', `${relative}: expected large social card`);
  assert.equal(meta('twitter:image'), socialUrl.href, `${relative}: social image URLs differ`);
  assert.equal(meta('twitter:image:alt'), meta('og:image:alt'), `${relative}: social image descriptions differ`);
  assert(html.includes('id="main"'), `${relative}: missing main landmark target`);
  assert(!/href="(?:javascript:|#")/.test(html), `${relative}: invalid action`);
  assert(!/\b\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/.test(html), `${relative}: possible private telephone number`);
  if (!new URL(origin).hostname.endsWith('kaitakeuchi.com')) {
    // Client scripts can contain the analytics hostname allowlist even in a local build.
    const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    assert(!markup.includes('kaitakeuchi.com'), `${relative}: unconfigured custom domain`);
  }
  const analyticsId = process.env.PUBLIC_UMAMI_WEBSITE_ID?.trim();
  const analyticsEnabled = analyticsId && ['https://kaitakeuchi.com', 'https://www.kaitakeuchi.com'].includes(new URL(origin).origin) &&
    !html.includes('name="robots" content="noindex"');
  assert.equal(meta('umami-website-id'), analyticsEnabled ? analyticsId : undefined, `${relative}: analytics activation mismatch`);
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    assert(/alt="[^"]+"/.test(img[0]), `${relative}: image needs meaningful alt text`);
    assert(/width="\d+"/.test(img[0]) && /height="\d+"/.test(img[0]), `${relative}: image dimensions missing`);
  }
  for (const anchor of html.matchAll(/<a\s[^>]*>/g)) {
    const attribute = name => anchor[0].match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
    const href = attribute('href')?.replaceAll('&amp;', '&');
    if (!href) continue;
    const destination = new URL(href, url);
    const external = /^https?:$/.test(destination.protocol) && destination.origin !== url.origin;
    if (external) {
      assert.equal(attribute('target'), '_blank', `${relative}: external link must open a new tab: ${href}`);
      const rel = new Set((attribute('rel') || '').split(/\s+/));
      assert(rel.has('noopener') && rel.has('noreferrer'), `${relative}: missing external link protection: ${href}`);
    } else {
      assert.notEqual(attribute('target'), '_blank', `${relative}: internal navigation must stay in the current tab: ${href}`);
    }
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) await checkLink(match[1], relative, url);
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) await checkLink(candidate.trim().split(/\s+/)[0], relative, url);
  }
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
const listing = await readFile(path.join(root, 'projects/index.html'), 'utf8');
const professionalStart = listing.indexOf('id="professional"');
const personalStart = listing.indexOf('id="personal"');
assert(professionalStart >= 0 && personalStart > professionalStart, 'Project category sections are missing or out of order');
for (const [category, slugs] of Object.entries({professional: ['patient-access-orchestration', 'ai-evaluation-governance-lab', 'pathway'], personal: ['what-i-made', 'interlude', 'table-for-one']})) {
  const section = category === 'professional' ? listing.slice(professionalStart, personalStart) : listing.slice(personalStart);
  let previousCard = -1;
  for (const slug of slugs) {
    assert.equal(listing.split(`data-project="${slug}"`).length - 1, 1, `${slug}: expected exactly one listing card`);
    assert(section.includes(`data-project="${slug}" data-category="${category}"`), `${slug}: wrong category`);
    const cardPosition = section.indexOf(`data-project="${slug}"`);
    assert(cardPosition > previousCard, `${slug}: incorrect project order`);
    previousCard = cardPosition;
    const detail = await readFile(path.join(root, 'projects', slug, 'index.html'), 'utf8');
    assert(detail.includes('class="architecture-flow"') && detail.includes('class="technology-stack"'), `${slug}: missing architecture or stack`);
    assert(detail.includes('Decisions and design lessons') && detail.includes('Current state and next step'), `${slug}: missing decisions or status`);
    assert(!/Reflection in progress|Case study forthcoming|Project preview forthcoming/.test(detail), `${slug}: placeholder narrative`);
    if (['interlude', 'table-for-one'].includes(slug)) {
      assert(!detail.includes('aria-label="Explore this project"'), `${slug}: unverified public project action`);
    }
  }
}
assert(!listing.includes('github.com/ktakeuchi21/patient-access-ai'), 'The private repository must not become a public action');
console.log(`Verified ${pages.length} pages and ${checked} local asset/link targets at ${base || '/'}. Metadata, images, drafts, and résumé removal passed.`);
