/**
 * `defineCategory(name, options)` — group a coherent set of nodes,
 * unions, enumerations, and nested unions under a single name.
 *
 * Categories double as a filing hint for codegen targets that organise
 * output by category (e.g. the TypeScript node-types generator emits
 * each category into its own subdirectory). Category names are arbitrary
 * strings; the spec doesn't constrain them.
 */

import type { CategorySpec, EnumerationSpec, NestedUnionSpec, NodeSpec, UnionSpec } from './types';

export interface DefineCategoryOptions {
    readonly docs?: readonly string[];
    readonly nodes?: readonly NodeSpec[];
    readonly unions?: readonly UnionSpec[];
    readonly enumerations?: readonly EnumerationSpec[];
    readonly nestedUnions?: readonly NestedUnionSpec[];
}

export function defineCategory(name: string, options: DefineCategoryOptions = {}): CategorySpec {
    return Object.freeze({
        name,
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
        nodes: Object.freeze([...(options.nodes ?? [])]),
        unions: Object.freeze([...(options.unions ?? [])]),
        enumerations: Object.freeze([...(options.enumerations ?? [])]),
        nestedUnions: Object.freeze([...(options.nestedUnions ?? [])]),
    });
}
