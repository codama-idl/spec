/**
 * `defineNode(kind, options)` — declares a single Codama node.
 *
 * The `kind` string is the discriminator value. By convention it ends in
 * `Node` and uses camelCase (e.g. `accountNode`, `arrayTypeNode`).
 *
 * `attributes` is an ordered array of values produced by `attribute(...)` or
 * `optionalAttribute(...)`. Order is preserved in the encoded spec and, by
 * extension, in generated code. The `kind: literal(<kind>)` discriminator
 * is implicit and is NOT declared by authors.
 *
 * The data-vs-children distinction is derived at codegen time from each
 * attribute's type tree (see `isChildAttribute` in `validate.ts`); the
 * meta-model itself just stores a flat list.
 */

import type { AttributeSpec, NodeSpec } from './types';

export interface DefineNodeOptions {
    /** Free-form prose paragraphs describing this node. */
    readonly docs?: readonly string[];
    /**
     * Attributes of the node, in declaration order. Construct each entry
     * via `attribute(...)` or `optionalAttribute(...)`.
     */
    readonly attributes: readonly AttributeSpec[];
    /** Free-form examples (shape defined per spec major version). */
    readonly examples?: readonly unknown[];
}

export function defineNode(kind: string, options: DefineNodeOptions): NodeSpec {
    return Object.freeze({
        kind,
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
        attributes: Object.freeze([...options.attributes]),
        examples: Object.freeze([...(options.examples ?? [])]),
    });
}
