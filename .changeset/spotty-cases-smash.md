---
'@codama/spec': patch
---

Disable `splitting` in the tsup build config.

Multi-entry ESM builds (`index` + `v1`) were causing tsup's automatic code splitting to lift shared modules into hashed `chunk-*.mjs` files. Those chunks were not listed in `package.json#files`, so the published tarball shipped entrypoints that re-exported from missing modules and ESM consumers failed at import time with `Cannot find module '...chunk-XXXXX.node.mjs'`. Disabling splitting makes each entry inline its dependencies and the published `dist/` self-contained.
