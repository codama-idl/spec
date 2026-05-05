/**
 * `@codama/spec/v1` — public surface for Codama v1 spec consumers.
 *
 * Re-exports the version-agnostic types and utilities from the meta-model's
 * public barrel, plus the v1-specific accessors (`getSpec`, `getNode`,
 * `getUnion`, `getEnumeration`) and the `SPEC_VERSION` constant.
 *
 * Authoring helpers (`defineNode`, primitives, …) are NOT re-exported.
 */

import type { EnumerationSpec, NodeSpec, Spec, UnionSpec } from '../api';
import { validate } from '../api';
import { ALL_ENUMERATIONS } from './enumerations';
import { NESTED_TYPE_NODE_WRAPPERS } from './nestedTypeNodeWrappers';
import { ALL_NODES, ALL_UNIONS } from './nodes';

export * from '../api/public';

/** The version string of the v1 spec. */
export const SPEC_VERSION = '1.6.0';

let cached: Spec | undefined;

/**
 * Returns the assembled and validated v1 spec. The first call performs
 * validation; subsequent calls return the cached value by reference.
 *
 * Throws an `Error` if the spec is internally inconsistent — refs that don't
 * resolve, duplicate names, naming convention violations, etc.
 */
export function getSpec(): Spec {
    if (cached) return cached;
    const built: Spec = {
        version: SPEC_VERSION,
        enumerations: ALL_ENUMERATIONS,
        nodes: ALL_NODES,
        unions: ALL_UNIONS,
        nestedTypeNodeWrappers: NESTED_TYPE_NODE_WRAPPERS,
    };
    const errors = validate(built);
    if (errors.length > 0) {
        throw new Error(`Invalid Codama v1 spec:\n${errors.map(e => `  - ${e}`).join('\n')}`);
    }
    cached = built;
    return cached;
}

/** Lookup a single node by its `kind`, or `undefined` if absent. */
export function getNode(kind: string): NodeSpec | undefined {
    return getSpec().nodes.find(n => n.kind === kind);
}

/** Lookup a single union by its `name`, or `undefined` if absent. */
export function getUnion(name: string): UnionSpec | undefined {
    return getSpec().unions.find(u => u.name === name);
}

/** Lookup a single enumeration by its `name`, or `undefined` if absent. */
export function getEnumeration(name: string): EnumerationSpec | undefined {
    return getSpec().enumerations.find(e => e.name === name);
}
