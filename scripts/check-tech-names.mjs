// Read-only check for tech names. It fails (exit code 1) if:
//   - two tech names differ only in upper/lower case, e.g. "just" and "Just"
//   - a project, employment or certificate uses a tech name that has no
//     tech file with exactly that name
// Run from the project folder with: node scripts/check-tech-names.mjs
// It only reads files. It never changes anything.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

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

function mdFiles(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ file: join(dir, f), fm: frontmatter(readFileSync(join(dir, f), 'utf8')) }));
}

// Names defined in the tech files.
const defined = new Map(); // name -> file
for (const { file, fm } of mdFiles('src/content/tech')) {
  const m = fm.match(/^name:\s*(.+)$/m);
  if (m) defined.set(unquote(m[1]), file);
}

// Names used by projects, employments and certificates.
const used = new Map(); // name -> [files]
for (const dir of ['src/content/projects', 'src/content/employments', 'src/content/certificates']) {
  for (const { file, fm } of mdFiles(dir)) {
    for (const t of readTech(fm)) used.set(t, [...(used.get(t) ?? []), file]);
  }
}

let problems = 0;

// 1. Names that differ only in case.
const byLower = new Map(); // lowercased name -> Set of spellings
for (const name of [...defined.keys(), ...used.keys()]) {
  const key = name.toLowerCase();
  if (!byLower.has(key)) byLower.set(key, new Set());
  byLower.get(key).add(name);
}
for (const spellings of byLower.values()) {
  if (spellings.size < 2) continue;
  problems++;
  console.log(`Names that differ only in case:`);
  for (const s of spellings) {
    const where = defined.has(s) ? [defined.get(s)] : [];
    console.log(`  "${s}" in ${[...where, ...(used.get(s) ?? [])].join(', ')}`);
  }
}

// 2. Used names with no matching tech file.
for (const [name, files] of used) {
  if (defined.has(name)) continue;
  problems++;
  console.log(`No tech file named "${name}", used in ${files.join(', ')}`);
}

if (problems > 0) {
  console.log(`\n${problems} problem(s) found.`);
  process.exit(1);
}
console.log('All tech names OK.');
