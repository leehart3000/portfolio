---
title: "Epiplot"
status: "growing"
order: 5
summary: "Epiplot is a Python library that makes standard epidemiological plots (epidemic curves, rate maps and survival curves) easy to produce, and hard to get wrong."
tech: ["Python", "Matplotlib", "NumPy", "Pandas", "SciPy", "GeoPandas", "Shapely", "Pytest", "Ruff", "Mypy", "Pixi", "Sphinx", "Google Colab", "GitHub Pages", "Git", "GitHub"]
docsUrl: "https://leehart3000.github.io/epiplot/"
repoUrl: "https://github.com/leehart3000/epiplot"
repoIsPrivate: false
logo: "/logos/epiplot.svg"
screenshots:
  - "../../assets/screenshots/epiplot-docs-home.jpg"
  - "../../assets/screenshots/epiplot-docs-api-reference.jpg"
  - "../../assets/screenshots/epiplot-docs-case-studies-covid-19.jpg"
---

Epiplot is an open-source Python library for creating publication-quality charts in epidemiology and public health. It currently provides three kinds of plot:

- **Epidemic curves**: case counts over time, daily or weekly, with missing dates and reporting delays handled explicitly.
- **Rate maps**: disease rates by region, for a single point in time or as a timeline. They map rates rather than raw counts, and automatically hide regions with fewer than five cases to protect privacy.
- **Survival curves**: Kaplan–Meier curves with confidence bands, censoring marks and number-at-risk tables.

Good practice is built into the defaults: clear labelling of which date is being plotted, transparent handling of missing data and colour-blind-safe palettes.

The library is fully type-checked with Mypy in strict mode, linted and formatted with Ruff, tested with Pytest, and its environments are managed with Pixi. Mapping support is an optional extra built on GeoPandas and Shapely. The documentation, including a gallery and case studies, is built with Sphinx and published on GitHub Pages, and the package also works in Google Colab.

Epiplot is in active early development (alpha), so its interface may still change.
