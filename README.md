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
  node-types/        # @codama/node-types — generated TypeScript interfaces (workspace-only; not published from this repo)
  nodes/             # @codama/nodes — generated factories + hand-written helpers (workspace-only; not published from this repo)
rust/
  codama-nodes/      # generated structs + hand-written traits
  codama-nodes-derive/  # the #[node] proc-macro
generators/          # internal codegen scripts (not published)
docs/                # generated per-node markdown documentation
.changeset/          # release intent files (managed by @changesets/cli)
spec-v1.json         # canonical Codama v1 spec artifact (generated, committed)
codama.schema.json   # public JSON Schema (generated, committed)
```

## Versioning

`@codama/spec` is the only npm package this repo currently publishes. The Rust crates (`codama-nodes`, `codama-nodes-derive`) are released manually via `cargo publish` for now and will move to the [codama-idl/codama-rs](https://github.com/codama-idl/codama-rs) repo over time. The placeholder `@codama/node-types` and `@codama/nodes` packages live in the workspace as scaffolding while the JS reference implementations migrate to [codama-idl/codama](https://github.com/codama-idl/codama).

Each downstream implementation declares the spec version it implements via manifest metadata:

```jsonc
// js/nodes/package.json
{
    "codama": { "spec": "^1.6.0" },
}
```

```toml
# rust/codama-nodes/Cargo.toml
[package.metadata.codama]
spec = "^1.6.0"
```

## Releasing

`@codama/spec` is released through [changesets](https://github.com/changesets/changesets):

1. Run `pnpm changeset` on your branch to record a bump and a user-facing summary.
2. Commit the generated `.changeset/*.md` alongside your changes.
3. On merge to `main`, the [`Release` workflow](./.github/workflows/release.yml) either opens a "Version Packages" PR (when changesets are pending) or publishes `@codama/spec` to npm (when versions have been bumped).

The repo is currently in **release-candidate mode** under the `rc` tag (see `.changeset/pre.json`). Every `pnpm changeset version` produces a `1.6.0-rc.N` version. To cut the stable release, run `pnpm changeset pre exit`, then `pnpm changeset version` and merge the resulting "Version Packages" PR.

The Rust crates are released manually via `cargo publish` until they relocate. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the contributor workflow.

## License

[MIT](./LICENSE) — same as the rest of the Codama ecosystem.
