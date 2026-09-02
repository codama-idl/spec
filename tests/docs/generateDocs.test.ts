import { describe, expect, it } from 'vitest';

import { generateDocs } from '../../generators/docs/generateDocs';
import type { DocModel, DocPage, DocRef } from '../../generators/docs/types';
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
    const model = generateDocs(SPEC);

    it('places pages per the spec categories', () => {
        expect(nodePage(model, 'constantPdaSeedNode').pathSegments.join('/')).toBe('pdaSeedNodes/ConstantPdaSeedNode');
        expect(nodePage(model, 'pdaNode').pathSegments.join('/')).toBe('PdaNode');
    });
    it('renders title, Data with a synthesized kind row, and code-wrapped Children links', () => {
        const content = nodePage(model, 'constantPdaSeedNode').content;
        expect(content.startsWith('# ConstantPdaSeedNode')).toBe(true);
        expect(content).toContain('### Data');
        expect(content).toContain('`"constantPdaSeedNode"`');
        expect(content).toContain('### Children');
        expect(content).toContain('[`TypeNode`](../typeNodes/TypeNode.md)');
        expect(content).toContain('[`ConstantPdaSeedValue`](./ConstantPdaSeedValue.md)');
    });
    it('joins docs entries as lines - blank entries break paragraphs, fences stay contiguous', () => {
        const content = nodePage(model, 'constantPdaSeedNode').content;
        // one entry per line: the fence renders with no injected blank lines, '' entries become
        // paragraph breaks, and the callout lines stay adjacent
        expect(content).toContain(
            'A constant seed.\n\n' +
                'For example:\n\n```ts\nconstantPdaSeedNode("hello");\n```\n\n' +
                '> [!IMPORTANT]\n> The seed must be constant.',
        );
    });
    it('joins all attribute doc lines into the table Description cell', () => {
        const content = nodePage(model, 'constantPdaSeedNode').content;
        expect(content).toContain('The seed value. Must be constant.');
    });
    it('uses only the first docs line for index blurbs', () => {
        const content = pageOfKind(model, 'categoryIndex', 'pdaSeed').content;
        expect(content).toContain('- [`ConstantPdaSeedNode`](./ConstantPdaSeedNode.md) - A constant seed.');
        expect(content).not.toContain('```ts');
    });
    it('marks optional attributes and carries no trailing newline', () => {
        const content = nodePage(model, 'pdaNode').content;
        expect(content).toContain('_(optional)_');
        expect(content.endsWith('\n')).toBe(false);
    });
    it('ensures deterministic docs generation', () => {
        const again = generateDocs(SPEC);
        expect(nodePage(again, 'constantPdaSeedNode').content).toBe(nodePage(model, 'constantPdaSeedNode').content);
    });
});

describe('generateDocs - non-node page types', () => {
    const model = generateDocs(SPEC);

    it('union page: abstract member list', () => {
        const content = pageOfKind(model, 'union', 'typeNode').content;
        expect(content.startsWith('# TypeNode (abstract)')).toBe(true);
        expect(content).toContain('One of the following:');
        expect(content).toContain('- [`NumberTypeNode`](./NumberTypeNode.md)');
    });
    it('enumeration page: Variants list', () => {
        const content = pageOfKind(model, 'enumeration', 'numberFormat').content;
        expect(content.startsWith('# NumberFormat')).toBe(true);
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
        const model = generateDocs(SPEC);
        return findPage(model, page => page.ref.kind === 'rootIndex').content;
    }

    it('lists own-directory categories alphabetically with PascalCased links, topLevel in its own section', () => {
        const content = rootContent();
        expect(content.startsWith('# Codama Spec')).toBe(true);
        expect(content).toContain(`Spec version: ${SPEC.version}`);
        expect(content).toContain('Pages marked _(abstract)_');
        expect(content).toContain('## Categories');
        // PascalCased link text, alphabetical order (pdaSeed before type)
        expect(content).toContain('[PdaSeed](./pdaSeedNodes/README.md)');
        expect(content.indexOf('](./pdaSeedNodes/README.md)')).toBeLessThan(
            content.indexOf('](./typeNodes/README.md)'),
        );
        // topLevel extracted to its own section below Categories, entities as a flat list
        expect(content.indexOf('## Categories')).toBeLessThan(content.indexOf('## TopLevel'));
        expect(content).toContain('- [`PdaNode`](./PdaNode.md)');
    });
    it('lists topLevel unions in the TopLevel section too, not just nodes (root index == Navigation)', () => {
        expect(rootContent()).toContain('- [`HelperUnion`](./HelperUnion.md)');
    });
});

describe('generateDocs - examples', () => {
    function content(): string {
        return nodePage(generateDocs(SPEC), 'numberTypeNode').content;
    }

    it('renders an Examples section after Attributes, one h3 per case', () => {
        const c = content();
        expect(c.indexOf('## Attributes')).toBeLessThan(c.indexOf('## Examples'));
        expect(c).toContain('### u32 integers');
        expect(c).toContain("```typescript\nnumberTypeNode('u32');\n```");
    });
    it('renders optional prose between the title and the code, matching space-joined docs', () => {
        const c = content();
        expect(c.indexOf('### cross-language')).toBeLessThan(c.indexOf('Shown in both languages.'));
        expect(c.indexOf('Shown in both languages.')).toBeLessThan(c.indexOf("```typescript\nnumberTypeNode('u8');"));
    });
    it('stacks one fenced block per language with mapped fence tags', () => {
        const c = content();
        expect(c).toContain("```typescript\nnumberTypeNode('u8');\n```");
        expect(c).toContain('```rust\nnumber_type_node(U8);\n```');
    });
    it('omits the whole section for a node carrying no examples', () => {
        expect(nodePage(generateDocs(SPEC), 'programNode').content).not.toContain('## Examples');
    });
});
