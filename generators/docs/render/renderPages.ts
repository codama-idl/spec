import { pascalCase } from '@codama/fragments';

import type {
    AttributeSpec,
    CategorySpec,
    DocExample,
    DocExamples,
    EnumerationSpec,
    NestedUnionSpec,
    NodeSpec,
    Spec,
    UnionSpec,
} from '../../../src/api';
import { categoryGroups, hasOwnDirectory } from '../navigation';
import { refName } from '../ref';
import type {
    CategoryGroup,
    CategoryGroupItem,
    DocPage,
    DocRef,
    ListItem,
    MarkupRenderer,
    NavRegistry,
} from '../types';
import { BLOCK_SEPARATOR, GROUP_TITLES, PREVIOUS_MAJOR_DOCS, ROOT_DESCRIPTION, ROOT_TITLE } from './constants';
import { isDocChild, linkedEntity, renderType } from './renderType';

/** Shared context threaded through every page renderer. `link` resolves a relative href between two pages. */
export interface RenderCtx {
    readonly markup: MarkupRenderer;
    readonly registry: NavRegistry;
    readonly link: (from: DocRef, to: DocRef) => string;
}

/** Binds a page as the link source, so renderers resolve hrefs by target ref alone. */
function linkFrom(ctx: RenderCtx, from: DocRef): (target: DocRef) => string {
    return (target: DocRef): string => ctx.link(from, target);
}

