// Adds tech from included certificates to their main certificate.
//
// For each certificate with relatedCertificates, any tech listed by its parts
// but missing from its own tech list is added to the end of that list.
//
// Safe by default: without --write it only PRINTS what it would change.
//
//   Preview:  node scripts/fill-certificate-tech.mjs
//   Apply:    node scripts/fill-certificate-tech.mjs --write
//
// Only .md files are read and changed. .txt drafts are ignored.
// Only the tech list is changed. Everything else in each file is left as it is.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/certificates';
const write = process.argv.includes('--write');

function unquote(s) {
  return s.trim().replace(/^["']|["']$/g, '');
}

function splitFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  return { fm: m[1], start: m[0].indexOf(m[1]), end: m[0].indexOf(m[1]) + m[1].length };
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

// Returns the frontmatter with `toAdd` appended to the tech list, keeping its style.
function addTech(fm, toAdd) {
  // Names are copied exactly as written in the part's file, so any escaping is kept.
  const q = (t) => `"${t}"`;

  // Inline: tech: ["A", "B"]  ->  tech: ["A", "B", "C"]
  const inline = fm.match(/^(tech:\s*\[)(.*)(\]\s*)$/m);
  if (inline) {
    const existing = inline[2].trim();
    const joined = (existing ? existing + ', ' : '') + toAdd.map(q).join(', ');
    return fm.replace(inline[0], `${inline[1]}${joined}${inline[3]}`);
  }

  // Block list: add new "  - X" lines after the last existing item.
  const block = fm.match(/^tech:[ \t]*\r?\n((?:[ \t]+-.*(?:\r?\n|$))*)/m);
  if (block) {
    const nl = fm.includes('\r\n') ? '\r\n' : '\n';
    const items = block[1];
    const indent = (items.match(/^([ \t]+)-/) ?? [, '  '])[1];
    const newLines = toAdd.map((t) => `${indent}- ${q(t)}`).join(nl);
    const endsWithNl = /\r?\n$/.test(items);
    const replacement =
      block[0].slice(0, block[0].length - items.length) +
      (items ? (endsWithNl ? items : items + nl) : '') +
      newLines +
      (endsWithNl ? nl : '');
    return fm.replace(block[0], replacement);
  }

  // No tech field found: leave the file alone.
  return null;
}

const files = readdirSync(dir).filter((f) => f.endsWith('.md'));
const certs = {};
for (const file of files) {
  const text = readFileSync(join(dir, file), 'utf8');
  const parts = splitFrontmatter(text);
  if (!parts) continue;
  certs[file.replace(/\.md$/, '')] = {
    file,
    text,
    parts,
    tech: readTech(parts.fm),
    related: readRelatedSlugs(parts.fm),
  };
}

let changedFiles = 0;
let addedCount = 0;

for (const [slug, cert] of Object.entries(certs)) {
  if (cert.related.length === 0) continue;
  const own = new Set(cert.tech);
  const missing = new Set();
  for (const childSlug of cert.related) {
    for (const t of certs[childSlug]?.tech ?? []) {
      if (!own.has(t)) missing.add(t);
    }
  }
  if (missing.size === 0) continue;

  const toAdd = [...missing].sort((a, b) => a.localeCompare(b));
  const newFm = addTech(cert.parts.fm, toAdd);
  if (newFm === null) {
    console.log(`SKIP  ${cert.file}: couldn't find its tech list, so left it alone.`);
    continue;
  }

  console.log(`${write ? 'ADDED' : 'WOULD ADD'} to ${cert.file}:`);
  for (const t of toAdd) console.log(`  + "${t}"`);
  console.log('');

  if (write) {
    const { start, end } = cert.parts;
    writeFileSync(join(dir, cert.file), cert.text.slice(0, start) + newFm + cert.text.slice(end));
  }
  changedFiles++;
  addedCount += toAdd.length;
}

if (changedFiles === 0) {
  console.log('Nothing to add. All main certificates already cover their parts\' tech.');
} else if (write) {
  console.log(`Done: added ${addedCount} tech entries to ${changedFiles} files.`);
  console.log('Check with: git diff src/content/certificates/');
} else {
  console.log(`Preview only: ${addedCount} tech entries would be added to ${changedFiles} files.`);
  console.log('Nothing has been changed. To apply, run again with --write');
}
