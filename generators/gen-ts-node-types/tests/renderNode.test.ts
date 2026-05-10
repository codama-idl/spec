import { describe, expect, it } from 'vitest';

import { buildLayout } from '../src/layout';
import { renderNode } from '../src/renderNode';
import {
    attribute,
    defineNode,
    defineUnion,
    microSpec,
    optionalAttribute,
    selfReferentialSpec,
    union,
} from './_fixtures';

describe('renderNode', () => {
    it('emits an interface with kind discriminator, generics, and section markers', () => {
        const spec = microSpec();
        const layout = buildLayout(spec);
        const wrapping = spec.nodes.find(n => n.kind === 'wrappingTypeNode')!;
        const result = renderNode(wrapping, { layout, currentLocation: 'wrappingTypeNode' });
        const c = result.content;
        expect(c).toContain('export interface WrappingTypeNode<');
        expect(c).toContain("readonly kind: 'wrappingTypeNode';");
        expect(c).toContain('// Data.');
        expect(c).toContain('// Children.');
        // The `endian` enumeration is data; the `payload` union is a child.
        expect(c).toContain('readonly endian: Endianness;');
        expect(c).toContain('readonly payload: TPayload;');
        // Optional u32 attribute should land in Data with `?: number;`.
        expect(c).toContain('readonly count?: number;');
    });

    it('lifts every child attribute to a generic param', () => {
        const spec = microSpec();
        const layout = buildLayout(spec);
        const wrapping = spec.nodes.find(n => n.kind === 'wrappingTypeNode')!;
        const result = renderNode(wrapping, { layout, currentLocation: 'wrappingTypeNode' });
        expect(result.content).toContain('TPayload extends TypeNode = TypeNode');
    });

    it('emits no Data or Children section when the corresponding group is empty', () => {
        const spec = microSpec();
        const layout = buildLayout(spec);
        const inner = spec.nodes.find(n => n.kind === 'innerTypeNode')!;
        const result = renderNode(inner, { layout, currentLocation: 'innerTypeNode' });
        expect(result.content).toContain('// Data.');
        expect(result.content).not.toContain('// Children.');
    });

    it('inserts a SelfXxxNode alias for self-referential nodes', () => {
        const spec = selfReferentialSpec();
        const layout = buildLayout(spec);
        const recursive = spec.nodes.find(n => n.kind === 'recursiveTypeNode')!;
        const result = renderNode(recursive, { layout, currentLocation: 'recursiveTypeNode' });
        expect(result.content).toContain('type SelfRecursiveTypeNode = RecursiveTypeNode;');
        expect(result.content).toContain('TChildren extends Array<SelfRecursiveTypeNode>');
    });

    it('emits a JSDoc above the interface declaration when the node has docs', () => {
        const spec = microSpec();
        const layout = buildLayout(spec);
        // `wrappingTypeNode` carries docs in the fixture.
        const wrapping = spec.nodes.find(n => n.kind === 'wrappingTypeNode')!;
        const result = renderNode(wrapping, { layout, currentLocation: 'wrappingTypeNode' });
        expect(result.content).toMatch(
            /\/\*\* A node referencing the union and the enumeration\. \*\/\nexport interface WrappingTypeNode/,
        );
    });

    it('emits a JSDoc above each attribute that has docs', () => {
        const spec = microSpec();
        const layout = buildLayout(spec);
        const wrapping = spec.nodes.find(n => n.kind === 'wrappingTypeNode')!;
        const result = renderNode(wrapping, { layout, currentLocation: 'wrappingTypeNode' });
        // Data attribute.
        expect(result.content).toContain('    /** A byte order. */\n    readonly endian: Endianness;');
        // Optional data attribute.
        expect(result.content).toContain('    /** Optional count. */\n    readonly count?: number;');
        // Child attribute (generic-lifted).
        expect(result.content).toContain('    /** A wrapped payload. */\n    readonly payload: TPayload;');
    });
});

describe('renderNode — generic param ordering', () => {
    // Build a small fixture spec with two lifted generics on a single
    // node so we can exercise the `genericParamOrder` override end-to-end
    // without running the full v1 spec.
    function buildArgumentSpec() {
        const inputUnion = defineUnion('InstructionInputValueNode', { members: ['valueNode'] });
        const valueNode = defineNode('valueNode', { attributes: [] });
        const typeNode = defineNode('typeNode', { attributes: [] });
        const typeUnion = defineUnion('TypeNode', { members: ['typeNode'] });
        const instructionArgumentNode = defineNode('instructionArgumentNode', {
            attributes: [
                attribute('type', union('TypeNode')),
                optionalAttribute('defaultValue', union('InstructionInputValueNode')),
            ],
        });
        return {
            enumerations: [],
            nestedTypeNodeWrappers: [],
            nodes: [valueNode, typeNode, instructionArgumentNode],
            unions: [inputUnion, typeUnion],
            version: '1.0.0',
        } as const;
    }

    it('emits lifted generics in declaration order when no override is supplied', () => {
        const spec = buildArgumentSpec();
        const layout = buildLayout(spec);
        const node = spec.nodes.find(n => n.kind === 'instructionArgumentNode')!;
        const result = renderNode(node, { layout, currentLocation: 'InstructionArgumentNode' });
        const tTypeIdx = result.content.indexOf('TType extends');
        const tDefaultIdx = result.content.indexOf('TDefaultValue extends');
        expect(tTypeIdx).toBeGreaterThan(-1);
        expect(tDefaultIdx).toBeGreaterThan(-1);
        // Declaration order on the node puts `type` first.
        expect(tTypeIdx).toBeLessThan(tDefaultIdx);
    });

    it('reorders lifted generics according to genericParamOrder', () => {
        const spec = buildArgumentSpec();
        const layout = buildLayout(spec);
        const node = spec.nodes.find(n => n.kind === 'instructionArgumentNode')!;
        const result = renderNode(node, {
            currentLocation: 'InstructionArgumentNode',
            genericParamOrder: new Map([['instructionArgumentNode', ['defaultValue', 'type']]]),
            layout,
        });
        // The override pins `defaultValue` first, even though `type`
        // appears first in the spec.
        const tDefaultIdx = result.content.indexOf('TDefaultValue extends');
        const tTypeIdx = result.content.indexOf('TType extends');
        expect(tDefaultIdx).toBeGreaterThan(-1);
        expect(tTypeIdx).toBeGreaterThan(-1);
        expect(tDefaultIdx).toBeLessThan(tTypeIdx);
    });

    it('throws when genericParamOrder lists an attribute the node does not lift', () => {
        // The override expects both `type` and `defaultValue` to be
        // lifted. We omit `type` from the spec entirely, so the
        // renderer's lifted set is `{ defaultValue }` while the override
        // expects `{ defaultValue, type }`.
        const valueNode = defineNode('valueNode', { attributes: [] });
        const inputUnion = defineUnion('InstructionInputValueNode', { members: ['valueNode'] });
        const incomplete = defineNode('instructionArgumentNode', {
            attributes: [optionalAttribute('defaultValue', union('InstructionInputValueNode'))],
        });
        const spec = {
            enumerations: [],
            nestedTypeNodeWrappers: [],
            nodes: [valueNode, incomplete],
            unions: [inputUnion],
            version: '1.0.0',
        } as const;
        const layout = buildLayout(spec);
        expect(() =>
            renderNode(incomplete, {
                currentLocation: 'InstructionArgumentNode',
                genericParamOrder: new Map([['instructionArgumentNode', ['defaultValue', 'type']]]),
                layout,
            }),
        ).toThrow(/genericParamOrder for "instructionArgumentNode" is out of sync/);
    });
});
