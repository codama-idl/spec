/**
 * Attribute factories — produce frozen `AttributeSpec` values directly.
 *
 * Every attribute of a node MUST be constructed via one of these helpers.
 * The returned value IS the encoded form; `defineNode` consumes them as-is.
 */

import type { AttributeSpec, TypeExpr } from './types';

export interface AttributeOptions {
    /** Free-form prose paragraphs describing this attribute. */
    readonly docs?: readonly string[];
    /** When `true`, the attribute may be absent in encoded values. */
    readonly optional?: boolean;
}

/**
 * Declare an attribute. The default is a required attribute; pass
 * `{ optional: true }` (or use `optionalAttribute`) to mark it optional.
 */
export function attribute(name: string, type: TypeExpr, options: AttributeOptions = {}): AttributeSpec {
    return Object.freeze({
        name,
        type,
        ...(options.optional ? { optional: true as const } : {}),
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
    });
}

/**
 * Sugar for `attribute(name, type, { optional: true, ...rest })` — the most
 * common attribute shape after required ones.
 */
export function optionalAttribute(
    name: string,
    type: TypeExpr,
    options: Omit<AttributeOptions, 'optional'> = {},
): AttributeSpec {
    return attribute(name, type, { ...options, optional: true });
}
