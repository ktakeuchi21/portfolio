import { writeFile, readFile, unlink, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

const fixtures = [
  { collection: 'projects', slug: 'verification-personal', extra: 'category: personal\nownership: independent\nstatus: in-development\nrole: Verification only\naudience: Test readers' },
  { collection: 'projects', slug: 'verification-professional', extra: 'category: professional\nownership: independent\nstatus: public-demo\nrole: Verification only\naudience: Test readers' },
  { collection: 'work', slug: 'verification-work', extra: 'type: professional\norganization: Fictional test organization\nrole: Verification only' },
];
const created = [];
const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };
const run = script => execFileSync('npm', ['run', script], { env, stdio: 'inherit' });

try {
  for (const fixture of fixtures) {
    const file = `src/content/${fixture.collection}/${fixture.slug}.mdx`;
    const exists = await stat(file).then(() => true, () => false);
    assert(!exists, `Refusing to overwrite ${file}`);
    await writeFile(file, `---\ntitle: Content extension verification\nslug: ${fixture.slug}\nsummary: A temporary entry proving automatic route and card generation.\n${fixture.extra}\ndraft: false\nfeatured: false\n---\n\n## Verification narrative\n\nThis temporary page is removed when the verification finishes.\n`, {flag: 'wx'});
    created.push(file);
  }
  run('build');
  run('verify:build');
  for (const { collection, slug } of fixtures) {
    const listing = await readFile(`dist/${collection}/index.html`, 'utf8');
    const detail = await readFile(`dist/${collection}/${slug}/index.html`, 'utf8');
    assert(listing.includes(`${slug}/`), `${collection}: no generated card link`);
    assert(detail.includes('Verification narrative'), `${collection}: body not rendered`);
  }
  console.log('Both project categories and employer Work generated cards and detail pages without custom routes. In-development projects can have published narratives.');
} finally {
  for (const file of created) await unlink(file);
  // Restore the real deliverable, even if a fixture assertion failed.
  if (created.length) { run('build'); run('verify:build'); }
}
