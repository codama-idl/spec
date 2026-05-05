# `@codama-internal/release`

Polyglot release tooling for the Codama spec repo. Drives both npm publishing
(for the JS packages) and crates.io publishing (for the Rust crates) from a
single set of changesets-inspired intent files.

This package is internal — it is not published.

## Commands

| Command                | What it does                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm release status`  | Print pending intent files and the resulting per-package bumps.                                                                         |
| `pnpm release version` | Apply the intent files: bump versions, prepend CHANGELOG entries, regenerate `COMPATIBILITY.md`, then delete the consumed intent files. |
| `pnpm release publish` | Publish bumped packages (npm + crates.io). Dry-run by default; set `CODAMA_RELEASE_DRY_RUN=false` to actually publish.                  |

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for the contributor workflow.

## Design

- **Intent files** in `.changeset/*.md` carry YAML frontmatter declaring which
  packages bump and at what level. Package ids are ecosystem-prefixed
  (`js::@codama/nodes`, `rust::codama-nodes`) to avoid name collisions.
- A special `spec: <level>` declaration auto-propagates to every generated
  package and the spec package itself.
- `pnpm release version` aggregates intents into a release plan, edits
  `package.json` / `Cargo.toml` versions in place (preserving `Cargo.toml`
  formatting via surgical line replacement), prepends Keep-a-Changelog-style
  entries to each package's `CHANGELOG.md`, and regenerates `COMPATIBILITY.md`.
- `pnpm release publish` invokes `pnpm publish` for JS packages and
  `cargo publish` for Rust crates. JS runs first so Rust changelog entries can
  reference the new JS versions if needed.
