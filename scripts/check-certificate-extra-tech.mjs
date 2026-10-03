// Read-only check: for each certificate that includes other certificates,
// lists any tech in its own tech list that none of its parts mention.
// These aren't necessarily wrong (the main certificate may cover extra
// material), but they're worth a look.
//
// Run from the project folder with: node scripts/check-certificate-extra-tech.mjs
// It only reads files. It never changes anything.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/certificates';

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}

function unquote(s) {
  return s.trim().replace(/^["']|["']$/g, '');
}

function readTech(fm) {
  const inline = fm.match(/^tech:\s*\[(.*)\]\s*$/m);
  if (inline) return inline[1].split(',').map(unquote).filter(Boolean);
  const block = fm.match(/^tech:\s*\r?\n((?:[ \t]+-.*\r?\n?)*)/m);
  if (!block) return [];
  return block[1].split(/\r?\n/).map((l) => l.replace(/^\s*-\s*/, '')).map(unquote).filter(Boolean);
}

function readRelatedSlugs(fm) {
  const start = fm.search(/^relatedCertificates:/m);
  if (start === -1) return [];
  const rest = fm.slice(start).split(/\r?\n/).slice(1);
  const slugs = [];
  for (const line of rest) {
    if (/^\S/.test(line)) break;
    const m = line.match(/^\s*-?\s*slug:\s*(.+)$/);
    if (m) slugs.push(unquote(m[1]));
  }
  return slugs;
}

const certs = {};
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const fm = frontmatter(readFileSync(join(dir, file), 'utf8'));
  certs[file.replace(/\.md$/, '')] = { tech: readTech(fm), related: readRelatedSlugs(fm) };
}

let total = 0;
for (const [slug, cert] of Object.entries(certs)) {
  if (cert.related.length === 0) continue;

  const foundParts = cert.related.filter((s) => certs[s]);
  const missingParts = cert.related.filter((s) => !certs[s]);
  const childTech = new Set(foundParts.flatMap((s) => certs[s].tech));
  const extra = cert.tech.filter((t) => !childTech.has(t)).sort((a, b) => a.localeCompare(b));

  if (extra.length === 0) {
    console.log(`OK    ${slug}`);
  } else {
    total += extra.length;
    console.log(`\nCHECK ${slug}.md has tech that none of its parts mention:`);
    for (const t of extra) console.log(`  - "${t}"`);
  }
  if (missingParts.length > 0) {
    console.log(`  (Note: ${missingParts.length} of its parts aren't published .md files yet, so they weren't checked: ${missingParts.join(', ')})`);
  }
  if (extra.length > 0) console.log('');
}

console.log(total === 0
  ? '\nEvery main certificate\'s tech appears in at least one of its parts.'
  : `\n${total} tech entries found only on the main certificate.`);
