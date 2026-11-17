---
title: "ProtoELN"
status: "growing"
order: 9
summary: "ProtoELN is a prototype Electronic Lab Notebook (ELN) for experiment write-ups, structured data and files, with full revision history, hash-chained versions, review and signing, built with Vue, Express and MongoDB on Cloudflare Workers."
liveUrl: "https://protoeln.org"
tech: ["TypeScript", "JavaScript", "Vue.js", "Vue Router", "TanStack Query", "Tiptap", "Tailwind CSS", "HTML", "CSS", "Vite", "Node.js", "Express", "MongoDB", "Mongoose", "JSON", "REST", "API", "OAuth", "JSON Web Token (JWT)", "Cloudflare", "Cloudflare Workers", "Cloudflare Durable Objects", "Cloudflare R2", "Cloudflare Wrangler", "Vitest", "Playwright", "ESLint", "Prettier", "pnpm", "just", "Python", "GitLab", "CI/CD", "Markdown", "Mermaid", "Electronic Lab Notebook (ELN)", "Git", "GitHub", "Microsoft Visual Studio Code (VS Code)", "Generative AI (GenAI)"]
repoUrl: "https://gitlab.com/leehart3000/protoeln"
mirrorUrl: "https://github.com/leehart3000/protoeln"
repoIsPrivate: false
logo: "/logos/protoeln.svg"
logoDark: "/logos/protoeln-dark.svg"
screenshots:
  - "../../assets/screenshots/protoeln-home.jpg"
  - "../../assets/screenshots/protoeln-projects.jpg"
  - "../../assets/screenshots/protoeln-project-detail.jpg"
  - "../../assets/screenshots/protoeln-notebook-detail.jpg"
  - "../../assets/screenshots/protoeln-entry-detail.jpg"
---

ProtoELN is a prototype web-based Electronic Lab Notebook for recording experiments, protocols and notes, together with their data and files. It follows standard ELN practice: entries belong to their authors, every change is recorded, versions can't be changed, and signed entries are locked. It is a companion to ProtoLIMS, and projects in the two can be linked.

**Projects** contain **notebooks**, which contain **entries**, each with a readable code such as `ELN-2026-0042`. An entry can hold:

- rich text, tables, images and files, written in a Tiptap editor
- protocol steps that can be ticked off, recording who ticked each one and when
- lists of materials, with suppliers, catalogue and lot numbers
- **data**, such as cells pasted from a spreadsheet, or CSV and JSON files, kept exactly as received alongside a tidied table view
- links to other entries, and to records elsewhere, such as ProtoLIMS samples

Features include:

- drafts saved automatically, with every save recorded as a change, so any earlier draft can be rebuilt
- numbered **versions** that can't be changed, each with a hash chained to the one before, so any tampering can be detected
- **review** and **signing**: a reviewer can comment, request changes or approve, and the author and a witness sign a specific version, confirming who they are with ORCID
- corrections by addendum, and redaction with a visible record, so nothing in a version is quietly deleted
- importers for published notebooks, from Word files and LabArchives exports, with full credit to the original authors
- a **read-only lock**, set on the server, for the public demo at protoeln.org

The website is a Vue and TypeScript single-page app, styled with Tailwind CSS. The API is an Express app with MongoDB through Mongoose. Both are served by one Cloudflare Worker, with the API running in a Durable Object that keeps its database connection open, and files stored in Cloudflare R2. Entry content uses ProtoELN's own documented format, shared by the API and the website.

Every change is checked on GitLab CI: Prettier, ESLint, TypeScript and Vitest (with coverage) for each part. Merged changes deploy automatically to a staging site, and tagged releases to production.

ProtoELN is free software under the GNU Affero General Public License (AGPL-3.0).
