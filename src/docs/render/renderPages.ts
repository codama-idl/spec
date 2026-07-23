import type {
    AttributeSpec,
    CategorySpec,
    EnumerationSpec,
    NestedUnionSpec,
    NodeSpec,
    Spec,
    UnionSpec,
} from '../../api';
import { categoryGroups, hasOwnDirectory } from '../navigation';
import { displayName, pascalCase, refName } from '../ref';
import type {
    CategoryGroup,
    DocConfig,
    DocPage,
    DocRef,
    InjectionSlot,
    InjectPage,
    ListItem,
    MarkupRenderer,
    NavRegistry,
} from '../types';
import { BLOCK_SEPARATOR, GROUP_TITLES, ROOT_DESCRIPTION, ROOT_TITLE } from './constants';
import { isDocChild, linkedEntity, renderType } from './renderType';

/** Shared context threaded through every page renderer. `link` resolves a relative `.mdx` href between two pages. */
export interface RenderCtx {
    markup: MarkupRenderer;
    registry: NavRegistry;
    config: DocConfig;
    link: (from: DocRef, to: DocRef) => string;
}

/** Per-page helpers: `linkTo` binds this page as the link source, `createInjectContext` builds a slot's inject context. */
function createPageContext(ctx: RenderCtx, from: DocRef, page: InjectPage) {
    const linkTo = (target: DocRef): string => ctx.link(from, target);
    const createInjectContext = (slot: InjectionSlot) => ({ page, slot, markup: ctx.markup, linkTo });
    return { linkTo, createInjectContext };
}

