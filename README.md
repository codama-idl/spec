# Codama Spec

The canonical Codama node specification.

## Overview

Codama is a standard for describing on-chain Solana programs as a graph of typed nodes (accounts, instructions, types, …). This repository contains:

- **The spec.** A machine-readable description of every node in the Codama node graph, authored in TypeScript under `src/spec/` and emitted as `spec.json`.
- **The meta-model API.** Authoring helpers (`defineNode`, `attribute`, primitives, compounds, …) exposed at `@codama/spec/api` for hand-authoring specs and test fixtures.
- **Internal codegen.** Generators under `generators/` produce the public artifacts (`spec.json`, `schema.json`, `docs/`). They are not exported from the `@codama/spec` package; they exist as internal tooling for this repo.

Each release line hosts exactly one spec major: this branch carries the current major, and previous majors live on their own maintenance branches (e.g. [`1.x`](https://github.com/codama-idl/spec/tree/1.x)) and publish as their own npm versions (e.g. `@codama/spec@^1`). See [RELEASING.md](./RELEASING.md).

Reference implementations (TypeScript node types, node factories, visitors, validators, renderers, the CLI) live in [codama-idl/codama](https://github.com/codama-idl/codama) and consume the published `@codama/spec` package. The Rust reference implementation lives in [codama-idl/codama-rs](https://github.com/codama-idl/codama-rs).

## Install

```sh
pnpm add @codama/spec
# or: npm install @codama/spec
```

## Quickstart

`@codama/spec` exposes two entrypoints:

- `@codama/spec` — the spec data of this release line's major: accessors (`getSpec`, `getNode`, `getUnion`, `getEnumeration`), the `SPEC_VERSION` constant, and the version-agnostic types (`NodeSpec`, `UnionSpec`, …).
- `@codama/spec/api` — the meta-model authoring API (`defineNode`, `attribute`, primitives, compounds, …) for hand-authoring specs and test fixtures.

### Read the spec

```ts
import { getSpec, getNode, SPEC_VERSION } from '@codama/spec';

const spec = getSpec();
console.log(spec.version); // → '2.0.0'
console.log(SPEC_VERSION); // → '2.0.0'

const account = getNode('accountNode');
console.log(account?.attributes.map(a => a.name));
// → ['identifier', 'size', 'docs', 'data', 'pda', 'discriminators']
```

### Hand-author a node

```ts
import { attribute, defineNode, string, u32 } from '@codama/spec/api';

const myNode = defineNode('myNode', {
    docs: ['A custom node, hand-authored.'],
    attributes: [attribute('name', string()), attribute('size', u32(), { docs: ['Size in bytes.'] })],
});
```

## Conventions

### Array attributes are omitted when empty

Every array attribute of a node — whether declared with `attribute(...)` or `optionalAttribute(...)` — follows a single serialisation convention:

- **On write**, an empty array is omitted from the encoded IDL. Codegen targets never emit `"myArray": []`.
- **On read**, a missing array attribute defaults to the empty array. Consumers MUST normalise an absent array to `[]` rather than treating it as a distinct state.

In other words, an absent array and an empty array are semantically identical: both mean "no items". This keeps encoded IDLs small (relevant because they are often uploaded on-chain) and makes adding or omitting an array attribute a non-breaking change.

The `attribute` vs `optionalAttribute` distinction therefore has **no effect on how arrays serialise** — it only documents intent and governs the optionality of non-array attributes. Should a future attribute genuinely need to distinguish "absent" from "empty", model it explicitly (e.g. an optional attribute wrapping the array) rather than relying on a bare array's presence.

### Attributes serialise in declaration order

Each node declares its attributes as an ordered array in `defineNode(...)`, and that order is authored deliberately: **static data first, child nodes and arrays last**. For example, `kind`, `identifier`, `docs` and other scalars precede large child collections such as `accounts`, `instructions` or `fields`.

- **On write**, generators MUST emit a node's attributes in this declaration order (with the implicit `kind` discriminator first). They MUST NOT re-serialise through a key-sorting structure — notably `serde_json::Value`, whose object type is a `BTreeMap` and therefore sorts keys alphabetically, pushing scalars like `identifier` after the child arrays.
- **On read**, attribute order carries no semantics; consumers MUST NOT depend on it.

Preserving declaration order keeps encoded IDLs readable: the identifying scalars of a node (`kind`, `identifier`, …) appear before its potentially large children, so a node's identity is legible at a glance even in a deeply nested IDL.

### Base attributes serialise last

The spec may declare **base attributes** (`Spec.base`): attributes shared by every node, declared once via `defineBase(...)` instead of repeated on each node. The current spec declares one — `plugins`, an optional array of `pluginNode`, making every node extensible with namespaced, consumer-defined data.

- **Codegen targets append base attributes after each node's declared attributes**, so they always serialise last (after the implicit `kind` discriminator and the declared attributes). They may also emit a shared `BaseNode` interface that every generated node type extends.
- Base attribute names never collide with declared attributes — `validate` rejects such specs.
- The array conventions above apply unchanged: an absent `plugins` array means "no plugins".

### Human text is `string | textNode`

Human-facing attributes (`docs`, display intents and labels, messages) are **text-shaped**: their type is the union of a plain string and a `textNode`. The `textNode` arm carries the same content plus `plugins` — like any node — so structured text metadata such as translations attaches without further spec changes (`i18n.*` namespace convention). The tree always holds exactly what the JSON says; there is no normalisation between the two arms.

- The **canonical form** of plugin-free text is the plain string: a `textNode` without plugins is valid but non-canonical, which validators flag as a lint.
- Multi-line text uses `\n` (for `docs`, this replaces v1's array-of-lines encoding). Whether an attribute may be multi-line is a per-attribute convention: `docs` may; intents, labels and messages are single-line by convention, with validators warning rather than structure forbidding.

## Repository layout

```
src/                       # package source (the @codama/spec public surface)
  api/                     # the meta-model authoring API (@codama/spec/api)
  spec/                    # the current major's spec content (re-exported by the root)
tests/                     # package tests
generators/                # internal codegen orchestrator + per-target generators
  index.ts                 # runs every registered generator sequentially
  json-spec/               # emits spec.json
  json-schema/             # emits schema.json (stub)
  docs/                    # renders the spec as markdown and emits docs/
spec.json                  # generated: the encoded spec
schema.json                # generated: JSON Schema (stub)
docs/                      # generated: browsable markdown docs
.changeset/                # release intent files (managed by @changesets/cli)
```

## Releasing

`@codama/spec` is released through [changesets](https://github.com/changesets/changesets):

1. Run `pnpm changeset` on your branch to record a bump and a user-facing summary.
2. Commit the generated `.changeset/*.md` alongside your changes.
3. On merge to `main`, the [`Main` workflow](./.github/workflows/main.yml) either opens a "Release package" PR (when changesets are pending) or publishes `@codama/spec` to npm (when versions have been bumped).

## License

[MIT](./LICENSE) — same as the rest of the Codama ecosystem.
