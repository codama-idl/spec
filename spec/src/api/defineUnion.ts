/**
 * `defineUnion(name, options)` — declares a named union of nodes.
 *
 * Members can be:
 *   - a node kind string (e.g. `'arrayTypeNode'`), or
 *   - a `node(...)` / `union(...)` reference (a `TypeExpr` produced by
 *     `primitives.ts`).
 *
 * Nested unions are preserved structurally in the encoded spec rather than
 * flattened. This serves two purposes:
 *   - DRY authoring (`union('StandaloneTypeNode')` instead of repeating 23
 *     kind names).
 *   - A signal to the Rust codegen to emit `From`/`Into` trait impls between
 *     the parent union and each nested union.
 */

import type { TypeExpr, UnionMember, UnionSpec } from './types';

export type UnionMemberInput = TypeExpr | string;

export interface DefineUnionOptions {
    readonly docs?: readonly string[];
    readonly members: readonly UnionMemberInput[];
}

export function defineUnion(name: string, options: DefineUnionOptions): UnionSpec {
    const normalised: UnionMember[] = options.members.map(normaliseMember);
    return Object.freeze({
        name,
        members: Object.freeze(normalised),
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
    });
}

function normaliseMember(input: UnionMemberInput): UnionMember {
    if (typeof input === 'string') {
        // Bare strings are treated as node kinds (the most common case).
        return Object.freeze({ kind: 'node' as const, name: input });
    }
    if (input.kind === 'node') return Object.freeze({ kind: 'node' as const, name: input.name });
    if (input.kind === 'union') return Object.freeze({ kind: 'union' as const, name: input.name });
    throw new Error(
        `defineUnion: members must be node kind strings, node(...) or union(...) references; got ${JSON.stringify(input)}`,
    );
}
