---
title: "Malaria Observer"
status: "growing"
order: 1
summary: "Malaria Observer is a Django and Wagtail platform for exploring and visualising malaria-related data, built as a HAT (htmx, Alpine.js, Tailwind CSS) website and deployed serverlessly on Google Cloud Run."
tech: ["Python", "HTML", "CSS", "JavaScript", "SQL", "JavaScript Object Notation (JSON)", "YAML", "Delimiter-Separated Values (DSV)", "Django", "Wagtail", "Content Management System (CMS)", "Tailwind CSS", "Pytest", "Django ORM", "Web Server Gateway Interface (WSGI)", "Gunicorn", "PostgreSQL", "SQLite", "Docker", "containers", "Google Cloud Platform (GCP)", "Google Cloud Run", "serverless", "cloud computing", "GNU/Linux", "Git", "GitHub", "GitHub Actions", "CI/CD", "Responsive Web Design (RWD)", "WhiteNoise", "Markdown", "uv", "Dependabot", "Just", "Ruff", "Mypy", "Alpine.js", "Leaflet", "OpenStreetMap", "Google Analytics", "SVG", "Neon", "Google Artifact Registry", "Google Secret Manager", "Sentry", "Codecov", "Microsoft Visual Studio Code (VS Code)"]
liveUrl: "https://malaria.observer"
repoUrl: "https://github.com/leehart3000/malaria-observer"
repoIsPrivate: false
logo: "/logos/malaria-observer.svg"
screenshots:
  - "../../assets/screenshots/malaria-observer-datasets-pf8.jpg"
  - "../../assets/screenshots/malaria-observer-explorer-table.jpg"
  - "../../assets/screenshots/malaria-observer-explorer-geo.jpg"
---

Malaria Observer brings malaria-related data together in one place and makes it easier to explore. Its data explorer offers both an interactive map, built with Leaflet and OpenStreetMap, and a sortable table view, while editorial pages are managed through the Wagtail CMS.

The frontend follows the HAT approach: server-rendered Django templates, styled with Tailwind CSS, with small touches of interactivity from Alpine.js rather than a heavy single-page framework.

The application runs in a Docker container on Google Cloud Run, served by Gunicorn with static files handled by WhiteNoise. Data lives in a serverless PostgreSQL database on Neon, with SQLite used for local development. Container images are stored in Google Artifact Registry, and secrets are kept in Google Secret Manager.

Quality is enforced through GitHub Actions: Ruff for linting and formatting, Mypy for type checking, and Pytest with coverage reported to Codecov. Dependencies are managed with uv, common tasks are scripted with Just, and Dependabot keeps dependencies up to date. Sentry monitors errors in production.
