import { isChildAttribute } from '../../../src/api';
import type { TypeExpr } from '../../../src/api';
import { displayName } from '../ref';
import type { DocRef, MarkupRenderer } from '../types';

/** Renders a single type-cell: entity links are code-wrapped, primitives render as code spans. */
export function renderType(t: TypeExpr, markup: MarkupRenderer, linkTo: (r: DocRef) => string): string {
    switch (t.kind) {
        case 'node':
            return linkedEntity({ kind: 'node', name: t.name }, markup, linkTo);
        case 'union':
            return linkedEntity({ kind: 'union', name: t.name }, markup, linkTo);
        case 'enumeration':
            return linkedEntity({ kind: 'enumeration', name: t.name }, markup, linkTo);
        case 'nestedUnion':
            return (
                // the `<` is literal text, so `prose` lets stricter renderers escape it; `>` is inert everywhere
                `${linkedEntity({ kind: 'nestedUnion', name: t.alias }, markup, linkTo)}${markup.prose('<')}` +
                `${linkedEntity({ kind: 'node', name: t.name }, markup, linkTo)}>`
            );
        case 'anyNode':
            return markup.code('anyNode');
        case 'array':
            // a bare literalUnion needs parens before [] so 'a | b' reads as ('a' | 'b')[], not 'a' | ('b'[])
            if (t.of.kind === 'literalUnion') {
                return `${markup.code(`(${literalUnionBody(t.of.values)})`)}[]`;
            }
            return `${renderType(t.of, markup, linkTo)}[]`;
        case 'tuple':
            return `[${t.items.map(item => renderType(item, markup, linkTo)).join(', ')}]`;
        case 'boolean':
            return markup.code('boolean');
        case 'address':
            return markup.code('Address');
        case 'integer':
            return markup.code(t.width);
        case 'float':
            return markup.code(t.width);
        case 'string': {
            if (t.constraint === 'identifier') {
                return markup.code('IdentifierString');
            }
            if (t.constraint === 'namespace') {
                return markup.code('NamespaceString');
            }
            if (t.constraint === 'version') {
                return markup.code('SemverString');
            }
            return markup.code('string');
        }
        case 'docs':
            return markup.code('string[]');
        case 'json':
            return markup.code('Json');
        case 'codamaVersion':
            return markup.code('SemverString');
        case 'literal':
            return markup.code(JSON.stringify(t.value));
        case 'literalUnion':
            return markup.code(literalUnionBody(t.values));
        default: {
            t['kind'] satisfies never;
            throw new Error(`Unhandled TypeExpr: ${t['kind'] as string}`);
        }
    }
}

/** Whether a type tree references an enumeration (directly, or inside an array/tuple). */
function referencesEnumeration(t: TypeExpr): boolean {
    if (t.kind === 'enumeration') {
        return true;
    }
    if (t.kind === 'array') {
        return referencesEnumeration(t.of);
    }
    if (t.kind === 'tuple') {
        return t.items.some(item => referencesEnumeration(item));
    }
    return false;
}

/**
 * Children are attributes referencing an entity (node, union, nestedUnion, anyNode) or an enumeration.
 * References nested in arrays or tuples count too. Everything else is Data.
 */
export function isDocChild(t: TypeExpr): boolean {
    return isChildAttribute(t) || referencesEnumeration(t);
}

/** A code-wrapped link to an entity page (e.g. [`TypeNode`](...)). */
export function linkedEntity(ref: DocRef, markup: MarkupRenderer, linkTo: (r: DocRef) => string): string {
    return markup.link(markup.code(displayName(ref)), linkTo(ref));
}

/** The `"a" | "b"` body of a literalUnion, shared by the literalUnion and array-of-literalUnion cases. */
function literalUnionBody(values: Extract<TypeExpr, { kind: 'literalUnion' }>['values']): string {
    return values.map(value => JSON.stringify(value)).join(' | ');
}
