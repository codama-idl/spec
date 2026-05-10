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
- `js/` — workspace-only TypeScript scaffolding (`@codama/node-types`, `@codama/nodes`); not published from this repo while the JS reference implementations migrate to [codama-idl/codama](https://github.com/codama-idl/codama).
- `rust/` — Rust crates (`codama-nodes`, `codama-nodes-derive`); released manually via `cargo publish` for now.
- `generators/` — internal codegen scripts.
- `.changeset/` — release intent files managed by [`@changesets/cli`](https://github.com/changesets/changesets).
- `docs/` — generated per-node markdown.

## Making changes

### What kind of change are you making?

| Change                         | Where it lives                                        | Examples                                                             |
| ------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------- |
| **Spec change**                | `spec/src/`                                           | New node kind, new optional field, renamed field, new registry.      |
| **Generator change**           | `generators/<gen>/src/`                               | Improving how a generator emits TS/Rust/Markdown from the same spec. |
| **Hand-written helper change** | `js/nodes/src/` (TS), `rust/codama-nodes/src/` (Rust) | New helper like `isFooNode`, refactor of existing utilities.         |
| **Proc-macro change**          | `rust/codama-nodes-derive/src/`                       | Behaviour of `#[node]` and friends.                                  |
| **Internal-only change**       | `.github/`, root configs, docs                        | Tooling, CI, contributor docs.                                       |

### Declaring release intent

Any PR that ships an `@codama/spec` change to npm needs a changeset:

```sh
pnpm changeset
```

Pick the bump level (`patch` / `minor` / `major`), write a short user-facing
summary, and commit the resulting `.changeset/*.md` alongside your code.
[`.changeset/README.md`](./.changeset/README.md) covers the day-to-day flow.

The repo is currently in **release-candidate mode** under the `rc` tag (see
`.changeset/pre.json`). Every `pnpm changeset version` produces a
`1.6.0-rc.N` version. To cut the stable release run
`pnpm changeset pre exit` and then `pnpm changeset version`.

### Choosing a bump level

Use semver intent:

- **`major`** — breaking change to the public surface (spec, package API,
  proc-macro behaviour). Includes anything that breaks consumers' compilation
  or runtime expectations.
- **`minor`** — backwards-compatible additions: new node kinds, new optional
  fields, new helper exports, new traits with default impls.
- **`patch`** — bug fixes, internal refactors, performance improvements,
  documentation-only changes that ship to users.

When multiple changesets stack on the same package, changesets aggregates
them by taking the highest declared bump level.

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

Releases are automated for `@codama/spec`:

1. Merging your PR (with a changeset) into `main` triggers the
   [`Release` workflow](./.github/workflows/release.yml).
2. The workflow either opens a "Version Packages" PR (when changesets are
   pending) or publishes any unreleased versions to npm.
3. Reviewing and merging the Version Packages PR triggers the workflow again,
   which runs `pnpm changeset publish` to ship the package.

You don't need to bump versions or edit `CHANGELOG.md` manually — both are
derived from the changeset files.

Rust crates are released manually via `cargo publish` until they relocate to
[codama-idl/codama-rs](https://github.com/codama-idl/codama-rs).

## Code style

- TypeScript and JavaScript are formatted with Prettier
  (`@solana/prettier-config-solana`) and linted with ESLint
  (`@solana/eslint-config-solana`). `pnpm lint` and `pnpm lint:fix` run both.
- Rust is formatted with `cargo fmt` and linted with `cargo clippy`.
- Generated files (`spec-v1.json`, `codama.schema.json`,
  `js/node-types/src/generated/**`, etc.) are committed but treated as
  machine output — edit the spec or the generators, not the generated files.

## Reporting issues

File issues at <https://github.com/codama-idl/spec/issues>. For changes to
visitors, validators, renderers, or the CLI, the right home is one of:

- TypeScript tooling: <https://github.com/codama-idl/codama>
- Rust tooling: <https://github.com/codama-idl/codama-rs>