export function renderNodePage(node: NodeSpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'node', name: node.kind };
    const { linkTo, createInjectContext } = createPageContext(ctx, ref, { kind: 'node', node });

    // classify: synthesized `kind` row first, then each attribute into Data or Children (declaration order)
    const dataRows: string[][] = [[markup.code('kind'), markup.code(`"${node.kind}"`), 'The node discriminator.']];
    const childRows: string[][] = [];
    for (const attribute of node.attributes) {
        const row = [markup.code(attribute.name), typeCell(attribute, markup, linkTo), getFirstDoc(attribute.docs)];
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
        // injection: afterDescription
        ctx.config.inject?.(createInjectContext('afterDescription')),
        // attributes section
        markup.heading(2, 'Attributes'),
        // data table
        `${markup.heading(3, 'Data')}${BLOCK_SEPARATOR}${markup.table(cols, dataRows)}`,
        // children table (omitted when none)
        childRows.length
            ? `${markup.heading(3, 'Children')}${BLOCK_SEPARATOR}${markup.table(cols, childRows)}`
            : undefined,
        // injection: end
        ctx.config.inject?.(createInjectContext('end')),
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

export function renderUnionPage(union: UnionSpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'union', name: union.name };
    const { linkTo, createInjectContext } = createPageContext(ctx, ref, { kind: 'union', union });
    const members = markup.list(
        'bulleted',
        union.members.map(member => linkedEntity({ kind: member.kind, name: member.name }, markup, linkTo)),
    );
    const parts: (string | undefined)[] = [
        // header
        markup.heading(1, `${pascalCase(union.name)} (abstract)`),
        // description
        renderSpecDocs(union.docs, markup),
        // injection: afterDescription
        ctx.config.inject?.(createInjectContext('afterDescription')),
        // body: lead-in
        markup.paragraph('One of the following:'),
        // body: member links
        members,
        // injection: end
        ctx.config.inject?.(createInjectContext('end')),
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
    const { linkTo, createInjectContext } = createPageContext(ctx, ref, { kind: 'nestedUnion', nestedUnion });
    const wrappers = markup.list(
        'bulleted',
        nestedUnion.wrappers.map(wrapper => linkedEntity({ kind: 'node', name: wrapper }, markup, linkTo)),
    );
    const parts: (string | undefined)[] = [
        // header
        markup.heading(1, `${pascalCase(nestedUnion.name)} (recursive)`),
        // description
        renderSpecDocs(nestedUnion.docs, markup),
        // injection: afterDescription
        ctx.config.inject?.(createInjectContext('afterDescription')),
        // body: base type
        markup.paragraph(`Base: ${renderType(nestedUnion.base, markup, linkTo)}`),
        // body: wrappers section
        `${markup.heading(2, 'Wrappers')}${BLOCK_SEPARATOR}${wrappers}`,
        // injection: end
        ctx.config.inject?.(createInjectContext('end')),
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
    const { createInjectContext } = createPageContext(ctx, ref, { kind: 'enumeration', enumeration });
    const variants = markup.list(
        'bulleted',
        enumeration.variants.map(variant => withBlurb(markup.code(variant.name), variant.docs)),
    );
    const parts: (string | undefined)[] = [
        // header
        markup.heading(1, pascalCase(enumeration.name)),
        // description
        renderSpecDocs(enumeration.docs, markup),
        // injection: afterDescription
        ctx.config.inject?.(createInjectContext('afterDescription')),
        // body: variants section
        `${markup.heading(2, 'Variants')}${BLOCK_SEPARATOR}${variants}`,
        // injection: end
        ctx.config.inject?.(createInjectContext('end')),
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
    const sorted = [...group.items].sort((a, b) => refName(a.ref).localeCompare(refName(b.ref)));
    const lines = markup.list(
        'bulleted',
        sorted.map(({ ref, docs }) => withBlurb(linkedEntity(ref, markup, linkTo), docs)),
    );
    return `${markup.heading(2, GROUP_TITLES[group.kind])}${BLOCK_SEPARATOR}${lines}`;
}

export function renderCategoryIndexPage(category: CategorySpec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'categoryIndex', category: category.name };
    const { linkTo, createInjectContext } = createPageContext(ctx, ref, { kind: 'categoryIndex', category });
    const parts: (string | undefined)[] = [
        // header: PascalCased category name (e.g. pdaSeed -> PdaSeed)
        markup.heading(1, pascalCase(category.name)),
        // description
        renderSpecDocs(category.docs, markup),
        // injection: afterDescription
        ctx.config.inject?.(createInjectContext('afterDescription')),
        // body: one section per non-empty group
        ...categoryGroups(category).map(group => renderGroup(group, markup, linkTo)),
        // injection: end
        ctx.config.inject?.(createInjectContext('end')),
    ];
    return {
        ref,
        pathSegments: ctx.registry.lookup(ref).pathSegments,
        content: parts.filter(Boolean).join(BLOCK_SEPARATOR),
    };
}

export function renderRootIndexPage(spec: Spec, ctx: RenderCtx): DocPage {
    const { markup } = ctx;
    const ref: DocRef = { kind: 'rootIndex' };
    const { linkTo, createInjectContext } = createPageContext(ctx, ref, { kind: 'rootIndex', spec });

    // categories with their own directory, listed alphabetically as PascalCased links
    const categories: ListItem[] = spec.categories
        .filter(category => hasOwnDirectory(category))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(category =>
            withBlurb(
                markup.link(pascalCase(category.name), linkTo({ kind: 'categoryIndex', category: category.name })),
                category.docs,
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
        // injection: afterDescription
        ctx.config.inject?.(createInjectContext('afterDescription')),
        // version
        markup.paragraph(`Version ${spec.version}`),
        // body: linked categories
        `${markup.heading(2, 'Categories')}${BLOCK_SEPARATOR}${markup.list('bulleted', categories)}`,
        // body: one section per root-level category (topLevel)
        ...rootSections,
        // injection: end
        ctx.config.inject?.(createInjectContext('end')),
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
        .flatMap(group => [...group.items].sort((a, b) => refName(a.ref).localeCompare(refName(b.ref))))
        .map(({ ref, docs }) => withBlurb(markup.link(displayName(ref), linkTo(ref)), docs));
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

/** One Type-column cell: the rendered type, plus an ` _(optional)_` suffix when the attribute is optional. */
function typeCell(attribute: AttributeSpec, markup: MarkupRenderer, linkTo: (ref: DocRef) => string): string {
    const base = renderType(attribute.type, markup, linkTo);
    return attribute.optional ? `${base} ${markup.italic('(optional)')}` : base;
}

/**
 * The short blurb for a table cell or list line - the first doc paragraph only, '' when there are none.
 * Only `docs[0]` is used on purpose: tables and lists want a one-line summary, so other paragraphs are dropped.
 * The full multi-paragraph docs still render on the entity's own page via `renderSpecDocs`.
 */
function getFirstDoc(docs?: readonly string[]): string {
    return docs?.[0] ?? '';
}

/** Appends a ` - <first doc paragraph>` suffix to a label (see `getFirstDoc`), or the bare label when there are none. */
function withBlurb(label: string, docs?: readonly string[]): string {
    return docs?.[0] ? `${label} - ${docs[0]}` : label;
}

/** Renders a spec `docs` field (a list of prose paragraphs) as a single space-joined paragraph, '' when empty. */
function renderSpecDocs(docs: readonly string[] | undefined, markup: MarkupRenderer): string {
    return docs?.length ? markup.paragraph(docs.join(' ')) : '';
}
