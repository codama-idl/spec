import { describe, expect, it } from 'vitest';

import { getEnumeration, getNode, getSpec, getUnion, isChildAttribute, SPEC_VERSION } from '../src/v1';

describe('v1 spec — composition', () => {
    it('exposes a SPEC_VERSION matching the assembled spec', () => {
        expect(SPEC_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
        expect(getSpec().version).toBe(SPEC_VERSION);
    });

    it('returns the same Spec instance on every call (memoised)', () => {
        expect(getSpec()).toBe(getSpec());
    });

    it('passes self-consistency validation', () => {
        // If the spec were invalid, getSpec() would throw on first call.
        expect(() => getSpec()).not.toThrow();
    });
});

describe('v1 spec — coverage smoke checks', () => {
    it('declares every node category', () => {
        for (const kind of [
            // type nodes
            'numberTypeNode',
            'structTypeNode',
            'enumTypeNode',
            'arrayTypeNode',
            'optionTypeNode',
            // value nodes
            'numberValueNode',
            'structValueNode',
            'someValueNode',
            'noneValueNode',
            // link nodes
            'pdaLinkNode',
            'programLinkNode',
            // pda seed nodes
            'constantPdaSeedNode',
            'variablePdaSeedNode',
            // count nodes
            'fixedCountNode',
            'prefixedCountNode',
            'remainderCountNode',
            // discriminator nodes
            'constantDiscriminatorNode',
            'fieldDiscriminatorNode',
            'sizeDiscriminatorNode',
            // contextual value nodes
            'accountValueNode',
            'argumentValueNode',
            'pdaValueNode',
            // top-level
            'accountNode',
            'instructionNode',
            'programNode',
            'rootNode',
        ]) {
            expect(getNode(kind), `expected node "${kind}" to be defined`).toBeDefined();
        }
    });

    it('declares the principal unions', () => {
        for (const name of [
            'TypeNode',
            'StandaloneTypeNode',
            'RegisteredTypeNode',
            'EnumVariantTypeNode',
            'ValueNode',
            'StandaloneValueNode',
            'RegisteredValueNode',
            'LinkNode',
            'RegisteredLinkNode',
            'PdaSeedNode',
            'CountNode',
            'DiscriminatorNode',
            'ContextualValueNode',
            'InstructionInputValueNode',
        ]) {
            expect(getUnion(name), `expected union "${name}" to be defined`).toBeDefined();
        }
    });

    it('declares the principal enumerations', () => {
        for (const name of ['Endianness', 'NumberFormat', 'BytesEncoding', 'InstructionLifecycle']) {
            expect(getEnumeration(name), `expected enumeration "${name}" to be defined`).toBeDefined();
        }
    });

    it('returns undefined for absent lookups', () => {
        expect(getNode('definitelyNotANode')).toBeUndefined();
        expect(getUnion('NotAUnion')).toBeUndefined();
        expect(getEnumeration('NotAnEnum')).toBeUndefined();
    });
});

describe('v1 spec — accountNode shape', () => {
    it('matches the encoded shape exactly', () => {
        const account = getNode('accountNode')!;
        const attrNames = account.attributes.map(a => a.name);
        expect(attrNames).toEqual(['name', 'size', 'docs', 'data', 'pda', 'discriminators']);

        const data = account.attributes.find(a => a.name === 'data')!;
        expect(data.type).toEqual({ kind: 'nestedTypeNode', name: 'structTypeNode' });
        expect(data.optional).toBeUndefined();
        expect(isChildAttribute(data.type)).toBe(true);

        const name = account.attributes.find(a => a.name === 'name')!;
        expect(name.type).toEqual({ kind: 'string', constraint: 'identifier' });
        expect(name.optional).toBeUndefined();
        expect(isChildAttribute(name.type)).toBe(false);

        const size = account.attributes.find(a => a.name === 'size')!;
        expect(size.optional).toBe(true);
        expect(size.type).toEqual({ kind: 'integer', width: 'u64' });
    });

    it('populates per-attribute docs', () => {
        const account = getNode('accountNode')!;
        for (const a of account.attributes) {
            expect(a.docs, `attribute "${a.name}" should have docs`).toBeTruthy();
        }
    });
});

describe('v1 spec — TypeNode union composition', () => {
    it('preserves the nested-union structure', () => {
        const typeNode = getUnion('TypeNode')!;
        expect(typeNode.members).toContainEqual({ kind: 'union', name: 'StandaloneTypeNode' });
        expect(typeNode.members).toContainEqual({ kind: 'node', name: 'definedTypeLinkNode' });
    });
});

describe('v1 spec — enumerations carry per-variant docs', () => {
    it('every variant of every enumeration has a docs string', () => {
        for (const e of getSpec().enumerations) {
            for (const v of e.variants) {
                expect(v.docs, `enumeration "${e.name}" variant "${v.name}" should have docs`).toBeTruthy();
            }
        }
    });
});

describe('v1 spec — JSON round-trip', () => {
    it('produces stable JSON', () => {
        const a = JSON.stringify(getSpec());
        const b = JSON.stringify(getSpec());
        expect(a).toBe(b);
    });

    it('parses back to a value with the same node kinds', () => {
        const json = JSON.stringify(getSpec());
        const parsed = JSON.parse(json) as ReturnType<typeof getSpec>;
        const parsedKinds = parsed.nodes.map(n => n.kind).sort();
        const originalKinds = getSpec()
            .nodes.map(n => n.kind)
            .sort();
        expect(parsedKinds).toEqual(originalKinds);
    });
});
