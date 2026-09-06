# Repository Guidelines

## Project Structure & Module Organization

The `ag-tech` workspace contains the independently versioned `evidencia-ganadera/` repository, a Spanish-language livestock research site. Run site-related Git operations inside that directory; the outer repository currently has no commits.

- `evidencia-ganadera/research/`: published HTML pages, shared `styles.css`, and `report-source.md` research material.
- `research/items/`: individual product and vendor profiles.
- `research/_generar-*.mjs`: Node.js scripts that generate selected pages.
- `research/_validar-mercado.mjs`: HTML and local-link validation.
- `evidencia-ganadera/research-tech/`: separate technical research pages and stylesheet.
- `evidencia-ganadera/.github/workflows/deploy-pages.yml`: publishes only `research/` to GitHub Pages on pushes to `main` or manual dispatch.

## Build, Test, and Development Commands

Run these commands from `evidencia-ganadera/`:

- `python3 -m http.server 8000 --directory research`: serve the public site locally at `http://localhost:8000`.
- `node research/_validar-mercado.mjs`: validate HTML metadata, duplicate IDs, local files, and anchor targets.
- `node research/_generar-mercado.mjs`: regenerate market-related pages and product profiles.
- `node research/_generar-enfoques.mjs`: regenerate approach-related pages.

There is no package manifest or compilation step. Generators overwrite HTML; inspect their output targets before running them and review the resulting diff.

## Coding Style & Naming Conventions

Use two-space indentation in formatted HTML, CSS, and JavaScript. Follow existing Node.js ES modules with `node:` imports, double-quoted strings, and semicolons. Keep filenames lowercase and hyphenated, such as `supuestos-mercado.html`; retain the `_generar-` and `_validar-` script prefixes. Reuse existing CSS variables and classes. No formatter or linter is configured.

Keep published content in Spanish, preserve `lang="es"`, and use relative links. When changing generated content, update its generator as well as the output.

## Testing Guidelines

Run the validator after changing public pages. It covers `research/`, not `research-tech/`, and does not verify external URLs. Manually check affected navigation, anchors, and layouts at desktop and mobile widths. No unit-test framework or coverage threshold is configured.

## Commit & Pull Request Guidelines

The nested repository uses short imperative English subjects, such as “Add Ceres Tag and Technology architecture documents.” Follow that style and keep commits focused. PR descriptions should explain affected pages, validation performed, and relevant issues; include screenshots for visual changes.

## Research Integrity

Provide source links for factual claims, distinguish commercial claims from independent validation, and keep document dates and versions consistent. Exclude credentials, private data, and local browser artifacts from published files.
