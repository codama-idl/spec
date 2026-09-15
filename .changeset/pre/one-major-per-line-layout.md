---
'@codama/spec': major
---

Restructure the package for the one-major-per-line release model: the root entrypoint now hosts the current major's spec surface from `src/spec/` (formerly `src/v1/`), the `./v1` subpath export is removed (the v1 spec remains available as `@codama/spec@^1` from the `1.x` line), and the generated artifacts move from `v1/` to the repository root (`spec.json`, `schema.json`, `docs/`). The generated docs landing page now links to the docs of previous majors on their maintenance branches.
