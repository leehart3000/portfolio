---
title: "CodonAndon"
status: "growing"
order: 7
summary: "CodonAndon is an educational falling-blocks game about mRNA, codons and amino acids: cleared rows are read as genetic code, and players build amino-acid chains for bonus points."
tech: ["SvelteKit", "Svelte", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Flexbox", "CSS Grid", "HTML Canvas", "Web Audio API", "Progressive Web App (PWA)", "Responsive Web Design (RWD)", "Vite", "Cloudflare", "Cloudflare Workers", "Cloudflare D1", "SQLite", "SQL", "Cloudflare Turnstile", "Cloudflare Web Analytics", "Cloudflare Wrangler", "Sentry", "Vitest", "Playwright", "ESLint", "Prettier", "Husky", "pnpm", "fnm", "GitHub Actions", "CI/CD", "Dependabot", "TruffleHog", "Git", "GitHub", "Microsoft Visual Studio Code (VS Code)", "Generative AI (GenAI)"]
liveUrl: "https://codonandon.hartsoft.dev/"
repoUrl: "https://github.com/leehart3000/codonandon"
repoIsPrivate: false
logo: "/logos/codonandon.svg"
screenshots:
  - "../../assets/screenshots/codonandon-start.jpg"
  - "../../assets/screenshots/codonandon-game.jpg"
  - "../../assets/screenshots/codonandon-settings.jpg"
  - "../../assets/screenshots/codonandon-scores.jpg"
---

CodonAndon is a falling-blocks game with a biology twist. Every square is an mRNA base (A, U, G or C), and each cleared row is read as a strand of mRNA. A start codon (AUG) begins a chain, each following codon adds an amino acid using the standard genetic code, and a stop codon (UAA, UAG or UGA) banks the chain for bonus points.

Features include:

- classic falling-blocks play on a 12 × 20 board, with all seven tetrominoes
- on-board highlights for start codons, in-frame stop codons and near-misses
- optional tip cards that introduce the biology one idea at a time
- game-over stats comparing your longest chain with real peptides
- online high scores (top 10 and top 100) with arcade-style initials
- chiptune sound effects and original music, generated in the browser
- touch gestures on phones and tablets, and keyboard controls on computers
- installable as an app, and playable offline once loaded

The game is built with SvelteKit and Svelte 5 in TypeScript, styled with Tailwind CSS, and drawn on an HTML canvas, with sound from the Web Audio API. A service worker makes it a Progressive Web App. It runs on Cloudflare Workers, with high scores stored in Cloudflare D1 (SQLite) and protected from bots by Cloudflare Turnstile. Usage is measured with cookieless Cloudflare Web Analytics, and errors are reported to Sentry.

Every push runs the full set of checks on GitHub Actions (type checks, ESLint and Prettier, Vitest unit and component tests, Playwright end-to-end tests, and a TruffleHog secret scan) before deploying automatically to Cloudflare. Dependabot keeps dependencies up to date.

CodonAndon is free software under the GNU Affero General Public License (AGPL-3.0). It is not affiliated with or endorsed by Tetris or The Tetris Company.
