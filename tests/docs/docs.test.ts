import { describe, expect, it } from 'vitest';

import { generateDocs } from '../../generators/docs/generateDocs';
import type { DocModel, DocPage, DocRef } from '../../generators/docs/types';
import { getSpec } from '../../src/spec';

const MODEL = generateDocs(getSpec());

function pageOf(model: DocModel, kind: DocRef['kind'], name: string): DocPage {
    const page = model.pages.find(candidate => {
        if (candidate.ref.kind !== kind) {
            return false;
        }
        if (candidate.ref.kind === 'categoryIndex') {
            return candidate.ref.category === name;
        }
        return 'name' in candidate.ref && candidate.ref.name === name;
    });
    if (!page) {
        throw new Error(`docs test: no ${kind} page for "${name}"`);
    }
    return page;
}

function rootContent(model: DocModel): string {
    const page = model.pages.find(candidate => candidate.ref.kind === 'rootIndex');
    if (!page) {
        throw new Error('docs test: no root index page');
    }
    return page.content;
}

function flattenPages(model: DocModel): string[] {
    return model.pages.map(page => `${page.pathSegments.join('/')}\n${page.content}`);
}

// Resolve a relative, extension-less href against a page's directory to a normalized page path.
function resolveRelative(dirSegments: readonly string[], relNoExt: string): string {
    const joined = dirSegments.length ? `${dirSegments.join('/')}/${relNoExt}` : relNoExt;
    const parts: string[] = [];
    for (const segment of joined.split('/')) {
        if (segment === '' || segment === '.') {
            continue;
        }
        if (segment === '..') {
            parts.pop();
        } else {
            parts.push(segment);
        }
    }
    return parts.join('/');
}

describe('docs generation over the real spec', () => {
    it('renders every entity without an unresolved link and with unique paths', () => {
        const paths = MODEL.pages.map(page => page.pathSegments.join('/'));
        expect(new Set(paths).size).toBe(paths.length);
        // linkTo throws on unresolved refs, so a successful generateDocs already proves link integrity.
        expect(MODEL.pages.find(page => page.ref.kind === 'rootIndex')).toBeDefined();
        expect(paths).toContain('PdaNode');
        expect(paths).toContain('pdaSeedNodes/ConstantPdaSeedNode');
    });

    it('emits exactly one page per entity, one index per own-directory category, and one root index', () => {
        const spec = getSpec();
        const entityCount = spec.categories.reduce((total, category) => {
            return (
                total +
                category.nodes.length +
                category.unions.length +
                category.nestedUnions.length +
                category.enumerations.length
            );
        }, 0);
        const ownDirCategories = spec.categories.filter(category => category.name !== 'topLevel').length;
        expect(MODEL.pages.filter(page => page.ref.kind === 'rootIndex')).toHaveLength(1);
        expect(MODEL.pages.filter(page => page.ref.kind === 'categoryIndex')).toHaveLength(ownDirCategories);
        expect(MODEL.pages).toHaveLength(entityCount + ownDirCategories + 1);
    });

    it('produces a page for every node, union, nestedUnion, and enumeration in the spec', () => {
        const spec = getSpec();
        for (const category of spec.categories) {
            for (const node of category.nodes) {
                expect(() => pageOf(MODEL, 'node', node.kind)).not.toThrow();
            }
            for (const union of category.unions) {
                expect(() => pageOf(MODEL, 'union', union.name)).not.toThrow();
            }
            for (const nestedUnion of category.nestedUnions) {
                expect(() => pageOf(MODEL, 'nestedUnion', nestedUnion.name)).not.toThrow();
            }
            for (const enumeration of category.enumerations) {
                expect(() => pageOf(MODEL, 'enumeration', enumeration.name)).not.toThrow();
            }
        }
    });

    it('resolves every emitted relative link to an emitted page', () => {
        const pagePaths = new Set(MODEL.pages.map(page => page.pathSegments.join('/')));
        const linkPattern = /\]\(([^)]+)\)/g;
        for (const page of MODEL.pages) {
            const dir = page.pathSegments.slice(0, -1);
            for (const match of page.content.matchAll(linkPattern)) {
                const href = match[1];
                // Absolute URLs (e.g. the root page's links to previous majors' docs) are not emitted pages.
                if (!href.endsWith('.md') || /^https?:\/\//.test(href)) {
                    continue;
                }
                const target = resolveRelative(dir, href.slice(0, -'.md'.length));
                expect(pagePaths.has(target), `broken link ${href} in ${page.pathSegments.join('/')}`).toBe(true);
            }
        }
    });

    it('is deterministic over the real spec', () => {
        const again = generateDocs(getSpec());
        expect(flattenPages(again)).toEqual(flattenPages(MODEL));
    });

    it('lists topLevel entities in the TopLevel section of the root index (nodes and unions)', () => {
        const root = rootContent(MODEL);
        expect(root).toContain('## TopLevel');
        expect(root).toContain('- [`AccountNode`](./AccountNode.md)');
        expect(root).toContain('- [`InstructionByteDeltaValue`](./InstructionByteDeltaValue.md)');
    });

    it('renders the base attributes on the root index and at the end of every node page attribute tables', () => {
        const root = rootContent(MODEL);
        expect(root).toContain('## Base attributes');
        expect(root).toContain('`plugins`');

        for (const page of MODEL.pages) {
            if (page.ref.kind !== 'node') continue;
            const where = `node page ${page.pathSegments.join('/')}`;
            // plugins is child-classified, so every node page has a Children table ending with it
            expect(page.content, `${where} should render the plugins base attribute`).toContain('`plugins`');
            const lastRow = page.content.split('## Examples')[0].trimEnd().split('\n').at(-1)!;
            expect(lastRow, `${where} should list plugins as the last attribute row`).toContain('`plugins`');
        }
    });

    it('renders the accountNode page with a Data/Children split and the nested-union data link', () => {
        const content = pageOf(MODEL, 'node', 'accountNode').content;
        expect(content.startsWith('# AccountNode')).toBe(true);
        expect(content).toContain('### Data');
        expect(content).toContain('### Children');
        // accountNode.data is a nestedUnion 'nestedTypeNode<structTypeNode>' - both arms are linked
        expect(content).toContain('[`NestedTypeNode`]');
        expect(content).toContain('[`StructTypeNode`]');
    });
});
