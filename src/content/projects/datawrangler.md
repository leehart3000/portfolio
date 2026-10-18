---
title: "DataWrangler"
status: "growing"
order: 6
summary: "DataWrangler is a free, open-source web tool for cleaning, checking and preparing data files, such as CSV and TSV, without writing any code."
tech: ["Python", "Flask", "Gunicorn", "DuckDB", "Pydantic", "htmx", "HTML", "CSS", "Delimiter-Separated Values (DSV)", "Sentry", "uv", "Pytest", "Playwright", "Ruff", "Mypy", "Git", "GitLab", "Generative AI (GenAI)"]
liveUrl: "https://datawrangler.org"
repoUrl: "https://gitlab.com/leehart3000/datawrangler"
repoIsPrivate: false
logo: "/logos/datawrangler.svg"
screenshots:
  - "../../assets/screenshots/datawrangler-1.jpg"
  - "../../assets/screenshots/datawrangler-2.jpg"
  - "../../assets/screenshots/datawrangler-3.jpg"
---

DataWrangler helps people tidy up data files in the browser, step by step, with no coding required:

1. **Upload** a CSV, TSV or similar file (up to 10 MB).
2. **Select** the columns to keep.
3. **Clean** the data: trim stray spaces, treat blank cells as empty, remove empty or duplicate rows, and tidy column names (for example, converting them to `lowercase_with_underscores`).
4. **Preview** the result before committing to it.
5. **Download** the cleaned file, in its original format unless you choose otherwise.

The file "stays faithful": nothing is changed unless you ask for it. Uploaded files are processed and then deleted straight away, and nothing is stored.

Behind the scenes, DataWrangler is a Python web app built with Flask and served by Gunicorn. DuckDB does the heavy lifting on the data, Pydantic validates settings and inputs, and htmx drives the step-by-step interface without a heavy JavaScript front end. Errors are reported to Sentry. The project is managed with uv, linted with Ruff, type-checked with Mypy, and tested with Pytest, including end-to-end tests that drive a real browser with Playwright.

DataWrangler is free software, released under the GNU Affero General Public License (AGPL-3.0), with its source code on GitLab.
