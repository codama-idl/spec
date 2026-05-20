/**
 * The meta-model API used to declare the encoded Codama spec for each
 * major version. Authors of versioned content (`src/v<n>/`) consume
 * this module; consumers of the published `@codama/spec` package see
 * only the re-exports from `./public`.
 */

export * from './attribute';
export * from './compounds';
export * from './defineCategory';
export * from './defineEnumeration';
export * from './defineNestedUnion';
export * from './defineNode';
export * from './defineUnion';
export * from './primitives';
export * from './semanticAliases';
export * from './validate';
export type * from './types';
