/**
 * Hand-built spec fragments used to exercise the renderers in isolation.
 * Each fixture builds the smallest spec that contains the entity under
 * test plus enough surrounding declarations for the layout module to
 * resolve every cross-reference.
 *
 * The `@codama/spec` package only publicly exports types and a couple of
 * helpers; the authoring helpers (`defineNode`, `attribute`, …) are
 * internal. To keep the test surface aligned with the generator's public
 * dependency, we re-implement the small handful of authoring helpers we
 * need directly here. Tests should treat these as the same shape the
 * spec's internal authoring API produces.
 */

import type {
    AttributeSpec,
    CategorySpec,
    EnumerationSpec,
    EnumerationVariantSpec,
    LiteralValue,
    NestedUnionSpec,
    NodeSpec,
    Spec,
    TypeExpr,
    UnionMember,
    UnionSpec,
} from '@codama/spec';

// Type-expression primitives.

export function string(): TypeExpr {
    return { kind: 'string' };
}

export function stringIdentifier(): TypeExpr {
    return { kind: 'string', constraint: 'identifier' };
}

export function stringVersion(): TypeExpr {
    return { kind: 'string', constraint: 'version' };
}

export function codamaVersion(): TypeExpr {
    return { kind: 'codamaVersion' };
}

export function docs(): TypeExpr {
    return { kind: 'docs' };
}

export function boolean(): TypeExpr {
    return { kind: 'boolean' };
}

export function literal(value: LiteralValue): TypeExpr {
    return { kind: 'literal', value };
}

export function literalUnion(...values: LiteralValue[]): TypeExpr {
    return { kind: 'literalUnion', values: [...values] };
}

export function enumeration(name: string): TypeExpr {
    return { kind: 'enumeration', name };
}

export function node(name: string): TypeExpr {
    return { kind: 'node', name };
}

export function union(name: string): TypeExpr {
    return { kind: 'union', name };
}

export function nestedUnion(alias: string, name: string): TypeExpr {
    return { kind: 'nestedUnion', alias, name };
}

export function array(of: TypeExpr): TypeExpr {
    return { kind: 'array', of };
}

export function tuple(...items: TypeExpr[]): TypeExpr {
    return { kind: 'tuple', items: [...items] };
}

const integer = (width: 'i8' | 'i16' | 'i32' | 'i64' | 'i128' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128'): TypeExpr => ({
    kind: 'integer',
    width,
});

export const u8 = (): TypeExpr => integer('u8');
export const u16 = (): TypeExpr => integer('u16');
export const u32 = (): TypeExpr => integer('u32');
export const u64 = (): TypeExpr => integer('u64');
export const i32 = (): TypeExpr => integer('i32');

// Authoring helpers (local copies — see file header for rationale).

export interface AttributeOptions {
    readonly docs?: readonly string[];
    readonly optional?: boolean;
}

export function attribute(name: string, type: TypeExpr, options: AttributeOptions = {}): AttributeSpec {
    return {
        name,
        type,
        ...(options.optional ? { optional: true as const } : {}),
        ...(options.docs !== undefined ? { docs: options.docs } : {}),
    };
}

export function optionalAttribute(
    name: string,
    type: TypeExpr,
    options: Omit<AttributeOptions, 'optional'> = {},
): AttributeSpec {
    return attribute(name, type, { ...options, optional: true });
}

export interface VariantOptions {
    readonly docs?: readonly string[];
}

export function variant(name: string, options: VariantOptions = {}): EnumerationVariantSpec {
    return {
        name,
        ...(options.docs !== undefined ? { docs: options.docs } : {}),
    };
}

export interface DefineEnumerationOptions {
    readonly docs?: readonly string[];
    readonly variants: readonly EnumerationVariantSpec[];
}

export function defineEnumeration(name: string, options: DefineEnumerationOptions): EnumerationSpec {
    return {
        name,
        variants: [...options.variants],
        ...(options.docs !== undefined ? { docs: options.docs } : {}),
    };
}

export interface DefineNodeOptions {
    readonly docs?: readonly string[];
    readonly attributes: readonly AttributeSpec[];
    readonly examples?: readonly unknown[];
}

