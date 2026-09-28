---
title: "HartSoft.Dev"
status: "mature"
order: 3
summary: "HartSoft.Dev (this site) is an Astro site on Cloudflare Workers, built openly as a working example of the stack in action."
tech: ["Astro", "Cloudflare", "Cloudflare Workers", "Cloudflare Workers KV", "HTML", "CSS", "JavaScript", "TypeScript", "Node.js", "Git", "GitHub", "YAML", "Markdown", "Application Programming Interface (API)", "REST", "serverless", "CI/CD", "Responsive Web Design (RWD)", "Asynchronous JavaScript and XML (Ajax)", "ES6", "Vite", "Cloudflare Wrangler", "Resend", "Google Analytics", "fnm", "Dependabot"]
liveUrl: "https://hartsoft.dev"
repoUrl: "https://github.com/leehart3000/portfolio"
repoIsPrivate: false
logo: "/logo.svg"
---

HartSoft.Dev is an online portfolio and CV website, and a demonstration of certain technologies in action. Its content (projects, employments, certificates and technologies) lives in Markdown files with YAML frontmatter, validated by Astro content collections and cross-linked automatically, so each technology page lists every project, job and certificate that uses it.

Most pages are rendered as static HTML at build time and served from Cloudflare Workers. The contact form is the exception: it posts to a small serverless API route that first stores each message in Cloudflare Workers KV, then emails it on via Resend, so no message is lost if email delivery fails.

Every push to the main branch is built and deployed automatically by Cloudflare, and Dependabot watches for vulnerable dependencies. The site supports light and dark modes, works on narrow screens, and only loads Google Analytics after a visitor gives consent.
