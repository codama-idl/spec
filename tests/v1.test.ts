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
            'typeNode',
            'standaloneTypeNode',
            'registeredTypeNode',
            'enumVariantTypeNode',
            'valueNode',
            'standaloneValueNode',
            'registeredValueNode',
            'linkNode',
            'registeredLinkNode',
            'pdaSeedNode',
            'countNode',
            'discriminatorNode',
            'contextualValueNode',
            'instructionInputValueNode',
        ]) {
            expect(getUnion(name), `expected union "${name}" to be defined`).toBeDefined();
        }
    });

    it('declares the principal enumerations', () => {
        for (const name of ['endianness', 'numberFormat', 'bytesEncoding', 'instructionLifecycle']) {
            expect(getEnumeration(name), `expected enumeration "${name}" to be defined`).toBeDefined();
        }
    });

    it('returns undefined for absent lookups', () => {
        expect(getNode('definitelyNotANode')).toBeUndefined();
        expect(getUnion('notAUnion')).toBeUndefined();
        expect(getEnumeration('notAnEnum')).toBeUndefined();
    });
});

describe('v1 spec — accountNode shape', () => {
    it('matches the encoded shape exactly', () => {
        const account = getNode('accountNode')!;
        const attrNames = account.attributes.map(a => a.name);
        expect(attrNames).toEqual(['name', 'size', 'docs', 'data', 'pda', 'discriminators']);

        const data = account.attributes.find(a => a.name === 'data')!;
        expect(data.type).toEqual({ alias: 'nestedTypeNode', kind: 'nestedUnion', name: 'structTypeNode' });
        expect(data.optional).toBeUndefined();
        expect(isChildAttribute(data.type)).toBe(true);

        const name = account.attributes.find(a => a.name === 'name')!;
        expect(name.type).toEqual({ constraint: 'identifier', kind: 'string' });
        expect(name.optional).toBeUndefined();
        expect(isChildAttribute(name.type)).toBe(false);

        const size = account.attributes.find(a => a.name === 'size')!;
        expect(size.optional).toBe(true);
        expect(size.type).toEqual({ kind: 'integer', width: 'u64' });
    });

    it('populates per-attribute docs as paragraph arrays', () => {
        const account = getNode('accountNode')!;
        for (const a of account.attributes) {
            expect(a.docs, `attribute "${a.name}" should have docs`).toBeTruthy();
            expect(Array.isArray(a.docs), `attribute "${a.name}" docs should be an array`).toBe(true);
            expect((a.docs ?? []).length, `attribute "${a.name}" docs should be non-empty`).toBeGreaterThan(0);
        }
    });
});

describe('v1 spec — typeNode union composition', () => {
    it('preserves the nested-union structure', () => {
        const typeNode = getUnion('typeNode')!;
        expect(typeNode.members).toContainEqual({ kind: 'union', name: 'standaloneTypeNode' });
        expect(typeNode.members).toContainEqual({ kind: 'node', name: 'definedTypeLinkNode' });
    });
});

describe('v1 spec — programNode shape', () => {
    it('exposes publicKey as an address type', () => {
        const program = getNode('programNode')!;
        const publicKey = program.attributes.find(a => a.name === 'publicKey')!;
        expect(publicKey.type).toEqual({ kind: 'address' });
    });

    it('keeps every vec-of-children attribute required in v1', () => {
        // v1 keeps these arrays required so existing codegen targets (JS,
        // Rust) don't have to special-case the "empty array vs. absent"
        // distinction. The optional encoding may return in a future spec
        // major.
        const program = getNode('programNode')!;
        for (const name of ['accounts', 'instructions', 'definedTypes', 'pdas', 'events', 'errors', 'constants']) {
            const a = program.attributes.find(attr => attr.name === name);
            expect(a, `attribute "${name}" should be defined`).toBeDefined();
            expect(a!.optional, `attribute "${name}" should not be optional`).toBeUndefined();
        }
    });
});

describe('v1 spec — publicKeyValueNode shape', () => {
    it('exposes publicKey as an address type', () => {
        const node = getNode('publicKeyValueNode')!;
        const publicKey = node.attributes.find(a => a.name === 'publicKey')!;
        expect(publicKey.type).toEqual({ kind: 'address' });
    });
});

describe('v1 spec — pdaNode shape', () => {
    it('exposes programId as an address type', () => {
        const node = getNode('pdaNode')!;
        const programId = node.attributes.find(a => a.name === 'programId')!;
        expect(programId.type).toEqual({ kind: 'address' });
    });
});

describe('v1 spec — enumerations carry per-variant docs', () => {
    it('every variant of every enumeration has docs', () => {
        for (const c of getSpec().categories) {
            for (const e of c.enumerations) {
                for (const v of e.variants) {
                    expect(v.docs, `enumeration "${e.name}" variant "${v.name}" should have docs`).toBeTruthy();
                }
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
        const parsedKinds = parsed.categories
            .flatMap(c => c.nodes)
            .map(n => n.kind)
            .sort();
        const originalKinds = getSpec()
            .categories.flatMap(c => c.nodes)
            .map(n => n.kind)
            .sort();
        expect(parsedKinds).toEqual(originalKinds);
    });
});
