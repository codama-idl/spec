import { describe, expect, it } from 'vitest';

import { generateDocs } from '../../src/docs/generateDocs';
import { absoluteLinks, relativeLinks } from '../../src/docs/links';
import { LocalDocsPathConfig } from '../../src/docs/pathConfig';
import type { DocModel, DocPage, DocRef, InjectContent } from '../../src/docs/types';
import { SPEC } from './__fixtures__/spec';

function findPage(model: DocModel, predicate: (page: DocPage) => boolean): DocPage {
    const page = model.pages.find(predicate);
    if (!page) {
        throw new Error('generateDocs test: page not found');
    }
    return page;
}

function nodePage(model: DocModel, name: string): DocPage {
    return findPage(model, page => page.ref.kind === 'node' && page.ref.name === name);
}

function pageOfKind(model: DocModel, kind: DocRef['kind'], name: string): DocPage {
    return findPage(model, page => {
        if (page.ref.kind !== kind) {
            return false;
        }
        if (page.ref.kind === 'categoryIndex') {
            return page.ref.category === name;
        }
        return 'name' in page.ref && page.ref.name === name;
    });
}

describe('generateDocs - node pages (local + relative)', () => {
    const model = generateDocs(SPEC, { pathConfig: LocalDocsPathConfig, linkStrategy: relativeLinks('md') });

    it('places pages per the spec categories', () => {
        expect(nodePage(model, 'constantPdaSeedNode').pathSegments.join('/')).toBe('pdaSeedNodes/ConstantPdaSeedNode');
        expect(nodePage(model, 'pdaNode').pathSegments.join('/')).toBe('PdaNode');
    });
    it('renders title, Data with a synthesized kind row, and code-wrapped Children links', () => {
        const content = nodePage(model, 'constantPdaSeedNode').content;
        expect(content.startsWith('# `ConstantPdaSeedNode`')).toBe(true);
        expect(content).toContain('### Data');
        expect(content).toContain('`"constantPdaSeedNode"`');
        expect(content).toContain('### Children');
        expect(content).toContain('[`TypeNode`](../typeNodes/TypeNode.md)');
        expect(content).toContain('[`ConstantPdaSeedValue`](./ConstantPdaSeedValue.md)');
    });
    it('marks optional attributes and carries no trailing newline', () => {
        const content = nodePage(model, 'pdaNode').content;
        expect(content).toContain('_(optional)_');
        expect(content.endsWith('\n')).toBe(false);
    });
    it('ensures deterministic docs generation', () => {
        const again = generateDocs(SPEC, { pathConfig: LocalDocsPathConfig, linkStrategy: relativeLinks('md') });
        expect(nodePage(again, 'constantPdaSeedNode').content).toBe(nodePage(model, 'constantPdaSeedNode').content);
    });
});

describe('generateDocs - non-node page types', () => {
    const model = generateDocs(SPEC, { pathConfig: LocalDocsPathConfig, linkStrategy: relativeLinks('md') });

    it('union page: abstract member list', () => {
        const content = pageOfKind(model, 'union', 'typeNode').content;
        expect(content.startsWith('# `TypeNode` (abstract)')).toBe(true);
        expect(content).toContain('One of the following:');
        expect(content).toContain('- [`NumberTypeNode`](./NumberTypeNode.md)');
    });
    it('nestedUnion page: Base + Wrappers', () => {
        const content = pageOfKind(model, 'nestedUnion', 'nestedTypeNode').content;
        expect(content.startsWith('# `NestedTypeNode` (recursive)')).toBe(true);
        expect(content).toContain('Base: [`TypeNode`]');
        expect(content).toContain('## Wrappers');
    });
    it('enumeration page: Variants list', () => {
        const content = pageOfKind(model, 'enumeration', 'numberFormat').content;
        expect(content.startsWith('# `NumberFormat`')).toBe(true);
        expect(content).toContain('## Variants');
    });
    it('category index: PascalCased heading + grouped lists', () => {
        const content = pageOfKind(model, 'categoryIndex', 'pdaSeed').content;
        expect(content.startsWith('# PdaSeed')).toBe(true);
        expect(content).toContain('## Nodes');
        expect(content).toContain('- [`ConstantPdaSeedNode`](./ConstantPdaSeedNode.md)');
    });
    it('emits no category index for topLevel', () => {
        expect(model.pages.some(page => page.ref.kind === 'categoryIndex' && page.ref.category === 'topLevel')).toBe(
            false,
        );
    });
});

