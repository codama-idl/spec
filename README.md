# Codama Spec

The canonical Codama node specification.

## What is this?

Codama is a standard for describing on-chain Solana programs as a graph of typed nodes (accounts, instructions, types, …). This repository contains:

- **The spec.** A machine-readable description of every node in the Codama node graph, authored in TypeScript under `spec/src/` and emitted as `spec-v1.json`. Future Codama majors will add their own snapshots (`spec-v2.json`, …).
- **The meta-model API.** Authoring helpers (`defineNode`, `attribute`, primitives, compounds, …) exposed at `@codama/spec/api` for hand-authoring specs and test fixtures.
- **Placeholder generators.** Scaffolding under `generators/` for codegen targets whose output belongs alongside the spec itself — currently per-node markdown documentation (`gen-docs`) and a public JSON Schema (`gen-json-schema`). Both are stubs awaiting implementation.

Reference implementations (TypeScript node types, node factories, visitors, validators, renderers, the CLI) live in [codama-idl/codama](https://github.com/codama-idl/codama) and consume the published `@codama/spec` package. The Rust reference implementation lives in [codama-idl/codama-rs](https://github.com/codama-idl/codama-rs).

## Repository layout

```
spec/                      # @codama/spec — meta-model API + encoded spec + spec-v1.json producer
generators/
  gen-docs/                # placeholder — emits docs/ from the spec (not yet implemented)
  gen-json-schema/         # placeholder — emits codama.schema.json from the spec (not yet implemented)
docs/                      # generated per-node markdown documentation
.changeset/                # release intent files (managed by @changesets/cli)
spec-v1.json               # canonical Codama v1 spec artifact (generated, committed)
codama.schema.json         # public JSON Schema (generated, committed)
```

## Releasing

`@codama/spec` is released through [changesets](https://github.com/changesets/changesets):

1. Run `pnpm changeset` on your branch to record a bump and a user-facing summary.
2. Commit the generated `.changeset/*.md` alongside your changes.
3. On merge to `main`, the [`Main` workflow](./.github/workflows/main.yml) either opens a "Release package" PR (when changesets are pending) or publishes `@codama/spec` to npm (when versions have been bumped).

The repo is currently in **release-candidate mode** under the `rc` tag (see `.changeset/pre.json`). Every `pnpm changeset version` produces a `1.6.0-rc.N` version. To cut the stable release, run `pnpm changeset pre exit`, then `pnpm changeset version` and merge the resulting "Release package" PR.

## License

[MIT](./LICENSE) — same as the rest of the Codama ecosystem.
