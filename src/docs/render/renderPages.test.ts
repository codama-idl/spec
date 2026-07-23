import { describe, expect, it } from 'vitest';

import type { EnumerationSpec, NodeSpec } from '../../api';
import type { DocRef, NavRegistry } from '../types';
import { markdownRenderer } from './markdown';
import type { RenderCtx } from './renderPages';
import { renderEnumPage, renderNodePage } from './renderPages';

/** A minimal RenderCtx over the real markdown renderer - lookup returns fixed path segments, links resolve to '#'. */
function makeCtx(): RenderCtx {
    const registry: NavRegistry = {
        entries: [],
        lookup: (ref: DocRef) => ({ ref, pathSegments: ['generated', 'page'] }),
    };
    return {
        markup: markdownRenderer,
        registry,
        config: {},
        link: () => '#',
    };
}

describe('renderNodePage', () => {
    it('renders a node page with a PascalCased heading, an Attributes/Data section, and the synthesized kind row', () => {
        const node: NodeSpec = {
            kind: 'numberValueNode',
            docs: ['A literal number value.'],
            attributes: [{ name: 'number', type: { kind: 'integer', width: 'u64' }, docs: ['The number.'] }],
            examples: [],
        };

        const page = renderNodePage(node, makeCtx());

        expect(page.ref).toEqual({ kind: 'node', name: 'numberValueNode' });
        expect(page.pathSegments).toEqual(['generated', 'page']);
        expect(page.content).toContain('# NumberValueNode');
        expect(page.content).toContain('A literal number value.');
        expect(page.content).toContain('## Attributes');
        expect(page.content).toContain('### Data');
        expect(page.content).toContain('`kind`');
        expect(page.content).toContain('`"numberValueNode"`');
        expect(page.content).toContain('`u64`');
    });

    it('escapes pipes from a literalUnion cell so union values do not spawn extra table columns', () => {
        const node: NodeSpec = {
            kind: 'sideNode',
            attributes: [{ name: 'side', type: { kind: 'literalUnion', values: ['left', 'right'] } }],
            examples: [],
        };

        const page = renderNodePage(node, makeCtx());

        // the raw union body is `"left" | "right"`; inside a table cell the pipe must be escaped as `\|`
        expect(page.content).toContain('"left" \\| "right"');
        expect(page.content).not.toContain('"left" | "right"');
    });
});

describe('renderEnumPage', () => {
    it('renders a Variants list, appending the first-doc blurb only when a variant has docs', () => {
        const enumeration: EnumerationSpec = {
            name: 'valueScope',
            docs: ['Where a value applies.'],
            variants: [{ name: 'global', docs: ['Applies everywhere.'] }, { name: 'local' }],
        };

        const page = renderEnumPage(enumeration, makeCtx());

        expect(page.content).toContain('# ValueScope');
        expect(page.content).toContain('## Variants');
        expect(page.content).toContain('- `global` - Applies everywhere.');
        // no docs -> bare label, no trailing ' - ' blurb
        expect(page.content).toContain('- `local`');
        expect(page.content).not.toContain('`local` -');
    });
});
