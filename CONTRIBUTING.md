# Contributing

Thanks for your interest in contributing to the Codama spec.

## Getting set up

You'll need:

- Node.js 20+ (`.nvmrc` pins the major version).
- pnpm 10+ (`packageManager` in `package.json` pins the exact version).

Install deps and verify the workspace builds:

```sh
pnpm install
pnpm build
pnpm test
```

## Repository layout

See the [README](./README.md) for a top-level tour. The short version:

- `spec/` — meta-model API + encoded spec + producer of `spec-v1.json`.
- `generators/` — internal codegen placeholders. Two stubs live here today (`gen-docs`, `gen-json-schema`), both awaiting implementation; reference implementations of node types, node factories, visitors, and renderers have moved to [codama-idl/codama](https://github.com/codama-idl/codama).
- `.changeset/` — release intent files managed by [`@changesets/cli`](https://github.com/changesets/changesets).
- `docs/` — generated per-node markdown.

## Making changes

### What kind of change are you making?

| Change                   | Where it lives                 | Examples                                                                        |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------- |
| **Spec change**          | `spec/src/`                    | New node kind, new optional field, renamed field, new registry.                 |
| **Generator change**     | `generators/<gen>/src/`        | Implementing or evolving how a placeholder generator emits its target artifact. |
| **Internal-only change** | `.github/`, root configs, docs | Tooling, CI, contributor docs.                                                  |

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

Per-package tests run with `pnpm test`. Spec fixtures live in `spec/tests/`
and run automatically in CI.

Spec-touching PRs should:

1. Include the spec change in `spec/src/`.
2. Run `pnpm --filter @codama/spec generate` to refresh `spec-v1.json` and
   commit the result. CI verifies the artifact stays in lockstep with the
   TypeScript source.
3. Add or update fixtures in `spec/tests/` covering the new shape.

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

- TypeScript and JavaScript are formatted with Prettier
  (`@solana/prettier-config-solana`) and linted with ESLint
  (`@solana/eslint-config-solana`). `pnpm lint` and `pnpm lint:fix` run both.
- Generated files (`spec-v1.json`, `codama.schema.json`, `docs/**`) are
  committed but treated as machine output — edit the spec or the generators,
  not the generated files.

## Reporting issues

File issues at <https://github.com/codama-idl/spec/issues>. For changes to
node types, node factories, visitors, validators, renderers, or the CLI, the
right home is one of:

- TypeScript tooling: <https://github.com/codama-idl/codama>
- Rust tooling: <https://github.com/codama-idl/codama-rs>
