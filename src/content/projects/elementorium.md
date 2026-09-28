---
title: "Elementorium"
status: "growing"
order: 2
summary: "Elementorium is a headless e-commerce shop for pure elements, raw minerals and natural gemstones, built with Astro and Tailwind CSS on Cloudflare Workers, with payments handled by Stripe."
tech: ["Astro", "Tailwind CSS", "Cloudflare", "Cloudflare Workers", "Cloudflare Workers KV", "Bun", "Stripe", "Git", "GitHub", "GitHub Actions", "CI/CD", "JavaScript", "ES6", "HTML", "CSS", "JavaScript Object Notation (JSON)", "YAML", "serverless", "Application Programming Interface (API)", "e-commerce", "Responsive Web Design (RWD)", "Asynchronous JavaScript and XML (Ajax)", "Node.js", "DevOps", "ESLint", "Prettier", "Husky", "Google Analytics", "Sentry", "Vite"]
liveUrl: "https://elementorium.co.uk"
repoUrl: "https://github.com/leehart3000/elementorium"
repoIsPrivate: true
logo: "/logos/elementorium.svg"
screenshots:
  - "../../assets/screenshots/elementorium-shop-elements-cubes.jpg"
  - "../../assets/screenshots/elementorium-shop-minerals-tumbled.jpg"
  - "../../assets/screenshots/elementorium-basket.jpg"
---

Elementorium is a small but growing online shop for collectors of pure elements, raw minerals and natural gemstones, whether they are building a periodic table collection or adding specimens to a display cabinet.

The storefront is built with Astro and styled with Tailwind CSS, rendering fast, mostly static pages at the edge. Dynamic parts, such as the basket and checkout, run as serverless functions on Cloudflare Workers, with order data stored in Cloudflare Workers KV. Payments are handled by Stripe, so card details never touch the shop's own servers.

Development uses Bun for package management and scripts, with ESLint and Prettier keeping the code consistent, and Husky running checks before each commit. GitHub Actions runs the CI pipeline, Sentry monitors errors in production, and Google Analytics measures traffic, loaded only after visitors give consent.
