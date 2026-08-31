/**
 * `defineBase(options)` — declares the attributes shared by every node of
 * a spec (its "base node" shape).
 *
 * `attributes` is an ordered array of values produced by `attribute(...)`
 * or `optionalAttribute(...)`, exactly as in `defineNode`. Codegen targets
 * append them after each node's declared attributes, so base attributes
 * always serialise last. Name collisions with any node's declared
 * attributes are rejected by `validate`.
 */

import type { AttributeSpec, BaseSpec, Docs } from './types';

export interface DefineBaseOptions {
    readonly docs?: Docs;
    /**
     * Attributes shared by every node, in declaration order. Construct each
     * entry via `attribute(...)` or `optionalAttribute(...)`.
     */
    readonly attributes: readonly AttributeSpec[];
}

export function defineBase(options: DefineBaseOptions): BaseSpec {
    return Object.freeze({
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
        attributes: Object.freeze([...options.attributes]),
    });
}