describe('generateDocs - root index', () => {
    function rootContent(): string {
        const model = generateDocs(SPEC, { pathConfig: LocalDocsPathConfig, linkStrategy: relativeLinks('md') });
        return findPage(model, page => page.ref.kind === 'rootIndex').content;
    }

    it('lists own-directory categories alphabetically with PascalCased links, topLevel in its own section', () => {
        const content = rootContent();
        expect(content.startsWith('# Codama spec')).toBe(true);
        expect(content).toContain(`Version ${SPEC.version}`);
        expect(content).toContain('## Categories');
        // PascalCased link text, alphabetical order (pdaSeed before type)
        expect(content).toContain('[PdaSeed](./pdaSeedNodes/README.md)');
        expect(content.indexOf('](./pdaSeedNodes/README.md)')).toBeLessThan(
            content.indexOf('](./typeNodes/README.md)'),
        );
        // topLevel extracted to its own section below Categories, entities as a flat list
        expect(content.indexOf('## Categories')).toBeLessThan(content.indexOf('## TopLevel'));
        expect(content).toContain('- [PdaNode](./PdaNode.md)');
    });
    it('lists topLevel unions in the TopLevel section too, not just nodes (root index == Navigation)', () => {
        expect(rootContent()).toContain('- [HelperUnion](./HelperUnion.md)');
    });
    it('overrides title/description when root config is provided', () => {
        const custom = generateDocs(SPEC, {
            pathConfig: LocalDocsPathConfig,
            linkStrategy: relativeLinks('md'),
            root: { title: 'My Docs', description: 'Custom.' },
        });
        expect(findPage(custom, page => page.ref.kind === 'rootIndex').content.startsWith('# My Docs')).toBe(true);
    });
});

describe('generateDocs - absolute links', () => {
    const model = generateDocs(SPEC, {
        pathConfig: LocalDocsPathConfig,
        linkStrategy: absoluteLinks({ baseUrl: '/docs/v1' }),
    });

    it('bakes route-absolute hrefs (position-independent, baseUrl-prefixed)', () => {
        const content = nodePage(model, 'constantPdaSeedNode').content;
        expect(content).toContain('(/docs/v1/typeNodes/TypeNode)');
        expect(content).toContain('(/docs/v1/pdaSeedNodes/ConstantPdaSeedValue)');
    });
});

describe('generateDocs - injection slots', () => {
    const inject: InjectContent = ({ page, slot, markup, linkTo }) => {
        if (slot === 'afterDescription' && page.kind === 'node' && page.node.kind === 'constantPdaSeedNode') {
            const link = markup.link('PdaNode', linkTo({ kind: 'node', name: 'pdaNode' }));
            return `${markup.heading(2, 'Usage notes')}\n\n${markup.paragraph(`In a ${link}.`)}`;
        }
        return undefined;
    };

    function injectedContent(): string {
        const model = generateDocs(SPEC, {
            pathConfig: LocalDocsPathConfig,
            linkStrategy: relativeLinks('md'),
            inject,
        });
        return nodePage(model, 'constantPdaSeedNode').content;
    }

    it('places afterDescription content between description and Attributes', () => {
        const content = injectedContent();
        expect(content.indexOf('## Usage notes')).toBeLessThan(content.indexOf('## Attributes'));
    });
    it('resolves in-slot links relative to the current page', () => {
        expect(injectedContent()).toContain('[PdaNode](../PdaNode.md)');
    });
    it('throws when a slot links an unknown ref', () => {
        const bad: InjectContent = ({ slot, linkTo }) => {
            return slot === 'afterDescription' ? linkTo({ kind: 'node', name: 'nope' }) : undefined;
        };
        expect(() =>
            generateDocs(SPEC, { pathConfig: LocalDocsPathConfig, linkStrategy: relativeLinks('md'), inject: bad }),
        ).toThrow('Unresolved DocRef: node:nope');
    });
    it('injects into a non-node page (category index) via the discriminated page subject', () => {
        const injectCat: InjectContent = ({ page, slot, markup }) => {
            return slot === 'end' && page.kind === 'categoryIndex' && page.category.name === 'pdaSeed'
                ? markup.paragraph(`Injected into ${page.category.name}.`)
                : undefined;
        };
        const model = generateDocs(SPEC, {
            pathConfig: LocalDocsPathConfig,
            linkStrategy: relativeLinks('md'),
            inject: injectCat,
        });
        const content = pageOfKind(model, 'categoryIndex', 'pdaSeed').content;
        expect(content).toContain('Injected into pdaSeed.');
    });
});
