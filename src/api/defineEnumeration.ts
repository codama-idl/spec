/**
 * `defineEnumeration(name, options)` — declares a named enumeration.
 *
 * Codegen emits a string-literal union (TS), a real `enum` (Rust), a class
 * (Python), etc., according to each language's idiom. Per-variant docs are
 * carried through to language-native member documentation.
 */

import type { EnumerationSpec, EnumerationVariantSpec } from './types';

export interface VariantOptions {
    readonly docs?: readonly string[];
}

/** Construct a single enumeration variant. */
export function variant(name: string, options: VariantOptions = {}): EnumerationVariantSpec {
    return Object.freeze({
        name,
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
    });
}

export interface DefineEnumerationOptions {
    readonly docs?: readonly string[];
    readonly variants: readonly EnumerationVariantSpec[];
}

export function defineEnumeration(name: string, options: DefineEnumerationOptions): EnumerationSpec {
    if (options.variants.length === 0) {
        throw new Error(`defineEnumeration("${name}"): variants must be non-empty`);
    }
    const seen = new Set<string>();
    for (const v of options.variants) {
        if (seen.has(v.name)) {
            throw new Error(`defineEnumeration("${name}"): duplicate variant "${v.name}"`);
        }
        seen.add(v.name);
    }
    return Object.freeze({
        name,
        variants: Object.freeze([...options.variants]),
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
    });
}
