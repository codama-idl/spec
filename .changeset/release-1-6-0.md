---
'@codama/spec': minor
---

First stable release of `@codama/spec`. The v1 spec shape settled across the `1.6.0-rc.*` line is now published as `1.6.0`. Reference implementations in [TypeScript](https://github.com/codama-idl/codama) and [Rust](https://github.com/codama-idl/codama-rs) consume this package to render their own node types, factories, visitors, and validators from a single source of truth. Future Codama majors will land alongside the `v1` entrypoint as `v2`, `v3`, …, with the default `@codama/spec` entrypoint tracking the latest stable.
