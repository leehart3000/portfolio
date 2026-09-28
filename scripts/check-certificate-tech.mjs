// Read-only check: for each certificate that includes other certificates,
// lists any tech used by its parts that isn't in its own tech list.
// Run from the project folder with: node scripts/check-certificate-tech.mjs
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
  // Inline form: tech: ["A", "B"]
  const inline = fm.match(/^tech:\s*\[(.*)\]\s*$/m);
  if (inline) return inline[1].split(',').map(unquote).filter(Boolean);
  // List form:
  // tech:
  //   - "A"
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
    if (/^\S/.test(line)) break; // next top-level field
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

let problems = 0;
for (const [slug, cert] of Object.entries(certs)) {
  if (cert.related.length === 0) continue;
  const own = new Set(cert.tech);
  const missing = new Map(); // tech -> [child slugs]
  for (const childSlug of cert.related) {
    const child = certs[childSlug];
    if (!child) continue;
    for (const t of child.tech) {
      if (!own.has(t)) missing.set(t, [...(missing.get(t) ?? []), childSlug]);
    }
  }
  if (missing.size === 0) {
    console.log(`OK    ${slug}`);
    continue;
  }
  problems += missing.size;
  console.log(`\nCHECK ${slug}.md is missing:`);
  for (const [t, from] of [...missing].sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  - "${t}"   (from: ${from.join(', ')})`);
  }
  console.log('');
}

console.log(problems === 0 ? '\nAll parent certificates cover their parts\' tech.' : `\n${problems} missing tech entries found.`);
