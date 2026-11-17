---
title: "ProkoptonML"
status: "growing"
order: 11
summary: "ProkoptonML is an open, end-to-end MLOps platform: a Python package and command-line tool that turns data into evaluated, documented and deployable models, used by products such as DNAbarcode.org."
tech: ["Python", "Pydantic", "NumPy", "pandas", "PyArrow", "SciPy", "scikit-learn", "MLflow", "FastAPI", "Uvicorn", "Docker", "Google Cloud Platform (GCP)", "Google Cloud Run", "Google Artifact Registry", "Google Cloud Storage (GCS)", "Pytest", "Ruff", "Mypy", "Pixi", "Python Package Index (PyPI)", "GitHub Actions", "CI/CD", "Dependabot", "TruffleHog", "Machine Learning (ML)", "MLOps", "logistic regression", "Git", "GitHub", "Microsoft Visual Studio Code (VS Code)", "Generative AI (GenAI)"]
packageUrl: "https://pypi.org/project/prokopton-ml/"
repoUrl: "https://github.com/leehart3000/prokoptonml"
repoIsPrivate: false
---

ProkoptonML is an open MLOps platform for building, deploying and documenting scientific machine-learning models. It is published on PyPI as a Python package, `prokopton-ml`, with a command-line tool, and each product built with it pins an exact version.

It covers the whole lifecycle:

1. data ingestion, with checksums and validation
2. splitting, and checks for leakage between training and test data
3. feature engineering
4. training, with experiment tracking and a model registry in MLflow
5. calibration and evaluation, with thresholds chosen by the evaluation
6. model cards, generated from the pipeline's own reports
7. serving bundles (models, reference data, config, pinned versions and checksums), served by a FastAPI service

Each product is described by one configuration file, and runs the platform's stages on it. The product keeps its own data, decisions, website and deployment. Packages can add their own kinds of stage, serving step and model as plug-ins, so the platform isn't tied to one field: DNA sequence support is a separate part, and a small tabular example (Palmer Penguins) runs end to end without it.

Products deploy their API to Google Cloud Run with a shared GitHub Actions workflow, which builds the product's image, runs its known-answer checks against it, then pushes and deploys it. Releases to PyPI use Trusted Publishing, after a trial release to TestPyPI.

The code is fully type-checked with Mypy in strict mode, linted and formatted with Ruff, and tested with Pytest at 100% coverage.

ProkoptonML is free software under the GNU Affero General Public License (AGPL-3.0). Its website, prokoptonml.org, is planned.
