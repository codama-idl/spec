import type { CategorySpec, EnumerationSpec, NestedUnionSpec, NodeSpec, Spec, UnionSpec } from '../api';

/** Configuration for the docs generator */
export interface DocConfig {
    /** Hook for injecting extra markup to a page via defined slots. */
    readonly inject?: InjectContent;
}

/**
 * A name-only reference to a doc page - the identity used for links and navigation.
 * Entity kinds (node, union, nestedUnion, enumeration) map 1:1 onto TypeExpr ref arms.
 * `categoryIndex` and `rootIndex` are structural, doc-only pages.
 */
export type DocRef =
    | { readonly kind: 'node'; readonly name: string }
    | { readonly kind: 'union'; readonly name: string }
    | { readonly kind: 'nestedUnion'; readonly name: string }
    | { readonly kind: 'enumeration'; readonly name: string }
    | { readonly kind: 'categoryIndex'; readonly category: string }
    | { readonly kind: 'rootIndex' };

/** Canonical registry key for a ref: `<kind>:<name>` (e.g. 'node:pdaNode', 'rootIndex:root'). */
export type DocRefKey = `${DocRef['kind']}:${string}`;

/** A single rendered page. */
export interface DocPage {
    readonly ref: DocRef;
    /** Example: ['pdaSeedNodes','ConstantPdaSeedNode']  */
    readonly pathSegments: readonly string[];
    /** The rendered body with resolved links */
    readonly content: string;
}

/** The complete generator output - every rendered page. */
export interface DocModel {
    readonly pages: readonly DocPage[];
}

/** Internal registry assigning every entity its path segments. `lookup` resolves a ref to its entry. */
export interface NavRegistry {
    readonly entries: readonly NavEntry[];
    lookup(ref: DocRef): NavEntry;
}

/** A registry entry pairing a ref with the path segments assigned to it up front. */
export interface NavEntry {
    readonly ref: DocRef;
    readonly pathSegments: readonly string[];
}

/** A list item: a leaf line, or a line with a nested sub-list. */
export type ListItem = string | { readonly content: string; readonly children: readonly ListItem[] };

/** Markup renderer interface for documentation - each method renders one block. */
export interface MarkupRenderer {
    heading(level: number, content: string): string;
    paragraph(content: string): string;
    table(head: readonly string[], rows: readonly (readonly string[])[]): string; // padded GitHub-style
    codeBlock(language: string, code: string): string;
    list(type: 'bulleted' | 'numbered', items: readonly ListItem[]): string;
    code(value: string): string;
    link(text: string, href: string): string;
    bold(content: string): string;
    italic(content: string): string;
    /**
     * Escape authored prose (markdown) so the generated output is safe as both `.md` and `.mdx`.
     * Neutralizes the two mdx-significant chars - `<` (opens JSX) and `{` (opens an expression) - outside code spans,
     * while leaving existing markdown live: code spans, emphasis, links, etc. render as authored. Use for spec text.
     */
    prose(value: string): string;
    escapeChar(value: string): string;
}

/** Hook for injecting extra markup to a page via defined slots. */
export type InjectContent = (ctx: {
    page: InjectPage;
    slot: InjectionSlot;
    markup: MarkupRenderer;
    linkTo: (target: DocRef) => string;
}) => string | undefined;

/** Where injected content is placed within a page body. */
export type InjectionSlot = 'afterDescription' | 'end';

/** The current page as a discriminated spec subject - same kinds as DocRef. */
export type InjectPage =
    | { readonly kind: 'node'; readonly node: NodeSpec }
    | { readonly kind: 'union'; readonly union: UnionSpec }
    | { readonly kind: 'nestedUnion'; readonly nestedUnion: NestedUnionSpec }
    | { readonly kind: 'enumeration'; readonly enumeration: EnumerationSpec }
    | { readonly kind: 'categoryIndex'; readonly category: CategorySpec }
    | { readonly kind: 'rootIndex'; readonly spec: Spec };

/** A consumer-side emitted file - contains file path and string content. */
export interface DocFile {
    readonly path: string;
    readonly content: string;
}