export function renderNodePage(node: NodeSpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'node', name: node.kind };
    const linkTo = linkFrom(ctx, ref);

    // classify: synthesized `kind` row first, then each attribute into Data or Children (declaration order)
    const dataRows: string[][] = [[markup.code('kind'), markup.code(`"${node.kind}"`), 'The node discriminator.']];
    const childRows: string[][] = [];
    for (const attribute of node.attributes) {
        const row = [markup.code(attribute.name), typeCell(attribute, markup, linkTo), cellDoc(attribute.docs, markup)];
        if (isDocChild(attribute.type)) {
            childRows.push(row);
        } else {
            dataRows.push(row);
        }
    }

    const cols = ['Attribute', 'Type', 'Description'];
    const parts: (string | undefined)[] = [
        // header
        markup.heading(1, pascalCase(node.kind)),
        // description
        renderSpecDocs(node.docs, markup),
        // attributes section
        markup.heading(2, 'Attributes'),
        // data table
        `${markup.heading(3, 'Data')}${BLOCK_SEPARATOR}${markup.table(cols, dataRows)}`,
        // children table (omitted when none)
        childRows.length
            ? `${markup.heading(3, 'Children')}${BLOCK_SEPARATOR}${markup.table(cols, childRows)}`
            : undefined,
        // Examples section
        renderExamples(node.examples, markup),
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

/** Render all Node examples. Every language carried by the spec is rendered. */
function renderExamples(examples: DocExamples, markup: MarkupRenderer): string | undefined {
    const rendered = examples.map(example => renderExample(example, markup)).filter(block => block !== undefined);
    if (!rendered.length) return undefined;
    return [markup.heading(2, 'Examples'), ...rendered].join(BLOCK_SEPARATOR);
}

/** Render each example. An example carrying no code block renders nothing rather than a bare heading. */
function renderExample(example: DocExample, markup: MarkupRenderer): string | undefined {
    if (!example.code.length) return undefined;
    const parts: (string | undefined)[] = [
        // header
        markup.heading(3, markup.prose(example.title)),
        // description
        renderSpecDocs(example.docs, markup),
        // code blocks
        ...example.code.map(code => markup.codeBlock(code.language, code.content.join('\n'))),
    ];
    return parts.filter(Boolean).join(BLOCK_SEPARATOR);
}

export function renderUnionPage(union: UnionSpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'union', name: union.name };
    const linkTo = linkFrom(ctx, ref);
    const members = markup.list(
        'bulleted',
        union.members.map(member => linkedEntity({ kind: member.kind, name: member.name }, markup, linkTo)),
    );
    const parts: (string | undefined)[] = [
        // header
        markup.heading(1, `${pascalCase(union.name)} (abstract)`),
        // description
        renderSpecDocs(union.docs, markup),
        // body: lead-in
        markup.paragraph('One of the following:'),
        // body: member links
        members,
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

export function renderNestedUnionPage(nestedUnion: NestedUnionSpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'nestedUnion', name: nestedUnion.name };
    const linkTo = linkFrom(ctx, ref);
    const wrappers = markup.list(
        'bulleted',
        nestedUnion.wrappers.map(wrapper => linkedEntity({ kind: 'node', name: wrapper }, markup, linkTo)),
    );
    const parts: (string | undefined)[] = [
        // header
        markup.heading(1, `${pascalCase(nestedUnion.name)} (recursive)`),
        // description
        renderSpecDocs(nestedUnion.docs, markup),
        // body: base type
        markup.paragraph(`Base: ${renderType(nestedUnion.base, markup, linkTo)}`),
        // body: wrappers section
        `${markup.heading(2, 'Wrappers')}${BLOCK_SEPARATOR}${wrappers}`,
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

export function renderEnumPage(enumeration: EnumerationSpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'enumeration', name: enumeration.name };
    const variants = markup.list(
        'bulleted',
        enumeration.variants.map(variant => withBlurb(markup.code(variant.name), variant.docs, markup)),
    );
    const parts: (string | undefined)[] = [
        // header
        markup.heading(1, pascalCase(enumeration.name)),
        // description
        renderSpecDocs(enumeration.docs, markup),
        // body: variants section
        `${markup.heading(2, 'Variants')}${BLOCK_SEPARATOR}${variants}`,
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

/** One `## <group>` section: alphabetical within the group, code-wrapped links with a ` - <docs[0]>` tail. */
function renderGroup(group: CategoryGroup, markup: MarkupRenderer, linkTo: (r: DocRef) => string): string | undefined {
    if (!group.items.length) {
        return undefined;
    }
    const lines = markup.list(
        'bulleted',
        sortedByRefName(group.items).map(({ ref, docs }) => withBlurb(linkedEntity(ref, markup, linkTo), docs, markup)),
    );
    return `${markup.heading(2, GROUP_TITLES[group.kind])}${BLOCK_SEPARATOR}${lines}`;
}

export function renderCategoryIndexPage(category: CategorySpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'categoryIndex', category: category.name };
    const linkTo = linkFrom(ctx, ref);
    const parts: (string | undefined)[] = [
        // header: PascalCased category name (e.g. pdaSeed -> PdaSeed)
        markup.heading(1, pascalCase(category.name)),
        // description
        renderSpecDocs(category.docs, markup),
        // body: one section per non-empty group
        ...categoryGroups(category).map(group => renderGroup(group, markup, linkTo)),
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

/** The root page's version line: the current spec version, plus links to the docs of previous majors. */
function specVersionLine(version: string, markup: MarkupRenderer): string {
    const current = `Spec version: ${version}`;
    if (PREVIOUS_MAJOR_DOCS.length === 0) return current;
    const others = PREVIOUS_MAJOR_DOCS.map(major => markup.link(major.label, major.url)).join(', ');
    return `${current} · Other majors: ${others}`;
}

export function renderRootIndexPage(spec: Spec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'rootIndex' };
    const linkTo = linkFrom(ctx, ref);

    // categories with their own directory, listed alphabetically as PascalCased links
    const categories: ListItem[] = spec.categories
        .filter(category => hasOwnDirectory(category))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(category =>
            withBlurb(
                markup.link(pascalCase(category.name), linkTo({ kind: 'categoryIndex', category: category.name })),
                category.docs,
                markup,
            ),
        );
    // root-level categories (no own directory, e.g. topLevel) get their own section below
    const rootSections = spec.categories
        .filter(category => !hasOwnDirectory(category))
        .map(category => renderRootCategorySection(category, ctx, linkTo));

    const parts: (string | undefined)[] = [
        // header: title
        markup.heading(1, ROOT_TITLE),
        // description
        markup.paragraph(ROOT_DESCRIPTION),
        // version, with a switcher to the docs of previous majors (hosted on their maintenance branches)
        markup.paragraph(specVersionLine(spec.version, markup)),
        // legend for the (abstract)/(recursive) heading suffixes
        markup.paragraph(
            `Pages marked ${markup.italic('(abstract)')} document unions: sets of nodes that can be used ` +
                `interchangeably. Pages marked ${markup.italic('(recursive)')} document nested unions: wrapper ` +
                `nodes that may nest before reaching a base type.`,
        ),
        // body: linked categories
        `${markup.heading(2, 'Categories')}${BLOCK_SEPARATOR}${markup.list('bulleted', categories)}`,
        // body: one section per root-level category (topLevel)
        ...rootSections,
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

/** A root-level category (no own directory, e.g. topLevel) as its own section: heading, docs, entity list. */
function renderRootCategorySection(category: CategorySpec, ctx: RenderCtx, linkTo: (r: DocRef) => string): string {
    const { markup } = ctx;
    const entities = categoryGroups(category)
        .flatMap(group => sortedByRefName(group.items))
        .map(({ ref, docs }) => withBlurb(linkedEntity(ref, markup, linkTo), docs, markup));
    const parts: (string | undefined)[] = [
        // section heading: PascalCased category name (e.g. topLevel -> TopLevel)
        markup.heading(2, pascalCase(category.name)),
        // category description
        renderSpecDocs(category.docs, markup),
        // entity links with blurbs
        markup.list('bulleted', entities),
    ];
    return parts.filter(Boolean).join(BLOCK_SEPARATOR);
}

/** Category-group items in alphabetical listing order, as shown on index pages. */
function sortedByRefName(items: readonly CategoryGroupItem[]): CategoryGroupItem[] {
    return [...items].sort((a, b) => refName(a.ref).localeCompare(refName(b.ref)));
}

/** One Type-column cell: the rendered type, plus an ` _(optional)_` suffix when the attribute is optional. */
function typeCell(attribute: AttributeSpec, markup: MarkupRenderer, linkTo: (ref: DocRef) => string): string {
    const base = renderType(attribute.type, markup, linkTo);
    return attribute.optional ? `${base} ${markup.italic('(optional)')}` : base;
}

/**
 * The short blurb for a list line - the first doc line only, '' when there are none.
 * Only `docs[0]` is used on purpose: lists want a one-line summary, so other lines are dropped.
 * The full docs still appear on the entity's own page, line-joined, via `renderSpecDocs`.
 */
function getFirstDoc(docs: readonly string[] | undefined, markup: MarkupRenderer): string {
    return docs?.[0] ? markup.prose(docs[0]) : '';
}

/**
 * A table Description cell: every doc line joined into one cell-safe string.
 * Table cells cannot hold line breaks, so blank separator entries are dropped and the
 * remaining lines are joined with spaces. Attribute docs should therefore stay at the
 * sentence level - block constructs (fences, callouts) belong in node-level docs.
 */
function cellDoc(docs: readonly string[] | undefined, markup: MarkupRenderer): string {
    return docs?.length ? markup.prose(docs.filter(line => line !== '').join(' ')) : '';
}

/** Appends a ` - <first doc paragraph>` suffix to a label (see `getFirstDoc`), or the bare label when there are none. */
function withBlurb(label: string, docs: readonly string[] | undefined, markup: MarkupRenderer): string {
    const blurb = getFirstDoc(docs, markup);
    return blurb ? `${label} - ${blurb}` : label;
}

/**
 * Renders a spec `docs` field, '' when empty.
 * Entries are lines of authored markdown, joined with a newline: blank entries separate
 * paragraphs, and multi-line constructs (fenced snippets, callouts, images) are authored
 * one line per entry - the same convention as example `code()` content.
 */
function renderSpecDocs(docs: readonly string[] | undefined, markup: MarkupRenderer): string {
    return docs?.length ? markup.paragraph(markup.prose(docs.join('\n'))) : '';
}
