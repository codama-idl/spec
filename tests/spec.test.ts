import { describe, expect, it } from 'vitest';

import pkg from '../package.json';
import { getEnumeration, getNode, getSpec, getUnion, isChildAttribute, SPEC_VERSION } from '../src/spec';

describe('spec — composition', () => {
    it('exposes a SPEC_VERSION matching the assembled spec', () => {
        // semver with an optional prerelease tag (e.g. 1.9.0-rc.0 while in changesets pre mode)
        expect(SPEC_VERSION).toMatch(/^\d+\.\d+\.\d+(-[\w.]+)?$/);
        expect(getSpec().version).toBe(SPEC_VERSION);
    });

    it('keeps SPEC_VERSION in lockstep with the package version', () => {
        // `pnpm release:version` syncs the two in the release commit; they must never drift elsewhere.
        expect(SPEC_VERSION).toBe(pkg.version);
    });

    it('returns the same Spec instance on every call (memoised)', () => {
        expect(getSpec()).toBe(getSpec());
    });

    it('passes self-consistency validation', () => {
        // If the spec were invalid, getSpec() would throw on first call.
        expect(() => getSpec()).not.toThrow();
    });
});

describe('spec — coverage smoke checks', () => {
    it('declares every node category', () => {
        for (const kind of [
            // type nodes
            'numberTypeNode',
            'structTypeNode',
            'enumTypeNode',
            'arrayTypeNode',
            'optionTypeNode',
            // value nodes
            'injectedValueNode',
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
            // display nodes
            'amountNumberDisplayNode',
            'dateTimeNumberDisplayNode',
            'durationNumberDisplayNode',
            'enumVariantDisplayNode',
            'instructionAccountDisplayNode',
            'instructionDisplayNode',
            'stringDisplayNode',
            'structFieldDisplayNode',
            // contextual value nodes
            'accountDataValueNode',
            'accountValueNode',
            'dataValueNode',
            'pdaValueNode',
            // top-level
            'accountNode',
            'instructionNode',
            'pluginNode',
            'programNode',
            'providedNode',
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
            'valueNode',
            'standaloneValueNode',
            'registeredValueNode',
            'linkNode',
            'registeredLinkNode',
            'pdaSeedNode',
            'countNode',
            'discriminatorNode',
            'displayNode',
            'numberDisplayNode',
            'registeredDisplayNode',
            'injectableNumberValueNode',
            'injectableStringValueNode',
            'contextualValueNode',
            'instructionInputValueNode',
        ]) {
            expect(getUnion(name), `expected union "${name}" to be defined`).toBeDefined();
        }
    });

    it('declares the principal enumerations', () => {
        for (const name of ['endianness', 'numberFormat', 'bytesEncoding', 'instructionLifecycle', 'displaySkip']) {
            expect(getEnumeration(name), `expected enumeration "${name}" to be defined`).toBeDefined();
        }
    });

    it('returns undefined for absent lookups', () => {
        expect(getNode('definitelyNotANode')).toBeUndefined();
        expect(getUnion('notAUnion')).toBeUndefined();
        expect(getEnumeration('notAnEnum')).toBeUndefined();
    });
});

