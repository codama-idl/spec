# Codama Spec

The Codama node specification and its reference implementations in TypeScript and Rust.

## What is this?

Codama is a standard for describing on-chain Solana programs as a graph of typed nodes (accounts, instructions, types, …). This repository contains:

- **The spec.** A canonical, machine-readable description of every node in the Codama node graph (`spec-v1.json`, generated from `spec/`). Future Codama majors add their own snapshots (`spec-v2.json`, …).
- **Reference implementations.** TypeScript packages (`@codama/spec`, `@codama/node-types`, `@codama/nodes`) and Rust crates (`codama-nodes`, `codama-nodes-derive`) generated from and in sync with the spec.
- **Generators.** Scripts that emit the reference implementations, the markdown documentation, and a public JSON Schema from the spec.

Higher-level Codama tooling — visitors, validators, renderers, the CLI — lives in [codama-idl/codama](https://github.com/codama-idl/codama) (TypeScript) and [codama-idl/codama-rs](https://github.com/codama-idl/codama-rs) (Rust), and consumes the published packages and crates from this repo.

## Repository layout

```
spec/                # @codama/spec — meta-model API + encoded spec + spec-v1.json producer
js/
  node-types/        # @codama/node-types — generated TypeScript interfaces
  nodes/             # @codama/nodes — generated factories + hand-written helpers
rust/
  codama-nodes/      # generated structs + hand-written traits
  codama-nodes-derive/  # the #[node] proc-macro
generators/          # internal codegen scripts (not published)
docs/                # generated per-node markdown documentation
scripts/release/     # custom polyglot release tooling
.changeset/          # release intent files (changesets-inspired, polyglot)
spec-v1.json         # canonical Codama v1 spec artifact (generated, committed)
codama.schema.json   # public JSON Schema (generated, committed)
COMPATIBILITY.md     # package ↔ spec version matrix (generated, committed)
```

## Versioning

Packages and crates evolve on independent semver. Each implementation declares the spec version it implements via manifest metadata:

```jsonc
// js/nodes/package.json
{
  "codama": { "spec": "^1.6.0" }
}
```

```toml
# rust/codama-nodes/Cargo.toml
[package.metadata.codama]
spec = "^1.6.0"
```

The current compatibility matrix is generated into [`COMPATIBILITY.md`](./COMPATIBILITY.md).

## Releasing

Cross-ecosystem releases are coordinated through a small custom tool in [`scripts/release/`](./scripts/release/), driven by changesets-inspired intent files in [`.changeset/`](./.changeset/). See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the contributor workflow.

## License

[MIT](./LICENSE) — same as the rest of the Codama ecosystem.
