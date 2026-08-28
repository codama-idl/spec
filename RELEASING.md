# Releasing

This document is the canonical release process for the whole Codama ecosystem. It applies to every repository in the [`codama-idl`](https://github.com/codama-idl) organisation: this repo (`spec`), [`codama`](https://github.com/codama-idl/codama), [`codama-rs`](https://github.com/codama-idl/codama-rs), and all the renderer repos. Repo-specific details live in each repo's `CONTRIBUTING.md`; this file defines the shared system.

Day-to-day releases (patches and minors) are fully automated by [changesets](https://github.com/changesets/changesets): merge a PR with a changeset, review and merge the resulting release PR, and the package publishes to npm under the `latest` dist-tag. The rest of this document is about the exceptional event: **releasing a new major version**.

## The big picture

`main` is permanent and always hosts the bleeding edge. Each released major gets an `N.x` branch (`1.x`, `2.x`, …), cut from `main` when work on the next major starts. A new major goes through two events — **cut** and **promote** — bracketing one window, the **candidacy**:

```
                         CUT                              CANDIDACY                            PROMOTE
                          │                         (candidate declared)                          │
branch main             ━━┿━━━━━━━┯━━━━━━━━━━━━━━━━━━━━┯━━━━━━┿━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┿━━━┯━━━━━━━━━━━▶
(bleeding edge, forever)  │       └▶ npm 2.0.0-rc.0 @rc│                                              └▶ npm 2.0.0 @latest
                          │                            └▶ npm 2.0.0-rc.8 @rc (the candidate)
branch 1.x                └━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━▶
(stable v1)                    └▶ npm 1.9.3 @latest                     └▶ npm 1.10.0 @latest           └▶ npm 1.10.1 @release-1.x

DEFAULT BRANCH:  ══ main ═╡╞═════════════════════════ 1.x (stable docs) ══════════════════════════╡╞══ main ══════▶
```

Horizontal lines are **git branches**; downward forks are **npm publishes**, written `npm <version> @<dist-tag>`. Note how `1.x` keeps shipping stable releases to `latest` right through the candidacy, and only switches to `release-1.x` at promote time — the exact moment `main` publishes the stable major, which takes `latest` and the default-branch role back.

Two invariants make this safe for the ecosystem:

1. **The latest Codama tooling reads every IDL ever produced.** Older Codama IDL majors are upgraded at ingestion via [`@codama/upgrade`](https://github.com/codama-idl/codama/tree/main/packages/upgrade), and Anchor IDLs via [`@codama/nodes-from-anchor`](https://github.com/codama-idl/codama/tree/main/packages/nodes-from-anchor). Renderers only ever target the latest nodes.
2. **`latest` on npm never moves until the ecosystem has had time to adjust.** A new major lives as release candidates until a specific candidate is declared and validated by integrators; only the promote publishes a stable version, and `latest` moves with that publish.

Major numbers are **per-repo and independent**: `@codama/renderers-rust` v4 may well consume `@codama/spec` v2. The process below is version-agnostic; only the ordering across repos is coordinated (see [the release train](#the-release-train)).

## Branches

| Branch             | Role                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `main`             | Permanent. Always the bleeding edge: the current major in steady state, the next major while a transition is in flight. Publishes to `latest` in steady state, to `rc` during a transition. |
| `N.x` (e.g. `1.x`) | Maintenance branch for major N, cut from `main` when work on N+1 starts, kept forever. Publishes to `latest` while N is the stable major, to `release-N.x` once superseded.                 |

`main` is permanent for a reason: it is the one branch name that survives major transitions, so every clone, fork, script and contributor habit keeps pointing at the bleeding edge across eras. Maintenance branches never change role after promote; only their publish tag does.

The **default branch is `main`, except during a transition** (from cut until promote), when the latest stable `N.x` becomes the default so that visitors, forks and drive-by PRs land on released code and its documentation rather than work in progress.

Release workflows trigger on `push: branches: [main, '[0-9]+.x']`. The maintenance pattern is deliberately numeric: a looser glob like `'*.x'` also matches working branches ending in `.x`, causing pushes of those branches to run the release job. Branch protection is managed **as code**: the canonical ruleset lives in [`codama-idl/release-tools`](https://github.com/codama-idl/release-tools) (`ruleset.json`) and is applied to every repository by its `sync-policies` workflow.

> [!WARNING]
> Once cut, `main` and `N.x` never reconverge: no merges or rebases across majors, in either direction. Changes travel between them only as cherry-picks (see [porting changes](#porting-changes-between-majors)).

## npm dist-tags

| Tag           | Meaning                                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `latest`      | The current stable major. What `npm install` gives you.                                                                                                               |
| `release-N.x` | The maintenance line of superseded major N (e.g. `release-1.x`).                                                                                                      |
| `rc`          | Release candidates of the next major, published from `main` in changesets [pre-release mode](https://github.com/changesets/changesets/blob/main/docs/prereleases.md). |

> [!NOTE]
> npm rejects dist-tag names that parse as semver ranges, which rules out simpler names like `v1` or `1.x`. Hence `release-1.x`. After a promote, the `rc` tag keeps pointing at the last release candidate until the next major's first rc — a harmless, accepted cosmetic.

Git tags are `vX.Y.Z` in single-package repos and `<package>@X.Y.Z` in the `codama` monorepo (both are changesets defaults; no manual tagging). Release-candidate versions are automatically marked as pre-releases on GitHub, so they never take the repository's "Latest release" badge.

## The lifecycle of a new major

The two events are fully automated by the [`cut` and `promote` workflows](#automation) of [`codama-idl/release-tools`](https://github.com/codama-idl/release-tools): each is a single `workflow_dispatch`, and every step below happens as direct, tool-generated commits (the release app bypasses branch protection for exactly this purpose). Repos that have not adopted release-tools run the same steps by hand. A [tracking issue](#the-tracking-issue) records overall progress.

### 1. Cut

Dispatch once, when work on major N+1 starts and `main` still holds major N. The workflow:

- creates the `N.x` branch from the tip of `main`, with a single birth commit setting `"baseBranch": "N.x"` in `.changeset/config.json` (everything else — publish tag `latest`, release-version env `N.x` — is inherited correct);
- commits to `main`: the release-version env moves to `(N+1).x`, pre-release mode is entered (`changeset pre enter rc`), and the major changeset is seeded (covering **all** public packages in a monorepo, see [the same-major invariant](#monorepos-the-same-major-invariant));
- sets `N.x` as the repository's default branch;
- opens the [tracking issue](#the-tracking-issue).

From here, `main` can never publish to `latest`: pre-release mode forces the `rc` dist-tag, so every merged release PR ships a `(N+1).0.0-rc.n` for downstream repos to develop against. Meanwhile `N.x` keeps publishing stable releases to `latest` as usual; [port](#porting-changes-between-majors) them across.

### 2. Candidacy

The window between cut and promote. Release candidates ship freely as changesets land, until the maintainers **declare a candidate** — the formal signal that validation can start. The declaration is:

- a comment on the tracking issue naming the exact **candidate set** — a matrix of repos and versions for a [release-train](#the-release-train) wave (e.g. spec `2.0.0-rc.8`, codama `2.0.0-rc.5`, renderers-rust `4.0.0-rc.2`), or a single version for an independent major — plus the **earliest promote date** (default: six weeks out);
- one announcement in the [spec repository's Discussions](https://github.com/codama-idl/spec/discussions) (Announcements category) linking that comment — one post per wave, never one per repo.

From declaration until promote, the branch is **frozen except for fixes**: new features wait and become (N+1).1.0 minors after promote. A fix that turns out to be breaking ships as a new rc and re-declares the candidate; whether the clock restarts is a judgement call recorded on the tracking issue. Integrators (explorers, wallets, indexers) validate against the candidate and report on the announcement thread, feeding the adoption checklist that gates the promote.

### 3. Promote

Dispatch once the candidacy is complete. The workflow, in order:

- commits ` --tag release-N.x` onto `N.x`'s publish script — `N.x` stops claiming `latest` _before_ anything else happens;
- commits `changeset pre exit` onto `main`;
- sets `main` as the repository's default branch again.

Then the humans finish:

- review and merge the resulting release PR: the stable `(N+1).0.0` publishes and **takes `latest` at publish time** — no dist-tag surgery, and the landmark version itself owns the tag;
- audit `git log --oneline main..N.x` for unported commits: each must be forward-ported or recorded as deliberately dropped in the tracking issue (the new major ships as a superset of the old one's final state);
- announce on the Discussions thread, and close the tracking issue.

### Fast-track majors

A repo whose new major does **not** stem from a spec major (e.g. a renderer breaking its own options API) may skip the candidacy: dispatch cut, then promote, back to back. The invariants still hold — every major crossing has a freshly cut `N.x` behind it, and the guard enforces this — so there is deliberately **no** bare-changeset shortcut for majors. Whether such a release warrants a Discussions announcement is a judgement call.

## Porting changes between majors

- A change lands first on the branch where it applies most directly; when it affects multiple live majors, land it on the **default branch** first (`N.x` during a transition, `main` in steady state), then port it.
- Port with `git cherry-pick -x` on a fresh branch and an ordinary PR against the target branch. The `-x` trailer is what makes the promote-time audit greppable, and the `.changeset/*.md` file travels inside the commit so each branch versions and publishes independently.
- If the pick conflicts beyond repair, reimplement the change natively on the target branch and link the original PR: a port is about the behaviour, not the patch.

## Maintenance releases on old majors

Nothing special: open a PR against the `N.x` branch with a changeset, merge, review and merge the release PR that opens against `N.x`. It publishes under `release-N.x` and can never move npm's `latest`.

> [!NOTE]
> A stable maintenance release does take the repository's GitHub "Latest release" badge (the changesets action always marks new stable releases as latest, and in the monorepo the badge lands on whichever package's release is created last). This is a known, accepted cosmetic: npm's `latest` — the tag that matters — is unaffected.

## The release train

A new **spec** major drives a coordinated wave through the ecosystem, in dependency order:

```
1. spec vN+1 (rc) ──→ 2. codama + codama-rs ──→ 3. renderers, CLI ──→ 4. shared candidacy ──→ 5. coordinated promote
                        · freeze vN node types      · consume the new
                        · add upgradeVNToVN+1        codama major
                        · living spec pin → rc
```

1. **spec** runs its cut first: the standard must stabilise before implementations chase it.
2. **codama** freezes the outgoing major's node types (via its `@codama/spec-v1`-style aliased pin), adds the `upgradeVNToVN+1` step to the append-only chain in `@codama/upgrade`, and points its living pin at the spec rc. **codama-rs** mirrors this in Rust.
3. **Renderers and the CLI** run their own cuts (their own `N.x` maintenance branches, at their own major numbers) to consume the new codama major.
4. The candidacy is shared: one declaration, one candidate matrix, one announcement — integrators validate one coherent set of release candidates.
5. The promote is coordinated: spec first, the rest in the same window. One closing announcement covers the wave.

### crates.io (codama-rs)

crates.io has no dist-tags, and with the candidacy model none are needed: the same rule applies to npm and cargo alike — **pre-releases through the candidacy, the stable version at promote**. Cargo's default resolution ignores pre-releases, so existing users are unaffected, early adopters opt in explicitly, and existing `"N"` requirements never jump majors.

## Monorepos: the same-major invariant

In the `codama` monorepo, **every public package shares the same major version**, equal to the major it supports in the spec. "Codama v1" therefore means something across the whole package suite, and no `@codama/*` package ever surprises downstream with an independent major.

The consequences:

- The cut's seeded changeset declares a major bump for **all** public packages, even those without breaking changes.
- Breaking changes to individual packages are **era-gated**: they wait for the next cut (or ship behind a backwards-compatible API in the meantime).
- The [postversion guard](#automation) fails the release PR if the resulting majors diverge.

## The tracking issue

Each major transition gets one tracking issue in the repo that drives it (the spec repo for spec-driven waves). Keep it lightweight and skimmable — headline status up top, checklists tucked into collapsible `<details>` sections. It should contain:

- the cut/candidacy/promote checklists, ticked as they complete across repos;
- the **candidate declaration** (set + earliest promote date) once made;
- an **ecosystem adoption checklist**: the known downstream integrators and their validation status, which gates the promote;
- dates: cut, first rc, declaration, promote.

## Automation

[`codama-idl/release-tools`](https://github.com/codama-idl/release-tools) hosts the shared automation:

- **`cut`** and **`promote`** reusable workflows, called from thin `workflow_dispatch` wrappers in each repo. They perform every mechanical step — branch creation, the tool-generated commits on `main` and `N.x`, and the default-branch flips — using GitHub App tokens scoped down per step (the admin-capable token exists only for the flip step, and direct commits rely on the app's ruleset bypass).
- A dependency-free **`postversion` guard** hooked into each repo's changesets `version-script`. After `changeset version`, it asserts that a **stable** major crossing happens only on `main` with the corresponding `N.x` maintenance branch already cut, that rc crossings happen only in pre-release mode, and — in monorepos — that all public package majors stay equal. Violations fail the release PR loudly.
- The canonical repository policies — **`ruleset.json`** (branch protection) and **`repo-settings.json`** (merge methods, squash defaults, auto-merge) — and the **`sync-policies`** workflow that applies them to every repository in the organisation.

Until a repo adopts release-tools, run the equivalent steps by hand, in the order listed in [the lifecycle](#the-lifecycle-of-a-new-major).
