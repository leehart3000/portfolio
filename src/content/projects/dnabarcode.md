---
title: "DNAbarcode.org"
status: "growing"
order: 10
summary: "DNAbarcode.org identifies animals from their COI DNA barcodes, with cautious, explained answers: a species where the reference data can tell, and a broader group where it can't. Built on the ProkoptonML MLOps platform."
tech: ["Python", "Pydantic", "NumPy", "pandas", "PyArrow", "SciPy", "scikit-learn", "MLflow", "FastAPI", "Uvicorn", "JavaScript", "HTML", "CSS", "SVG", "Cloudflare", "Cloudflare Workers", "Cloudflare Turnstile", "Cloudflare Wrangler", "Google Cloud Platform (GCP)", "Google Cloud Run", "Google Artifact Registry", "Google Secret Manager", "Google Cloud Storage (GCS)", "Docker", "Playwright", "Node.js", "Ruff", "Pixi", "GitHub Actions", "CI/CD", "TruffleHog", "Machine Learning (ML)", "MLOps", "logistic regression", "DNA barcoding", "Git", "GitHub", "Microsoft Visual Studio Code (VS Code)", "Generative AI (GenAI)"]
liveUrl: "https://dnabarcode.org"
repoUrl: "https://github.com/leehart3000/dnabarcode"
repoIsPrivate: false
logo: "/logos/dnabarcode.svg"
screenshots:
  - "../../assets/screenshots/dnabarcode-identify.jpg"
  - "../../assets/screenshots/dnabarcode-identification.jpg"
  - "../../assets/screenshots/dnabarcode-how-it-works.jpg"
---

DNAbarcode.org identifies animals from a COI DNA barcode: a short stretch of the mitochondrial gene that is commonly used to tell species apart. Paste in a sequence, and the answer explains, step by step, how it was reached. It names a species only where the reference data and this marker can really tell, and otherwise gives a broader group. Species-level answers cover mosquitoes (family Culicidae) for now.

Each sequence goes through up to three models in turn, and each one can decline or settle for a less specific answer:

- a **marker check** works out which of 15 mitochondrial genes the sequence is from, and which strand, and finds the barcode region in a longer sequence, such as a whole mitochondrial genome
- a **router** predicts the broad group of organism (for animals, the order), with calibrated confidence
- a **mosquito specialist** compares possible flies with curated reference sequences of about 1,100 mosquito species, and reports a species, a species complex, a group, a genus or the family, saying when a species may be missing from the reference data

The models are built, evaluated and packaged with ProkoptonML, from MIDORI2 and NCBI RefSeq reference data, and each has a published model card. Every deploy is checked against known answers, and a golden set of about 200 full answers that must not change.

The API is a FastAPI service on Google Cloud Run. The website is served by a Cloudflare Worker, which also acts as the API's gateway: it limits how often each visitor can ask, checks each request with Cloudflare Turnstile, and adds the API key, so the browser never sees it. Sequences are never logged.

DNAbarcode.org is free software under the GNU Affero General Public License (AGPL-3.0).
