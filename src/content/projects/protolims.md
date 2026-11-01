---
title: "ProtoLIMS"
status: "growing"
order: 8
summary: "ProtoLIMS is a prototype multi-omics Laboratory Information Management System (LIMS) for tracking samples, experiment provenance, assay metadata and results, built with FastAPI, PostgreSQL and React."
liveUrl: "https://protolims.org"
tech: ["Python", "FastAPI", "Uvicorn", "Pydantic", "SQLAlchemy", "Alembic", "PostgreSQL", "Neon", "SQL", "OpenAPI", "Swagger UI", "REST", "Application Programming Interface (API)", "JSON Web Token (JWT)", "OAuth", "TypeScript", "JavaScript", "React", "React Router", "TanStack Query", "Tailwind CSS", "HTML", "CSS", "Vite", "Cloudflare", "Cloudflare Workers", "Cloudflare Wrangler", "Google Cloud Platform (GCP)", "Google Cloud Run", "Google Artifact Registry", "Google Secret Manager", "Google Cloud Storage (GCS)", "Docker", "Pytest", "Vitest", "Ruff", "Mypy", "ESLint", "Prettier", "pre-commit", "uv", "pnpm", "just", "GitHub Actions", "CI/CD", "Dependabot", "Mermaid", "Laboratory Information Management System (LIMS)", "Git", "GitHub", "Microsoft Visual Studio Code (VS Code)", "Generative AI (GenAI)"]
repoUrl: "https://github.com/leehart3000/protolims"
repoIsPrivate: false
logo: "/logos/protolims.svg"
screenshots:
  - "../../assets/screenshots/protolims-home.jpg"
  - "../../assets/screenshots/protolims-projects.jpg"
  - "../../assets/screenshots/protolims-project-details.jpg"
  - "../../assets/screenshots/protolims-studies.jpg"
  - "../../assets/screenshots/protolims-study-details.jpg"
  - "../../assets/screenshots/protolims-subjects.jpg"
  - "../../assets/screenshots/protolims-subject-details.jpg"
  - "../../assets/screenshots/protolims-subject-edit.jpg"
  - "../../assets/screenshots/protolims-samples.jpg"
  - "../../assets/screenshots/protolims-sample-details.jpg"
  - "../../assets/screenshots/protolims-sample-edit.jpg"
  - "../../assets/screenshots/protolims-derived-sample-details.jpg"
  - "../../assets/screenshots/protolims-assays.jpg"
  - "../../assets/screenshots/protolims-assay-details.jpg"
  - "../../assets/screenshots/protolims-assay-edit.jpg"
  - "../../assets/screenshots/protolims-data-files.jpg"
  - "../../assets/screenshots/protolims-data-file-details.jpg"
  - "../../assets/screenshots/protolims-data-file-edit.jpg"
  - "../../assets/screenshots/protolims-data-file-provenance.jpg"
  - "../../assets/screenshots/protolims-users.jpg"
---

ProtoLIMS is a prototype web-based Laboratory Information Management System for multi-omics research. It keeps track of where samples came from, what was done to them, and which data files resulted, so every result can be traced back to its source.

Its data model follows the ISA framework (Investigation, Study, Assay), so that data from different repositories and omics types fits one structure:

- **Projects** contain **studies**, which enrol **subjects** and hold **samples**.
- Samples can be **derived** from other samples, for example a portion or an aliquot.
- **Assays** record which samples were measured, and the **data files** they produced.
- Data files keep their **provenance**: which samples they contain, and which other files they were derived from.

Features include:

- browsing, searching and editing every kind of record, with role-based permissions (viewer, editor and admin) on each study
- safe bulk **imports** into a study: a required dry run first, all-or-nothing saving, and no changes to existing records, so imports are safe to repeat
- importers for public datasets, such as the NCI Genomic Data Commons (GDC) and Proteomic Data Commons (PDC)
- a documented REST API with personal API tokens
- a **read-only lock** that freezes all data, set on the server rather than the website, so a stolen session or token can't lift it

The backend is a Python FastAPI service, using SQLAlchemy and Alembic migrations over PostgreSQL, and runs on Google Cloud Run. The frontend is a React and TypeScript single-page app, styled with Tailwind CSS and served by Cloudflare Workers, which also forwards API requests to the backend. Its API client is generated from the backend's OpenAPI description, so the two always agree.

Every change is checked on GitHub Actions: Ruff, Mypy and Pytest (with at least 80% test coverage) for the backend, and ESLint, Prettier, TypeScript and Vitest for the frontend. Merged changes deploy automatically, first to a staging site and then to production, with database migrations run as Cloud Run jobs. The production database is backed up every night to Google Cloud Storage, and each backup is test-restored automatically to prove it works.

ProtoLIMS is free software under the GNU Affero General Public License (AGPL-3.0).
