# Contributing

Thanks for your interest in contributing to the Codama spec.

## Getting set up

You'll need:

- Node.js 20+ (`.nvmrc` pins the major version).
- pnpm 10+ (`packageManager` in `package.json` pins the exact version).
- Rust as declared in `rust-toolchain.toml` (rustup will pick this up automatically).

Install JS deps and verify the workspace builds:

```sh
pnpm install
pnpm build
pnpm test
```

Build the Rust workspace:

```sh
cargo build --workspace
cargo test --workspace
```

## Repository layout

See the [README](./README.md) for a top-level tour. The short version:

- `spec/` — meta-model API + encoded spec + producer of `spec-v1.json`.
- `js/` — generated TypeScript packages (`@codama/node-types`, `@codama/nodes`).
- `rust/` — generated Rust crates (`codama-nodes`, `codama-nodes-derive`).
- `generators/` — internal codegen scripts that emit `js/`, `rust/`, `docs/`, and the public artifacts.
- `scripts/release/` — polyglot release tooling.
- `.changeset/` — release intent files (one per change).
- `docs/` — generated per-node markdown.

## Making changes

### What kind of change are you making?

| Change | Where it lives | Examples |
| --- | --- | --- |
| **Spec change** | `spec/src/` | New node kind, new optional field, renamed field, new registry. |
| **Generator change** | `generators/<gen>/src/` | Improving how a generator emits TS/Rust/Markdown from the same spec. |
| **Hand-written helper change** | `js/nodes/src/` (TS), `rust/codama-nodes/src/` (Rust) | New helper like `isFooNode`, refactor of existing utilities. |
| **Proc-macro change** | `rust/codama-nodes-derive/src/` | Behaviour of `#[node]` and friends. |
| **Internal-only change** | `scripts/`, `.github/`, root configs, docs | Tooling, CI, contributor docs. |

### Declaring release intent

Almost every PR that touches a published package or crate needs an intent
file under `.changeset/` so the release tool knows what to bump. See
[`.changeset/README.md`](./.changeset/README.md) for the format and worked
examples.

The TL;DR:

- **Spec change?** A single `.changeset/*.md` with `spec: <level>` is usually
  enough — the release tool propagates the bump to every generated package
  automatically.
- **Hand-written helper or proc-macro change?** Declare the affected package
  and bump explicitly with the ecosystem-prefixed id:

  ```md
  ---
  'rust::codama-nodes': patch
  ---

  Refactor `HasName` trait into a separate module.
  ```

- **Mixed PR?** Combine both styles in one or more intent files. The body of
  each file becomes that release's CHANGELOG entry, so write it for users.

Run `pnpm release status` locally to preview the bumps that would be applied
when your intent file lands.

### Choosing a bump level

Use semver intent:

- **`major`** — breaking change to the public surface (spec, package API,
  proc-macro behaviour). Includes anything that breaks consumers' compilation
  or runtime expectations.
- **`minor`** — backwards-compatible additions: new node kinds, new optional
  fields, new helper exports, new traits with default impls.
- **`patch`** — bug fixes, internal refactors, performance improvements,
  documentation-only changes that ship to users.

The release tool aggregates multiple entries on the same package by taking
the highest declared bump level.

## Testing

Per-package tests run with `pnpm test` (TS) and `cargo test` (Rust). The
fixture-based cross-language consistency tests live in `spec/tests/fixtures/`
and run automatically in CI.

Spec-touching PRs should:

1. Include the spec change in `spec/src/`.
2. Run `pnpm --filter @codama/spec generate` to refresh `spec-v1.json` and
   commit the result. CI verifies the artifact stays in lockstep with the
   TypeScript source.
3. Run any other generators whose outputs change and commit the result.
4. Add or update fixtures in `spec/tests/fixtures/` covering the new shape.

### Optional value serialisation

Optional fields in encoded IDLs are **omitted from JSON output when absent**,
not serialised as `null`. This matches the Rust serde convention
(`skip_serializing_if = "Option::is_none"`) and is the canonical wire format.
Codegen targets must respect this when emitting reader and writer code.

## Releasing

Releases are automated:

1. Merging your PR (with intent files) into `main` triggers CI.
2. CI runs `pnpm release version`, which produces a "Release" PR with
   bumped versions and updated CHANGELOG entries.
3. Reviewing and merging the Release PR triggers CI to run
   `pnpm release publish`, which publishes to npm and crates.io and tags the
   release.

You don't need to bump versions or edit `CHANGELOG.md` files manually — both
are derived from intent files.

## Code style

- TypeScript and JavaScript are formatted with Prettier
  (`@solana/prettier-config-solana`) and linted with ESLint
  (`@solana/eslint-config-solana`). `pnpm lint` and `pnpm lint:fix` run both.
- Rust is formatted with `cargo fmt` and linted with `cargo clippy`.
- Generated files (`spec-v1.json`, `codama.schema.json`, `COMPATIBILITY.md`,
  `js/node-types/src/**`, etc.) are committed but treated as machine output —
  edit the spec or the generators, not the generated files.

## Reporting issues

File issues at <https://github.com/codama-idl/spec/issues>. For changes to
visitors, validators, renderers, or the CLI, the right home is one of:

- TypeScript tooling: <https://github.com/codama-idl/codama>
- Rust tooling: <https://github.com/codama-idl/codama-rs>
