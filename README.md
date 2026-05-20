# Codama Spec

The canonical Codama node specification.

## Overview

Codama is a standard for describing on-chain Solana programs as a graph of typed nodes (accounts, instructions, types, …). This repository contains:

- **The spec.** A machine-readable description of every node in the Codama node graph, authored in TypeScript under `src/` and emitted as `v1/spec.json`. Future Codama majors will land alongside as `v2/spec.json`, `v3/spec.json`, …
- **The meta-model API.** Authoring helpers (`defineNode`, `attribute`, primitives, compounds, …) exposed at `@codama/spec/api` for hand-authoring specs and test fixtures.
- **Internal codegen.** Generators under `generators/` produce the public artifacts that mirror each spec major (`v<n>/spec.json`, `v<n>/schema.json`, `v<n>/docs/`). They are not exported from the `@codama/spec` package; they exist as internal tooling for this repo.

Reference implementations (TypeScript node types, node factories, visitors, validators, renderers, the CLI) live in [codama-idl/codama](https://github.com/codama-idl/codama) and consume the published `@codama/spec` package. The Rust reference implementation lives in [codama-idl/codama-rs](https://github.com/codama-idl/codama-rs).

## Install

```sh
pnpm add @codama/spec
# or: npm install @codama/spec
```

## Quickstart

`@codama/spec` exposes three entrypoints:

- `@codama/spec` — the latest stable major's public surface. Re-exports `@codama/spec/v1` today; will track future majors.
- `@codama/spec/v1` — the v1 spec data, accessors (`getSpec`, `getNode`, `getUnion`, `getEnumeration`), and the version-agnostic types (`NodeSpec`, `UnionSpec`, …).
- `@codama/spec/api` — the meta-model authoring API (`defineNode`, `attribute`, primitives, compounds, …) for hand-authoring specs and test fixtures.

### Read the spec

```ts
import { getSpec, getNode, SPEC_VERSION } from '@codama/spec/v1';

const spec = getSpec();
console.log(spec.version); // → '1.6.0'
console.log(SPEC_VERSION); // → '1.6.0'

const account = getNode('accountNode');
console.log(account?.attributes.map(a => a.name));
// → ['name', 'size', 'docs', 'data', 'pda', 'discriminators']
```

### Hand-author a node

```ts
import { attribute, defineNode, string, u32 } from '@codama/spec/api';

const myNode = defineNode('myNode', {
    docs: ['A custom node, hand-authored.'],
    attributes: [attribute('name', string()), attribute('size', u32(), { docs: ['Size in bytes.'] })],
});
```

## Repository layout

```
src/                       # package source (the @codama/spec public surface)
tests/                     # package tests
generators/                # internal codegen orchestrator + per-target generators
  index.ts                 # runs every registered generator sequentially
  json-spec/               # emits v<n>/spec.json
  json-schema/             # emits v<n>/schema.json (stub)
  docs/                    # emits v<n>/docs/ (stub)
v1/                        # generated artifacts mirroring the @codama/spec/v1 surface
  spec.json
  schema.json
  docs/
.changeset/                # release intent files (managed by @changesets/cli)
```

## Releasing

`@codama/spec` is released through [changesets](https://github.com/changesets/changesets):

1. Run `pnpm changeset` on your branch to record a bump and a user-facing summary.
2. Commit the generated `.changeset/*.md` alongside your changes.
3. On merge to `main`, the [`Main` workflow](./.github/workflows/main.yml) either opens a "Release package" PR (when changesets are pending) or publishes `@codama/spec` to npm (when versions have been bumped).

The repo is currently in **release-candidate mode** under the `rc` tag (see `.changeset/pre.json`). Every `pnpm changeset version` produces a `1.6.0-rc.N` version. To cut the stable release, run `pnpm changeset pre exit`, then `pnpm changeset version` and merge the resulting "Release package" PR.

## License

[MIT](./LICENSE) — same as the rest of the Codama ecosystem.
