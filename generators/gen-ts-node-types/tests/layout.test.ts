import { getSpec } from '@codama/spec';
import { describe, expect, it } from 'vitest';

import { buildLayout, relativeImportPath } from '../src/layout';

describe('buildLayout', () => {
    const layout = buildLayout(getSpec());

    it('places type nodes under typeNodes/', () => {
        expect(layout.nodeKindToLocation.get('arrayTypeNode')).toBe('typeNodes/ArrayTypeNode');
    });

    it('places value nodes under valueNodes/', () => {
        expect(layout.nodeKindToLocation.get('stringValueNode')).toBe('valueNodes/StringValueNode');
    });

    it('places contextual value nodes under contextualValueNodes/', () => {
        expect(layout.nodeKindToLocation.get('argumentValueNode')).toBe('contextualValueNodes/ArgumentValueNode');
    });

    it('places top-level uncategorised nodes at the root', () => {
        expect(layout.nodeKindToLocation.get('accountNode')).toBe('AccountNode');
        expect(layout.nodeKindToLocation.get('rootNode')).toBe('RootNode');
    });

    it('places enumerations under shared/<camelCaseName>', () => {
        expect(layout.enumerationNameToLocation.get('Endianness')).toBe('shared/endianness');
        expect(layout.enumerationNameToLocation.get('NumberFormat')).toBe('shared/numberFormat');
    });

    it('places category unions under their category subdirectory', () => {
        expect(layout.unionNameToLocation.get('TypeNode')).toBe('typeNodes/TypeNode');
        expect(layout.unionNameToLocation.get('ConstantPdaSeedValue')).toBe('pdaSeedNodes/ConstantPdaSeedValue');
    });

    it('places top-level helper unions at the root', () => {
        expect(layout.unionNameToLocation.get('InstructionByteDeltaValue')).toBe('InstructionByteDeltaValue');
    });
});

describe('relativeImportPath', () => {
    it('returns ./Sibling for files in the same directory', () => {
        expect(relativeImportPath('typeNodes/AmountTypeNode', 'typeNodes/NumberTypeNode')).toBe('./NumberTypeNode');
    });
    it('returns ./Sibling for top-level files', () => {
        expect(relativeImportPath('AccountNode', 'RootNode')).toBe('./RootNode');
    });
    it('returns ../sub/X when stepping out one level', () => {
        expect(relativeImportPath('typeNodes/AmountTypeNode', 'shared/numberFormat')).toBe('../shared/numberFormat');
    });
    it('returns ./sub/X when stepping into a sibling subdirectory', () => {
        expect(relativeImportPath('AccountNode', 'typeNodes/StructTypeNode')).toBe('./typeNodes/StructTypeNode');
    });
    it('refuses to produce a self-import', () => {
        expect(() => relativeImportPath('foo', 'foo')).toThrow(/self-import/);
    });
});
