/**
 * `defineNestedUnion(name, options)` — declares a recursive type alias,
 * e.g. `NestedTypeNode<T>`.
 *
 * Codegen renders one alternative per wrapper kind, plus the base case:
 *
 * ```ts
 * type Alias<T extends Base> = Wrapper1<Alias<T>> | Wrapper2<Alias<T>> | … | T;
 * ```
 *
 * Use the `nestedUnion(alias, innerKind)` `TypeExpr` helper to reference
 * an instance of this alias from an attribute.
 */

import type { NestedUnionSpec, TypeExpr } from './types';

export interface DefineNestedUnionOptions {
    readonly docs?: readonly string[];
    /**
     * The base type the recursion bottoms out in. Codegen renders this
     * as the alias's type-parameter constraint and as the final union arm.
     */
    readonly base: TypeExpr;
    /**
     * Node kinds that act as wrappers in the recursion. Each must be a
     * node whose attribute structure can wrap another `NestedUnion<T>`.
     */
    readonly wrappers: readonly string[];
}

export function defineNestedUnion(name: string, options: DefineNestedUnionOptions): NestedUnionSpec {
    return Object.freeze({
        name,
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
        base: options.base,
        wrappers: Object.freeze([...options.wrappers]),
    });
}