export function defineNode(kind: string, options: DefineNodeOptions): NodeSpec {
    return {
        kind,
        ...(options.docs !== undefined ? { docs: options.docs } : {}),
        attributes: [...options.attributes],
        examples: [...(options.examples ?? [])],
    };
}

export type UnionMemberInput = TypeExpr | string;

export interface DefineUnionOptions {
    readonly docs?: readonly string[];
    readonly members: readonly UnionMemberInput[];
}

export function defineUnion(name: string, options: DefineUnionOptions): UnionSpec {
    const normalised: UnionMember[] = options.members.map(input => {
        if (typeof input === 'string') return { kind: 'node', name: input };
        if (input.kind === 'node') return { kind: 'node', name: input.name };
        if (input.kind === 'union') return { kind: 'union', name: input.name };
        throw new Error(`defineUnion: invalid member ${JSON.stringify(input)}`);
    });
    return {
        name,
        members: normalised,
        ...(options.docs !== undefined ? { docs: options.docs } : {}),
    };
}

export interface DefineNestedUnionOptions {
    readonly docs?: readonly string[];
    readonly base: TypeExpr;
    readonly wrappers: readonly string[];
}

export function defineNestedUnion(name: string, options: DefineNestedUnionOptions): NestedUnionSpec {
    return {
        name,
        ...(options.docs !== undefined ? { docs: options.docs } : {}),
        base: options.base,
        wrappers: [...options.wrappers],
    };
}

export interface DefineCategoryOptions {
    readonly docs?: readonly string[];
    readonly nodes?: readonly NodeSpec[];
    readonly unions?: readonly UnionSpec[];
    readonly enumerations?: readonly EnumerationSpec[];
    readonly nestedUnions?: readonly NestedUnionSpec[];
}

export function defineCategory(name: string, options: DefineCategoryOptions = {}): CategorySpec {
    return {
        name,
        ...(options.docs !== undefined ? { docs: options.docs } : {}),
        nodes: [...(options.nodes ?? [])],
        unions: [...(options.unions ?? [])],
        enumerations: [...(options.enumerations ?? [])],
        nestedUnions: [...(options.nestedUnions ?? [])],
    };
}

// Pre-built fixtures.

/**
 * A minimal but self-consistent spec: one type node, one union, one
 * enumeration, all filed under a single `topLevel` category. Useful for
 * simple-case rendering tests.
 */
export function microSpec(): Spec {
    const myEnum = defineEnumeration('Endianness', {
        docs: ['A test enumeration.'],
        variants: [variant('be', { docs: ['Big-endian.'] }), variant('le', { docs: ['Little-endian.'] })],
    });
    const innerNode = defineNode('innerTypeNode', {
        docs: ['A simple inner node.'],
        attributes: [attribute('flag', boolean(), { docs: ['A flag.'] })],
    });
    const innerUnion = defineUnion('TypeNode', {
        members: ['innerTypeNode'],
    });
    const wrappingNode = defineNode('wrappingTypeNode', {
        docs: ['A node referencing the union and the enumeration.'],
        attributes: [
            attribute('payload', union('TypeNode'), { docs: ['A wrapped payload.'] }),
            attribute('endian', enumeration('Endianness'), { docs: ['A byte order.'] }),
            optionalAttribute('count', u32(), { docs: ['Optional count.'] }),
        ],
    });
    return {
        version: '1.0.0',
        categories: [
            defineCategory('topLevel', {
                enumerations: [myEnum],
                nodes: [innerNode, wrappingNode],
                unions: [innerUnion],
            }),
        ],
    };
}

/**
 * A spec with self-reference (a node whose attribute references itself),
 * for testing the `Self<Kind>` alias renderer.
 */
export function selfReferentialSpec(): Spec {
    const recursive = defineNode('recursiveTypeNode', {
        docs: ['A node referencing itself.'],
        attributes: [
            attribute('name', stringIdentifier(), { docs: ['The name.'] }),
            optionalAttribute('children', array(node('recursiveTypeNode')), { docs: ['Child nodes.'] }),
        ],
    });
    return {
        version: '1.0.0',
        categories: [defineCategory('topLevel', { nodes: [recursive] })],
    };
}
