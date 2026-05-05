/**
 * `@codama-internal/gen-ts-node-types` — public programmatic surface.
 *
 * Per-major drivers (`v1.ts`, eventually `v2.ts`, …) own the spec-
 * specific configuration tables and call `generate(spec, options)` from
 * here. Layout helpers, individual renderers, and other internals stay
 * out of this barrel; import them from their source files when needed
 * (e.g. inside tests).
 */

export { generate, validateGenerateOptions, type GenerateOptions } from './generate';
