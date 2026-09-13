import { writeFile, readFile, unlink, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

const fixtures = [
  { collection: 'projects', extra: 'type: personal\nlabel: Verification fixture' },
  { collection: 'work', extra: 'type: professional\norganization: Fictional test organization\nrole: Verification only' },
];
const created = [];
const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };
const run = script => execFileSync('npm', ['run', script], { env, stdio: 'inherit' });

try {
  for (const fixture of fixtures) {
    const file = `src/content/${fixture.collection}/verification-fixture.mdx`;
    const exists = await stat(file).then(() => true, () => false);
    assert(!exists, `Refusing to overwrite ${file}`);
    await writeFile(file, `---\ntitle: Content extension verification\nslug: verification-fixture\nsummary: A temporary entry proving automatic route and card generation.\n${fixture.extra}\ndraft: false\nfeatured: false\n---\n\n## Verification narrative\n\nThis temporary page is removed when the verification finishes.\n`, {flag: 'wx'});
    created.push(file);
  }
  run('build');
  run('verify:build');
  for (const { collection } of fixtures) {
    const listing = await readFile(`dist/${collection}/index.html`, 'utf8');
    const detail = await readFile(`dist/${collection}/verification-fixture/index.html`, 'utf8');
    assert(listing.includes('verification-fixture/'), `${collection}: no generated card link`);
    assert(detail.includes('Verification narrative'), `${collection}: body not rendered`);
  }
  console.log('New personal and professional MDX entries both generated listing cards and detail pages without custom route files.');
} finally {
  for (const file of created) await unlink(file);
  // Restore the real deliverable, even if a fixture assertion failed.
  if (created.length) { run('build'); run('verify:build'); }
}
