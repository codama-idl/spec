/**
 * `@codama/spec` — entry point.
 *
 * Re-exports the latest stable Codama major's public surface. Today that's
 * `@codama/spec/v1`; future Codama majors will add their own subpaths
 * (`@codama/spec/v2`, …) and the entry point will track the latest.
 *
 * Consumers wanting a stable, version-pinned import should always use the
 * subpath form (`@codama/spec/v1`).
 */

export * from './v1';
