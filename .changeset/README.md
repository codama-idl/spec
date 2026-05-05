# Intent files

This directory holds **release intent files**. Each markdown file declares one
or more package bumps, which the custom release tool in
[`scripts/release/`](../scripts/release/) aggregates into the next release.

The format is changesets-inspired — YAML frontmatter declaring per-package
bumps, followed by a markdown body that becomes the `CHANGELOG.md` entry.

## Example: explicit per-package bumps

```md
---
'js::@codama/nodes': minor
'rust::codama-nodes': minor
---

Adopt spec 1.7.0 — add `xyz` field on `AccountNode`.
```

## Example: spec auto-propagation

```md
---
spec: minor
---

Add `xyz` field on `AccountNode`.
```

When a `spec: <level>` declaration is present, the release tool synthesises
equivalent bumps on every package marked `codama.generated = true` (plus the
spec package itself).

## Conventions

- Package ids are **ecosystem-prefixed**:
  - `js::<npm-name>` for npm packages (e.g. `js::@codama/nodes`).
  - `rust::<crate-name>` for cargo crates (e.g. `rust::codama-nodes`).
- Bump levels follow semver: `major`, `minor`, `patch`.
- The body should be a self-contained, user-facing changelog entry (multi-line
  is fine; the first line becomes a top-level bullet, subsequent lines are
  indented under it).
- File names should be unique and descriptive, e.g. `add-xyz-field.md`.
- This `README.md` and any `config.json` are **not** treated as intent files.

## Workflow

1. Add a markdown file under `.changeset/` describing your change.
2. Run `pnpm release status` locally to verify the resulting bumps.
3. Open your PR. CI runs `pnpm release status` to summarise the impact.
4. After merge, CI runs `pnpm release version` (consuming the intent files,
   bumping versions, updating CHANGELOGs) and opens a "Release" PR. Merging
   the Release PR triggers `pnpm release publish` to publish to npm and
   crates.io.