describe('spec — accountNode shape', () => {
    it('matches the encoded shape exactly', () => {
        const account = getNode('accountNode')!;
        const attrNames = account.attributes.map(a => a.name);
        expect(attrNames).toEqual(['identifier', 'size', 'docs', 'data', 'pda', 'discriminators']);

        const data = account.attributes.find(a => a.name === 'data')!;
        // any type node — matching eventNode.data; links included, so account data can be shared and reused
        expect(data.type).toEqual({ kind: 'union', name: 'typeNode' });
        expect(data.optional).toBeUndefined();
        expect(isChildAttribute(data.type)).toBe(true);

        const name = account.attributes.find(a => a.name === 'identifier')!;
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

describe('spec — typeNode union composition', () => {
    it('preserves the union-of-union structure', () => {
        const typeNode = getUnion('typeNode')!;
        expect(typeNode.members).toContainEqual({ kind: 'union', name: 'standaloneTypeNode' });
        expect(typeNode.members).toContainEqual({ kind: 'node', name: 'definedTypeLinkNode' });
    });

    it('gives every typeNode union member a trailing transforms attribute, and no other node', () => {
        const spec = getSpec();
        const standalone = getUnion('standaloneTypeNode')!;
        const typeNodeKinds = new Set([
            ...standalone.members.flatMap(m => (m.kind === 'node' ? [m.name] : [])),
            'definedTypeLinkNode',
        ]);
        expect(typeNodeKinds.size).toBeGreaterThan(0);
        for (const category of spec.categories) {
            for (const n of category.nodes) {
                const transforms = n.attributes.find(a => a.name === 'transforms');
                if (typeNodeKinds.has(n.kind)) {
                    expect(transforms, `node "${n.kind}" should declare transforms`).toBeDefined();
                    expect(transforms!.optional).toBe(true);
                    expect(transforms!.type).toEqual({ kind: 'array', of: { kind: 'union', name: 'transformNode' } });
                    expect(
                        n.attributes.at(-1)!.name,
                        `transforms should be the last declared attribute of "${n.kind}"`,
                    ).toBe('transforms');
                } else {
                    expect(transforms, `node "${n.kind}" should not declare transforms`).toBeUndefined();
                }
            }
        }
    });

    it('declares the seven transform nodes and no wrapper type nodes', () => {
        const transformNode = getUnion('transformNode')!;
        expect(transformNode.members.map(m => m.name).sort()).toEqual([
            'fixedSizeTransformNode',
            'hiddenPrefixTransformNode',
            'hiddenSuffixTransformNode',
            'postOffsetTransformNode',
            'preOffsetTransformNode',
            'sentinelTransformNode',
            'sizePrefixTransformNode',
        ]);
        for (const wrapper of [
            'fixedSizeTypeNode',
            'hiddenPrefixTypeNode',
            'hiddenSuffixTypeNode',
            'postOffsetTypeNode',
            'preOffsetTypeNode',
            'sentinelTypeNode',
            'sizePrefixTypeNode',
        ]) {
            expect(getNode(wrapper), `wrapper "${wrapper}" should no longer exist`).toBeUndefined();
        }
        expect(getSpec().categories.every(c => c.nestedUnions.length === 0)).toBe(true);
    });
});

describe('spec — programNode shape', () => {
    it('exposes publicKey as an address type', () => {
        const program = getNode('programNode')!;
        const publicKey = program.attributes.find(a => a.name === 'publicKey')!;
        expect(publicKey.type).toEqual({ kind: 'address' });
    });

    it('keeps every vec-of-children attribute required', () => {
        // These arrays stay required so existing codegen targets (JS,
        // Rust) don't have to special-case the "empty array vs. absent"
        // distinction. The optional encoding may return in a future spec
        // change.
        const program = getNode('programNode')!;
        for (const name of ['accounts', 'instructions', 'definedTypes', 'pdas', 'events', 'errors', 'constants']) {
            const a = program.attributes.find(attr => attr.name === name);
            expect(a, `attribute "${name}" should be defined`).toBeDefined();
            expect(a!.optional, `attribute "${name}" should not be optional`).toBeUndefined();
        }
    });
});

describe('spec — publicKeyValueNode shape', () => {
    it('exposes publicKey as an address type', () => {
        const node = getNode('publicKeyValueNode')!;
        const publicKey = node.attributes.find(a => a.name === 'publicKey')!;
        expect(publicKey.type).toEqual({ kind: 'address' });
    });
});

describe('spec — pdaNode shape', () => {
    it('exposes programId as an address type', () => {
        const node = getNode('pdaNode')!;
        const programId = node.attributes.find(a => a.name === 'programId')!;
        expect(programId.type).toEqual({ kind: 'address' });
    });
});

describe('spec — enumerations carry per-variant docs', () => {
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

describe('spec — displaySkip enumeration', () => {
    it('declares the three variants the display layer documents', () => {
        const e = getEnumeration('displaySkip')!;
        expect(e.variants.map(v => v.name)).toEqual(['always', 'never', 'whenInjected']);
        for (const v of e.variants) {
            expect(v.docs, `variant "${v.name}" should have docs`).toBeTruthy();
            expect((v.docs ?? []).length, `variant "${v.name}" docs should be non-empty`).toBeGreaterThan(0);
        }
    });
});

describe('spec — display node shapes', () => {
    it('instructionDisplayNode shape', () => {
        const n = getNode('instructionDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['intent', 'interpolatedIntent']);
        for (const a of n.attributes) {
            expect(a.optional).toBe(true);
            expect(a.type).toEqual({ kind: 'string' });
        }
    });

    it('instructionAccountDisplayNode shape', () => {
        const n = getNode('instructionAccountDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['label', 'skip']);
        const label = n.attributes.find(a => a.name === 'label')!;
        expect(label.optional).toBe(true);
        expect(label.type).toEqual({ kind: 'string' });
        const skip = n.attributes.find(a => a.name === 'skip')!;
        expect(skip.optional).toBe(true);
        expect(skip.type).toEqual({ kind: 'enumeration', name: 'displaySkip' });
    });

    it('structFieldDisplayNode shape', () => {
        const n = getNode('structFieldDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['label', 'skip', 'flatten', 'flattenPrefix']);
        const label = n.attributes.find(a => a.name === 'label')!;
        expect(label.optional).toBe(true);
        expect(label.type).toEqual({ kind: 'string' });
        const skip = n.attributes.find(a => a.name === 'skip')!;
        expect(skip.optional).toBe(true);
        expect(skip.type).toEqual({ kind: 'enumeration', name: 'displaySkip' });
        const flatten = n.attributes.find(a => a.name === 'flatten')!;
        expect(flatten.optional).toBe(true);
        expect(flatten.type).toEqual({ kind: 'boolean' });
        const flattenPrefix = n.attributes.find(a => a.name === 'flattenPrefix')!;
        expect(flattenPrefix.optional).toBe(true);
        expect(flattenPrefix.type).toEqual({ kind: 'string' });
    });

    it('enumVariantDisplayNode shape', () => {
        const n = getNode('enumVariantDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['label', 'skipInnerData']);
        const inner = n.attributes.find(a => a.name === 'skipInnerData')!;
        expect(inner.optional).toBe(true);
        expect(inner.type).toEqual({ kind: 'boolean' });
    });

    it('amountNumberDisplayNode shape', () => {
        const n = getNode('amountNumberDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['decimals', 'unit']);
        const decimals = n.attributes.find(a => a.name === 'decimals')!;
        expect(decimals.optional).toBe(true);
        expect(decimals.type).toEqual({ kind: 'union', name: 'injectableNumberValueNode' });
        expect(isChildAttribute(decimals.type)).toBe(true);
        const unit = n.attributes.find(a => a.name === 'unit')!;
        expect(unit.optional).toBe(true);
        expect(unit.type).toEqual({ kind: 'union', name: 'injectableStringValueNode' });
        expect(isChildAttribute(unit.type)).toBe(true);
    });

    it('dateTimeNumberDisplayNode shape', () => {
        const n = getNode('dateTimeNumberDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['ticksPerSecond']);
        const ticks = n.attributes.find(a => a.name === 'ticksPerSecond')!;
        expect(ticks.optional).toBe(true);
        expect(ticks.type).toEqual({ kind: 'integer', width: 'u64' });
    });

    it('durationNumberDisplayNode shape', () => {
        const n = getNode('durationNumberDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['ticksPerSecond']);
        const ticks = n.attributes.find(a => a.name === 'ticksPerSecond')!;
        expect(ticks.optional).toBe(true);
        expect(ticks.type).toEqual({ kind: 'integer', width: 'u64' });
    });

    it('stringDisplayNode shape', () => {
        const n = getNode('stringDisplayNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['sliceStart', 'sliceEnd']);
        for (const a of n.attributes) {
            expect(a.optional).toBe(true);
            expect(a.type).toEqual({ kind: 'integer', width: 'u64' });
        }
    });
});

describe('spec — enumVariantTypeNode shape', () => {
    it('unifies the three v1 variant flavours into one node with an optional data payload', () => {
        const variant = getNode('enumVariantTypeNode')!;
        expect(variant.attributes.map(a => a.name)).toEqual(['identifier', 'discriminator', 'docs', 'data', 'display']);

        const data = variant.attributes.find(a => a.name === 'data')!;
        expect(data.optional).toBe(true);
        expect(data.type).toEqual({ kind: 'union', name: 'typeNode' });
        expect(isChildAttribute(data.type)).toBe(true);

        const variantDocs = variant.attributes.find(a => a.name === 'docs')!;
        expect(variantDocs.optional).toBe(true);
        expect(variantDocs.type).toEqual({ kind: 'docs' });

        for (const gone of ['enumEmptyVariantTypeNode', 'enumStructVariantTypeNode', 'enumTupleVariantTypeNode']) {
            expect(getNode(gone), `${gone} should no longer exist`).toBeUndefined();
        }
        expect(getUnion('enumVariantTypeNode'), 'the v1 variant union should no longer exist').toBeUndefined();
    });
});

describe('spec — identifier convention', () => {
    it('no node declares a name attribute — the machine key is identifier, the plugin key is namespace', () => {
        for (const category of getSpec().categories) {
            for (const n of category.nodes) {
                const name = n.attributes.find(a => a.name === 'name');
                expect(name, `node "${n.kind}" should not declare a name attribute`).toBeUndefined();
            }
        }
    });

    it('every identifier attribute carries the identifier string constraint', () => {
        for (const category of getSpec().categories) {
            for (const n of category.nodes) {
                const identifier = n.attributes.find(a => a.name === 'identifier');
                if (!identifier) continue;
                expect(identifier.type, `node "${n.kind}"`).toEqual({ constraint: 'identifier', kind: 'string' });
            }
        }
    });
});

describe('spec — instructionNode data', () => {
    it('carries optional data as any type node', () => {
        const n = getNode('instructionNode')!;
        const data = n.attributes.find(a => a.name === 'data')!;
        expect(data).toBeDefined();
        expect(data.optional).toBe(true);
        expect(data.type).toEqual({ kind: 'union', name: 'typeNode' });
        expect(isChildAttribute(data.type)).toBe(true);
        for (const gone of ['arguments', 'extraArguments']) {
            expect(
                n.attributes.find(a => a.name === gone),
                `${gone} should be removed`,
            ).toBeUndefined();
        }
    });

    it('removes the argument and resolver machinery', () => {
        for (const gone of ['instructionArgumentNode', 'resolverValueNode', 'instructionArgumentLinkNode']) {
            expect(getNode(gone), `${gone} should no longer exist`).toBeUndefined();
        }
        expect(getUnion('instructionRemainingAccountsValue')).toBeUndefined();
        expect(getUnion('resolverDependency')).toBeUndefined();
        expect(getUnion('instructionByteDeltaValue')!.members.map(m => m.name)).toEqual([
            'accountLinkNode',
            'dataValueNode',
            'numberValueNode',
        ]);
        expect(getUnion('conditionalValueCondition')!.members.map(m => m.name)).toEqual([
            'accountValueNode',
            'dataValueNode',
        ]);
    });

    it('remaining accounts declare a named client input', () => {
        const n = getNode('instructionRemainingAccountsNode')!;
        const identifier = n.attributes.find(a => a.name === 'identifier');
        expect(identifier, 'remaining accounts should declare an identifier').toBeDefined();
        expect(n.attributes[0].name).toBe('identifier');
        expect(identifier!.type).toEqual({ constraint: 'identifier', kind: 'string' });
        expect(n.attributes.find(a => a.name === 'value')).toBeUndefined();
    });
});

describe('spec — path expressions', () => {
    it('dataValueNode and fieldDiscriminatorNode reference nested data via path attributes', () => {
        for (const kind of ['dataValueNode', 'fieldDiscriminatorNode']) {
            const n = getNode(kind)!;
            const path = n.attributes.find(a => a.name === 'path');
            expect(path, `node "${kind}" should declare a path attribute`).toBeDefined();
            expect(path!.type, `node "${kind}"`).toEqual({ constraint: 'path', kind: 'string' });
            expect(
                n.attributes.find(a => a.name === 'identifier'),
                `node "${kind}" should not also declare an identifier`,
            ).toBeUndefined();
        }
    });

    it('every path attribute carries the path string constraint', () => {
        for (const category of getSpec().categories) {
            for (const n of category.nodes) {
                const path = n.attributes.find(a => a.name === 'path');
                if (!path) continue;
                expect(path.type, `node "${n.kind}"`).toEqual({ constraint: 'path', kind: 'string' });
            }
        }
    });
});

describe('spec — display attribute on host nodes', () => {
    const nodeHosts: ReadonlyArray<readonly [string, string]> = [
        ['instructionNode', 'instructionDisplayNode'],
        ['instructionAccountNode', 'instructionAccountDisplayNode'],
        ['instructionRemainingAccountsNode', 'instructionAccountDisplayNode'],
        ['structFieldTypeNode', 'structFieldDisplayNode'],
        ['stringTypeNode', 'stringDisplayNode'],
        ['enumVariantTypeNode', 'enumVariantDisplayNode'],
    ];

    for (const [host, expected] of nodeHosts) {
        it(`${host} carries an optional display attribute referencing ${expected}`, () => {
            const n = getNode(host)!;
            const display = n.attributes.find(a => a.name === 'display');
            expect(display, `${host} should declare a display attribute`).toBeDefined();
            expect(display!.optional).toBe(true);
            expect(display!.type).toEqual({ kind: 'node', name: expected });
            expect(isChildAttribute(display!.type)).toBe(true);
        });
    }

    const unionHosts: ReadonlyArray<readonly [string, string]> = [['numberTypeNode', 'numberDisplayNode']];

    for (const [host, expected] of unionHosts) {
        it(`${host} carries an optional display attribute referencing the ${expected} union`, () => {
            const n = getNode(host)!;
            const display = n.attributes.find(a => a.name === 'display');
            expect(display, `${host} should declare a display attribute`).toBeDefined();
            expect(display!.optional).toBe(true);
            expect(display!.type).toEqual({ kind: 'union', name: expected });
            expect(isChildAttribute(display!.type)).toBe(true);
        });
    }
});

describe('spec — registeredDisplayNode union', () => {
    it('includes every display node', () => {
        const u = getUnion('registeredDisplayNode')!;
        for (const kind of [
            'amountNumberDisplayNode',
            'dateTimeNumberDisplayNode',
            'durationNumberDisplayNode',
            'enumVariantDisplayNode',
            'instructionAccountDisplayNode',
            'instructionDisplayNode',
            'stringDisplayNode',
            'structFieldDisplayNode',
        ]) {
            expect(u.members).toContainEqual({ kind: 'node', name: kind });
        }
    });

    it('composes displayNode as a union over registeredDisplayNode', () => {
        const u = getUnion('displayNode')!;
        expect(u.members).toContainEqual({ kind: 'union', name: 'registeredDisplayNode' });
    });
});

describe('spec — numberDisplayNode union', () => {
    it('lists the three number presentation forms', () => {
        const u = getUnion('numberDisplayNode')!;
        expect(u.members).toEqual([
            { kind: 'node', name: 'amountNumberDisplayNode' },
            { kind: 'node', name: 'dateTimeNumberDisplayNode' },
            { kind: 'node', name: 'durationNumberDisplayNode' },
        ]);
    });
});

describe('spec — injectedValueNode shape', () => {
    it('matches the encoded shape exactly', () => {
        const n = getNode('injectedValueNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['key', 'fallback']);
        const key = n.attributes.find(a => a.name === 'key')!;
        expect(key.type).toEqual({ constraint: 'identifier', kind: 'string' });
        expect(key.optional).toBeUndefined();
        const fallback = n.attributes.find(a => a.name === 'fallback')!;
        expect(fallback.optional).toBe(true);
        expect(fallback.type).toEqual({ kind: 'union', name: 'valueNode' });
        expect(isChildAttribute(fallback.type)).toBe(true);
    });
});

describe('spec — injectable value unions', () => {
    it('injectableNumberValueNode pairs numberValueNode with injectedValueNode', () => {
        const u = getUnion('injectableNumberValueNode')!;
        expect(u.members).toEqual([
            { kind: 'node', name: 'numberValueNode' },
            { kind: 'node', name: 'injectedValueNode' },
        ]);
    });

    it('injectableStringValueNode pairs stringValueNode with injectedValueNode', () => {
        const u = getUnion('injectableStringValueNode')!;
        expect(u.members).toEqual([
            { kind: 'node', name: 'stringValueNode' },
            { kind: 'node', name: 'injectedValueNode' },
        ]);
    });

    it('injectedValueNode is a standalone value (valid in every valueNode slot)', () => {
        expect(getUnion('standaloneValueNode')!.members).toContainEqual({ kind: 'node', name: 'injectedValueNode' });
    });

    it('registeredValueNode reaches injectedValueNode transitively via standaloneValueNode', () => {
        // The bare entry was removed once `injectedValueNode` joined `standaloneValueNode` so the
        // node is no longer listed twice in the value-category registry.
        const registered = getUnion('registeredValueNode')!;
        expect(registered.members).toContainEqual({ kind: 'union', name: 'standaloneValueNode' });
        expect(registered.members).not.toContainEqual({ kind: 'node', name: 'injectedValueNode' });
    });
});

describe('spec — accountDataValueNode shape', () => {
    it('matches the encoded shape exactly', () => {
        const n = getNode('accountDataValueNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['account', 'path']);
        const account = n.attributes.find(a => a.name === 'account')!;
        expect(account.type).toEqual({ constraint: 'identifier', kind: 'string' });
        expect(account.optional).toBeUndefined();
        const path = n.attributes.find(a => a.name === 'path')!;
        expect(path.optional).toBe(true);
        expect(path.type).toEqual({ constraint: 'path', kind: 'string' });
    });

    it('is a member of standaloneContextualValueNode', () => {
        const u = getUnion('standaloneContextualValueNode')!;
        expect(u.members).toContainEqual({ kind: 'node', name: 'accountDataValueNode' });
    });
});

describe('spec — providedNode shape', () => {
    it('matches the encoded shape exactly', () => {
        const n = getNode('providedNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['identifier', 'node']);
        const identifier = n.attributes.find(a => a.name === 'identifier')!;
        expect(identifier.type).toEqual({ constraint: 'identifier', kind: 'string' });
        expect(identifier.optional).toBeUndefined();
        const nodeAttr = n.attributes.find(a => a.name === 'node')!;
        expect(nodeAttr.type).toEqual({ kind: 'anyNode' });
        expect(nodeAttr.optional).toBeUndefined();
        expect(isChildAttribute(nodeAttr.type)).toBe(true);
    });
});

describe('spec — instructionNode.provides', () => {
    it('declares an optional array of providedNode', () => {
        const n = getNode('instructionNode')!;
        const provides = n.attributes.find(a => a.name === 'provides')!;
        expect(provides).toBeDefined();
        expect(provides.optional).toBe(true);
        expect(provides.type).toEqual({ kind: 'array', of: { kind: 'node', name: 'providedNode' } });
        expect(isChildAttribute(provides.type)).toBe(true);
    });
});

describe('spec — pluginNode shape', () => {
    it('matches the encoded shape exactly', () => {
        const n = getNode('pluginNode')!;
        expect(n.attributes.map(a => a.name)).toEqual(['namespace', 'payload']);

        // plugin namespaces are dot-separated chains of identifiers (e.g. `i18n.es`), not identifiers
        const namespace = n.attributes.find(a => a.name === 'namespace')!;
        expect(namespace.type).toEqual({ constraint: 'namespace', kind: 'string' });
        expect(namespace.optional).toBeUndefined();

        const payload = n.attributes.find(a => a.name === 'payload')!;
        expect(payload.optional).toBe(true);
        expect(payload.type).toEqual({ kind: 'json' });
        // A json payload carries no nodes, so it is data — never a child.
        expect(isChildAttribute(payload.type)).toBe(false);
    });
});

describe('spec — base attributes', () => {
    it('declares plugins as the only base attribute, an optional array of pluginNode', () => {
        const base = getSpec().base!;
        expect(base).toBeDefined();
        expect(base.attributes.map(a => a.name)).toEqual(['plugins']);

        const plugins = base.attributes[0];
        expect(plugins.optional).toBe(true);
        expect(plugins.type).toEqual({ kind: 'array', of: { kind: 'node', name: 'pluginNode' } });
        expect(isChildAttribute(plugins.type)).toBe(true);
    });

    it('no node declares a plugins attribute locally — the base attribute is universal', () => {
        for (const category of getSpec().categories) {
            for (const n of category.nodes) {
                expect(
                    n.attributes.some(a => a.name === 'plugins'),
                    `node "${n.kind}" should not declare plugins locally`,
                ).toBe(false);
            }
        }
    });
});

describe('spec — instructionAccountNode.accountLink', () => {
    it('declares an optional accountLinkNode reference', () => {
        const n = getNode('instructionAccountNode')!;
        const link = n.attributes.find(a => a.name === 'accountLink')!;
        expect(link).toBeDefined();
        expect(link.optional).toBe(true);
        expect(link.type).toEqual({ kind: 'node', name: 'accountLinkNode' });
        expect(isChildAttribute(link.type)).toBe(true);
    });
});

describe('spec — JSON round-trip', () => {
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
