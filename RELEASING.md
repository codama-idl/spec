# Releasing

This document is the canonical release process for the whole Codama ecosystem. It applies to every repository in the [`codama-idl`](https://github.com/codama-idl) organisation: this repo (`spec`), [`codama`](https://github.com/codama-idl/codama), [`codama-rs`](https://github.com/codama-idl/codama-rs), and all the renderer repos. Repo-specific details live in each repo's `CONTRIBUTING.md`; this file defines the shared system.

Day-to-day releases (patches and minors) are fully automated by [changesets](https://github.com/changesets/changesets): merge a PR with a changeset, review and merge the resulting release PR, and the package publishes to npm under the `latest` dist-tag. The rest of this document is about the exceptional event: **releasing a new major version**.

## The big picture

There is no `main` branch. Each repo has **one branch per major** (`1.x`, `2.x`, …), and a new major goes through three phases — cut, bake, promote:

Horizontal lines are **git branches**; downward forks are **npm publishes**, written `npm <version> @<dist-tag>`; the vertical markers are the three **phases**:

```
phase:              CUT                        BAKE                      PROMOTE
                     │                          │                           │
branch 1.x ━━━━━━━━━━┾━━━━━━━━━━━━━━━━━━━━━━━━━━┾━━━━━━━━━━━━━━━━━━━━━━━━━━━┾━━━━━━━━━━━━━▶
(default branch)     │     │                    │      │                    │     │
                     │     └▶ npm 1.9.3 @latest │      └▶ npm 1.10.0 @latest│     └▶ npm 1.10.1 @release-1.x
                     │                          │                           │
branch 2.x           └━━━━━━┯━━━━━━━━━━━━━━━━━━━┿━━━━━━━━━━┯━━━━━━━━━━━━━━━━┿━━━━━┯━━━━━━━▶
(default from        forked │                   │          │                │     │
 promote onwards)    from   └▶ npm 2.0.0-rc.0 @rc          └▶ npm 2.0.0 @next     └▶ npm 2.0.1 @latest
                     1.x
```

Note how `1.x` keeps shipping stable releases to `latest` right through the bake, and only switches to `release-1.x` at promote time — the exact moment `2.x` takes over `latest` and the default-branch role.

Two invariants make this safe for the ecosystem:

1. **The latest Codama tooling reads every IDL ever produced.** Older Codama IDL majors are upgraded at ingestion via [`@codama/upgrade`](https://github.com/codama-idl/codama/tree/main/packages/upgrade), and Anchor IDLs via [`@codama/nodes-from-anchor`](https://github.com/codama-idl/codama/tree/main/packages/nodes-from-anchor). Renderers only ever target the latest nodes.
2. **`latest` on npm never moves until the ecosystem has had time to adjust.** A new major ships release candidates first, then bakes as final versions under the `next` dist-tag, and only becomes `latest` at promote time.

Major numbers are **per-repo and independent**: `@codama/renderers-rust` v4 may well consume `@codama/spec` v2. The process below is version-agnostic; only the ordering across repos is coordinated (see [the release train](#the-release-train)).

## Branches

Each `N.x` branch is configured once, at birth, and never reconfigured until it is superseded:

| Setting                                                                                          | Value                                                           |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `.changeset/config.json` → `baseBranch`                                                          | `"N.x"`                                                         |
| Release-version env in `.github/workflows/main.yml` (cosmetic, used in release commit/PR titles) | `N.x`                                                           |
| Publish dist-tag                                                                                 | default (`latest`) until superseded; ` --tag release-N.x` after |

The **default branch is always the branch that owns `latest`**, and it only ever moves forward, once per major, at promote time. Release workflows trigger on `push: branches: ['*.x']`, and branch protection uses a `*.x` wildcard rule. Pre-1.0 repos keep `main` until their first stable major, then rename it to `1.x`; the `release-tools` repo keeps `main` permanently (it is tooling, not a versioned line).

> [!WARNING]
> Branches never reconverge: no merges or rebases across majors, in either direction. Changes travel between them only as cherry-picks (see [porting changes](#porting-changes-between-majors)).

## npm dist-tags

| Tag           | Meaning                                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `latest`      | The current stable major. What `npm install` gives you. Owned by the default branch.                                                                                                  |
| `release-N.x` | The maintenance line of superseded major N (e.g. `release-1.x`).                                                                                                                      |
| `rc`          | Release candidates of the next major, published from the freshly cut branch in changesets [pre-release mode](https://github.com/changesets/changesets/blob/main/docs/prereleases.md). |
| `next`        | The next major during the bake window: final versions, published for early adopters, not yet `latest`.                                                                                |

> [!NOTE]
> npm rejects dist-tag names that parse as semver ranges, which rules out simpler names like `v1` or `1.x`. Hence `release-1.x`.

Git tags are `vX.Y.Z` in single-package repos and `<package>@X.Y.Z` in the `codama` monorepo (both are changesets defaults; no manual tagging).

## The lifecycle of a new major

Steps marked 🤖 are automated by the [`cut`, `bake` and `promote` workflows](#automation) of [`codama-idl/release-tools`](https://github.com/codama-idl/release-tools) where adopted; run them manually otherwise. A [tracking issue](#the-tracking-issue) records overall progress.

### 1. Cut

Run once, when work on major N+1 starts. `N.x` and the default branch are **not touched**.

- [ ] 🤖 Create the `(N+1).x` branch from the tip of `N.x`.
- [ ] 🤖 On `(N+1).x`, in a single birth commit:
    - set `"baseBranch": "(N+1).x"` in `.changeset/config.json`;
    - set the release-version env in `.github/workflows/main.yml` to `(N+1).x`;
    - enter pre-release mode: `pnpm changeset pre enter rc` (commits `.changeset/pre.json`);
    - seed the major changeset (covering **all** public packages in a monorepo, see [the same-major invariant](#monorepos-the-same-major-invariant)).
- [ ] Open the [tracking issue](#the-tracking-issue) for major N+1.

From birth, `(N+1).x` can never publish to `latest`: pre-release mode forces the `rc` dist-tag, so every merged release PR ships a `(N+1).0.0-rc.n` for downstream repos to develop against. Meanwhile `N.x` remains the default branch and keeps publishing stable releases to `latest` as usual; [port](#porting-changes-between-majors) them forward.

### 2. Bake

Run when N+1 is feature-complete and the coordinated [release train](#the-release-train) is ready to ship. The goal: real, final versions exist so integrators (explorers, wallets, indexers) can migrate on their own terms, while `npm install` keeps giving everyone the previous stable major.

- [ ] 🤖 On `(N+1).x`, in a single PR: exit pre-release mode (`pnpm changeset pre exit`) and append ` --tag next` to the publish script.
- [ ] Merge the release PR: `(N+1).0.0` publishes under `next`.
- [ ] Announce the bake and its intended duration. Default: **six weeks**, extended by judgement based on the adoption checklist in the tracking issue.
- [ ] Patches found during the bake follow the normal changesets flow and publish under `next`.

### 3. Promote

Run when the bake is complete. This is the only phase that touches `latest`, and the order matters: `N.x` must stop claiming `latest` _before_ the dist-tags move.

- [ ] 🤖 On `N.x`, one commit: append ` --tag release-N.x` to the publish script.
- [ ] 🤖 For each published package: `npm dist-tag add <package>@<current-next-version> latest`, then `npm dist-tag rm <package> next`.
- [ ] 🤖 On `(N+1).x`, one commit: remove ` --tag next` from the publish script.
- [ ] 🤖 Set `(N+1).x` as the repository's default branch.
- [ ] Audit `git log --oneline (N+1).x..N.x` for unported commits: each must be forward-ported or recorded as deliberately dropped in the tracking issue (the new major ships as a superset of the old one's final state).
- [ ] Mark the corresponding GitHub release as the latest release.
- [ ] Announce, and close the tracking issue.

## Porting changes between majors

- A change lands first on the branch where it applies most directly; when it affects multiple live majors, land it on the **default branch** first, then port it.
- Port with `git cherry-pick -x` on a fresh branch and an ordinary PR against the target branch. The `-x` trailer is what makes the promote-phase audit greppable, and the `.changeset/*.md` file travels inside the commit so each branch versions and publishes independently.
- If the pick conflicts beyond repair, reimplement the change natively on the target branch and link the original PR: a port is about the behaviour, not the patch.

## Maintenance releases on old majors

Nothing special: open a PR against the `N.x` branch with a changeset, merge, review and merge the release PR that opens against `N.x`. It publishes under `release-N.x` and can never move `latest`.

## The release train

A new **spec** major drives a coordinated wave through the ecosystem, in dependency order:

```
1. spec vN+1 (rc) ──→ 2. codama + codama-rs ──→ 3. renderers, CLI ──→ 4. shared bake ──→ 5. coordinated promote
                        · freeze vN node types      · consume the new
                        · add upgradeVNToVN+1        codama major
                        · living spec pin → rc
```

1. **spec** runs its cut first: the standard must stabilise before implementations chase it.
2. **codama** freezes the outgoing major's node types (via its `@codama/spec-v1`-style aliased pin), adds the `upgradeVNToVN+1` step to the append-only chain in `@codama/upgrade`, and points its living pin at the spec rc. **codama-rs** mirrors this in Rust.
3. **Renderers and the CLI** run their own cuts (their own `(N+1).x` branches, at their own major numbers) to consume the new codama major.
4. All repos bake together, so integrators migrate against one coherent set of `next` versions.
5. The promote is coordinated: spec first, the rest in the same window. One announcement covers the wave.

Repos whose new major does **not** stem from a spec major (e.g. a renderer breaking its own options API) follow the same three phases independently; the train only dictates ordering when the spec moves.

### crates.io (codama-rs)

crates.io has no dist-tags, so the bake works differently:

- During the rc phase and the bake, publish **pre-release versions** (`(N+1).0.0-rc.n`). Cargo's default resolution ignores pre-releases, so existing users are unaffected and early adopters opt in explicitly.
- Publish the final `(N+1).0.0` **at promote time**, not at bake start. Existing `"N"` requirements never jump majors, and newcomers running `cargo add` only start getting N+1 once the ecosystem has promoted.

## Monorepos: the same-major invariant

In the `codama` monorepo, **every public package shares the same major version**, equal to the branch major (and to the spec major it supports). "Codama v1" therefore means something across the whole package suite, and no `@codama/*` package ever surprises downstream with an independent major.

The consequences:

- The cut's seeded changeset declares a major bump for **all** public packages, even those without breaking changes.
- Breaking changes to individual packages are **era-gated**: they wait for the next cut (or ship behind a backwards-compatible API in the meantime).
- The [postversion guard](#automation) fails the release PR if the resulting majors diverge.

## The tracking issue

Each major transition gets one tracking issue in the repo that drives it (the spec repo for spec-driven waves). It should contain:

- links to the cut/bake/promote checklists above, ticked as they complete across repos;
- an **ecosystem adoption checklist**: the known downstream integrators (explorers, wallets, indexers, major program repos) and their migration status, which gates the promote;
- dates: cut, first rc, bake start, planned promote.

## Automation

[`codama-idl/release-tools`](https://github.com/codama-idl/release-tools) hosts the shared automation:

- **`cut`**, **`bake`** and **`promote`** reusable workflows, called from thin `workflow_dispatch` wrappers in each repo, automating the 🤖 steps of the three phases.
- A dependency-free **`postversion` guard** hooked into each repo's changesets `version-script`. After `changeset version`, it asserts that a major crossing happens only on a freshly cut branch (never on the default branch), that the branch name matches the new major, and — in monorepos — that all public package majors stay equal. Violations fail the release PR loudly, and any script rewrites appear as reviewable diffs in it.

Until a repo adopts release-tools, run the 🤖 steps by hand, in the order listed.
