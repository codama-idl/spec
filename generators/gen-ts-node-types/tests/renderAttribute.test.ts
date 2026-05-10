import { describe, expect, it } from 'vitest';

import type { Layout } from '../src/layout';
import { buildLayout } from '../src/layout';
import { renderAttribute } from '../src/renderAttribute';
import { array, attribute, boolean, enumeration, microSpec, node, optionalAttribute, u32 } from './_fixtures';

const spec = microSpec();
const baseLayout = buildLayout(spec);

// Layout extension that knows about a `NumberFormat` enumeration plus a
// `numberTypeNode` location. Used by tests that exercise the
// narrowable-data-attribute path (which targets `numberTypeNode:format`)
// without needing to plumb the full v1 spec through these unit tests.
const layout: Layout = {
    ...baseLayout,
    enumerationNameToLocation: new Map([
        ...baseLayout.enumerationNameToLocation.entries(),
        ['NumberFormat', 'shared/numberFormat'],
    ]),
    nodeKindToLocation: new Map([
        ...baseLayout.nodeKindToLocation.entries(),
        ['numberTypeNode', 'typeNodes/NumberTypeNode'],
        ['recursiveTypeNode', 'recursiveTypeNode'],
    ]),
};

const ctx = { layout, currentLocation: 'someTypeNode' };

describe('renderAttribute — data attributes', () => {
    it('renders a required data attribute as a concrete line with no generic', () => {
        const result = renderAttribute('someTypeNode', attribute('flag', boolean()), ctx);
        expect(result.attributeName).toBe('flag');
        expect(result.bodyLine.content).toBe('    readonly flag: boolean;');
        expect(result.genericParam).toBeUndefined();
        expect(result.isChild).toBe(false);
        expect(result.isOptional).toBe(false);
    });

    it('renders an optional data attribute with `?:`', () => {
        const result = renderAttribute('someTypeNode', optionalAttribute('count', u32()), ctx);
        expect(result.bodyLine.content).toBe('    readonly count?: number;');
        expect(result.isOptional).toBe(true);
        expect(result.genericParam).toBeUndefined();
    });

    it('emits a JSDoc above the body line when docs are present', () => {
        const result = renderAttribute('someTypeNode', attribute('flag', boolean(), { docs: 'A flag.' }), ctx);
        expect(result.bodyLine.content).toBe('    /** A flag. */\n    readonly flag: boolean;');
    });
});

describe('renderAttribute — child attributes', () => {
    it('lifts a child attribute to a generic param', () => {
        const result = renderAttribute('someTypeNode', attribute('payload', node('innerTypeNode')), ctx);
        expect(result.bodyLine.content).toBe('    readonly payload: TPayload;');
        expect(result.genericParam?.content).toBe('TPayload extends InnerTypeNode = InnerTypeNode');
        expect(result.isChild).toBe(true);
    });

    it('extends an optional child constraint with ` | undefined`', () => {
        const result = renderAttribute('someTypeNode', optionalAttribute('payload', node('innerTypeNode')), ctx);
        expect(result.genericParam?.content).toBe(
            'TPayload extends InnerTypeNode | undefined = InnerTypeNode | undefined',
        );
        expect(result.bodyLine.content).toBe('    readonly payload?: TPayload;');
    });

    it('renders an array-of-node child as an array generic', () => {
        const result = renderAttribute('someTypeNode', attribute('items', array(node('innerTypeNode'))), ctx);
        expect(result.genericParam?.content).toBe('TItems extends Array<InnerTypeNode> = Array<InnerTypeNode>');
        expect(result.bodyLine.content).toBe('    readonly items: TItems;');
    });

    it('substitutes the self-alias in a child constraint when configured', () => {
        const result = renderAttribute(
            'recursiveTypeNode',
            optionalAttribute('children', array(node('recursiveTypeNode'))),
            ctx,
            { selfAlias: 'SelfRecursiveTypeNode' },
        );
        expect(result.genericParam?.content).toBe(
            'TChildren extends Array<SelfRecursiveTypeNode> | undefined = Array<SelfRecursiveTypeNode> | undefined',
        );
    });
});

describe('renderAttribute — narrowable data attributes', () => {
    // The caller decides which (nodeKind, attribute) pairs are
    // narrowable; the renderer just consults the set.
    const narrowableDataAttributes = new Set(['numberTypeNode:format']);

    it('lifts a narrowable data attribute to a generic, in the Data section', () => {
        const result = renderAttribute('numberTypeNode', attribute('format', enumeration('NumberFormat')), ctx, {
            narrowableDataAttributes,
        });
        // The body line references the generic, not the constraint type.
        expect(result.bodyLine.content).toBe('    readonly format: TFormat;');
        // The generic carries the constraint and a matching default.
        expect(result.genericParam?.content).toBe('TFormat extends NumberFormat = NumberFormat');
        // Section assignment is still data — narrowable doesn't make it a child.
        expect(result.isChild).toBe(false);
    });

    it('does not lift an attribute that is not in the narrowable set', () => {
        const result = renderAttribute('someTypeNode', attribute('format', enumeration('NumberFormat')), ctx, {
            narrowableDataAttributes,
        });
        expect(result.bodyLine.content).toBe('    readonly format: NumberFormat;');
        expect(result.genericParam).toBeUndefined();
    });

    it('falls back to "lift only children" when no narrowable set is supplied', () => {
        const result = renderAttribute('numberTypeNode', attribute('format', enumeration('NumberFormat')), ctx);
        expect(result.bodyLine.content).toBe('    readonly format: NumberFormat;');
        expect(result.genericParam).toBeUndefined();
    });
});
