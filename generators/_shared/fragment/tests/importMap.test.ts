import { describe, expect, it } from 'vitest';

import {
    addToImportMap,
    createImportMap,
    importMapToString,
    mergeImportMaps,
    parseImportInput,
    removeFromImportMap,
} from '../src/importMap';

describe('parseImportInput', () => {
    it('parses a plain identifier', () => {
        expect(parseImportInput('Foo')).toEqual({
            importedIdentifier: 'Foo',
            usedIdentifier: 'Foo',
            isType: false,
        });
    });
    it('parses a type-only import', () => {
        expect(parseImportInput('type Foo')).toEqual({
            importedIdentifier: 'Foo',
            usedIdentifier: 'Foo',
            isType: true,
        });
    });
    it('parses an aliased import', () => {
        expect(parseImportInput('Foo as Bar')).toEqual({
            importedIdentifier: 'Foo',
            usedIdentifier: 'Bar',
            isType: false,
        });
    });
    it('parses a type-only aliased import', () => {
        expect(parseImportInput('type Foo as Bar')).toEqual({
            importedIdentifier: 'Foo',
            usedIdentifier: 'Bar',
            isType: true,
        });
    });
});

describe('addToImportMap', () => {
    it('adds imports to an empty map', () => {
        const map = addToImportMap(createImportMap(), './foo', ['Foo', 'Bar']);
        expect(map.size).toBe(1);
        expect(map.get('./foo')?.size).toBe(2);
    });
    it('returns the same map when called with no imports', () => {
        const empty = createImportMap();
        expect(addToImportMap(empty, './foo', [])).toBe(empty);
    });
    it('merges into an existing module', () => {
        let map = addToImportMap(createImportMap(), './foo', ['A']);
        map = addToImportMap(map, './foo', ['B']);
        expect(map.get('./foo')?.size).toBe(2);
    });
    it('promotes a value import over a type-only import within the same batch', () => {
        // Type-only first, value second.
        const a = addToImportMap(createImportMap(), './foo', ['type Foo', 'Foo']);
        expect(a.get('./foo')?.get('Foo')?.isType).toBe(false);
        // Value first, type-only second — should not be downgraded.
        const b = addToImportMap(createImportMap(), './foo', ['Foo', 'type Foo']);
        expect(b.get('./foo')?.get('Foo')?.isType).toBe(false);
    });
});

describe('removeFromImportMap', () => {
    it('removes named identifiers', () => {
        const map = addToImportMap(createImportMap(), './foo', ['A', 'B']);
        const after = removeFromImportMap(map, './foo', ['A']);
        expect(after.get('./foo')?.size).toBe(1);
        expect(after.get('./foo')?.has('A')).toBe(false);
    });
    it('drops the module entirely when no identifiers remain', () => {
        const map = addToImportMap(createImportMap(), './foo', ['A']);
        const after = removeFromImportMap(map, './foo', ['A']);
        expect(after.has('./foo')).toBe(false);
    });
});

describe('mergeImportMaps', () => {
    it('returns the empty map for an empty input', () => {
        expect(mergeImportMaps([]).size).toBe(0);
    });
    it('returns the single map when given one input', () => {
        const map = addToImportMap(createImportMap(), './foo', ['A']);
        expect(mergeImportMaps([map])).toBe(map);
    });
    it('merges across modules', () => {
        const a = addToImportMap(createImportMap(), './foo', ['A']);
        const b = addToImportMap(createImportMap(), './bar', ['B']);
        const merged = mergeImportMaps([a, b]);
        expect(merged.size).toBe(2);
    });
    it('promotes a value import over a type-only import of the same name', () => {
        const a = addToImportMap(createImportMap(), './foo', ['type Foo']);
        const b = addToImportMap(createImportMap(), './foo', ['Foo']);
        const merged = mergeImportMaps([a, b]);
        expect(merged.get('./foo')?.get('Foo')?.isType).toBe(false);
    });
});

describe('importMapToString', () => {
    it('emits empty string for an empty map', () => {
        expect(importMapToString(createImportMap())).toBe('');
    });
    it('sorts non-relative paths first, then relative; alphabetical within each group', () => {
        let map = createImportMap();
        map = addToImportMap(map, './local', ['Local']);
        map = addToImportMap(map, '@codama/spec', ['Spec']);
        map = addToImportMap(map, '../shared', ['Shared']);
        const out = importMapToString(map);
        // Within the relative group, alphabetical: '../shared' < './local'
        // because '.' (46) < '/' (47) at position 1.
        expect(out).toBe(
            "import { Spec } from '@codama/spec';\n" +
                "import { Shared } from '../shared';\n" +
                "import { Local } from './local';",
        );
    });
    it('renders mixed-form imports with per-identifier type prefix', () => {
        const map = addToImportMap(createImportMap(), './foo', ['type Foo as Bar', 'Baz']);
        expect(importMapToString(map)).toBe("import { Baz, type Foo as Bar } from './foo';");
    });

    it('promotes to block-level `import type` when all imports are type-only', () => {
        const map = addToImportMap(createImportMap(), './foo', ['type Foo', 'type Bar']);
        expect(importMapToString(map)).toBe("import type { Bar, Foo } from './foo';");
    });

    it('preserves aliasing under a block-level `import type`', () => {
        const map = addToImportMap(createImportMap(), './foo', ['type Foo as Bar']);
        expect(importMapToString(map)).toBe("import type { Foo as Bar } from './foo';");
    });
});
