# Contributing

Thanks for your interest in contributing to the Codama spec.

## Getting set up

You'll need:

- Node.js 22.12+ (per `engines.node` in `package.json`); the `.nvmrc` pins the development version to Node 24.
- pnpm 10+ (`packageManager` in `package.json` pins the exact version).

Install deps and verify the package builds:

```sh
pnpm install
pnpm build
pnpm test
```

## Repository layout

See the [README](./README.md) for a top-level tour. The short version:

- `src/` — package source (the `@codama/spec` public surface, including the meta-model API and the latest-major spec data).
- `tests/` — package tests.
- `generators/` — internal codegen orchestrator and per-target generators. Not exported from the package; produces the `v<n>/` artifacts.
- `v1/` — generated artifacts mirroring the `@codama/spec/v1` surface (`spec.json`, `schema.json`, `docs/`). Treat as machine output; edit the spec or the generators, not these files.
- `.changeset/` — release intent files managed by [`@changesets/cli`](https://github.com/changesets/changesets).

## Making changes

### What kind of change are you making?

| Change                   | Where it lives                 | Examples                                                            |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------- |
| **Spec change**          | `src/`                         | New node kind, new optional field, renamed field, new registry.     |
| **Generator change**     | `generators/<name>/`           | Implementing or evolving how a generator emits its target artifact. |
| **Internal-only change** | `.github/`, root configs, docs | Tooling, CI, contributor docs.                                      |

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

- **`major`** — breaking change to the public surface (spec, package API).
  Includes anything that breaks consumers' compilation or runtime expectations.
- **`minor`** — backwards-compatible additions: new node kinds, new optional
  fields, new helper exports.
- **`patch`** — bug fixes, internal refactors, performance improvements,
  documentation-only changes that ship to users.

When multiple changesets stack on the same package, changesets aggregates
them by taking the highest declared bump level.

## Testing

Run `pnpm test` to execute the type checks and unit tests. Spec fixtures live in
`tests/` and run automatically in CI.

Spec-touching PRs should:

1. Include the spec change in `src/`.
2. Run `pnpm generate` to refresh the `v<n>/` artifacts and commit the result.
   CI verifies the artifacts stay in lockstep with the TypeScript source.
3. Add or update fixtures in `tests/` covering the new shape.

### Optional value serialisation

Optional fields in encoded IDLs are **omitted from JSON output when absent**,
not serialised as `null`. This matches the Rust serde convention
(`skip_serializing_if = "Option::is_none"`) and is the canonical wire format.
Codegen targets must respect this when emitting reader and writer code.

## Releasing

Releases are automated for `@codama/spec`:

1. Merging your PR (with a changeset) into `main` triggers the
   [`Main` workflow](./.github/workflows/main.yml).
2. The workflow either opens a "Release package" PR (when changesets are
   pending) or publishes any unreleased versions to npm.
3. Reviewing and merging the Release package PR triggers the workflow again,
   which runs `pnpm changeset publish` to ship the package.

You don't need to bump versions or edit `CHANGELOG.md` manually — both are
derived from the changeset files.

## Code style

- TypeScript and JavaScript are linted with [Oxlint](https://oxc.rs/docs/guide/usage/linter)
  and formatted with [Oxfmt](https://oxc.rs/docs/guide/usage/formatter), using
  [`@solana-config/oxc`](https://www.npmjs.com/package/@solana-config/oxc) as
  the shared base. `pnpm lint` runs both (with type-aware rules enabled);
  `pnpm lint:fix` applies their autofixes.
- Generated files under `v1/` are committed but treated as machine output —
  edit the spec or the generators, not the generated files.

## Reporting issues

File issues at <https://github.com/codama-idl/spec/issues>. For changes to
node types, node factories, visitors, validators, renderers, or the CLI, the
right home is one of:

- TypeScript tooling: <https://github.com/codama-idl/codama>
- Rust tooling: <https://github.com/codama-idl/codama-rs>
