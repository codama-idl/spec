# @codama/spec

## 1.6.0-rc.2

### Patch Changes

- f345ba3: Disable `splitting` in the tsup build config.

    Multi-entry ESM builds (`index` + `v1`) were causing tsup's automatic code splitting to lift shared modules into hashed `chunk-*.mjs` files. Those chunks were not listed in `package.json#files`, so the published tarball shipped entrypoints that re-exported from missing modules and ESM consumers failed at import time with `Cannot find module '...chunk-XXXXX.node.mjs'`. Disabling splitting makes each entry inline its dependencies and the published `dist/` self-contained.

## 1.6.0-rc.1

### Patch Changes

- d963306: Verify the end-to-end changeset → OIDC trusted publishing flow by cutting `1.6.0-rc.1`. No code changes; this release only exists to confirm that `changesets/action` can publish via npm trusted publishing without a long-lived `NPM_TOKEN` in CI.
