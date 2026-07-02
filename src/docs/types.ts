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

/**
 * Entities (sections) within a category, in listing order.
 *
 * @example
 * const group: CategoryGroup = {
 *     kind: 'node',
 *     items: [{ ref: { kind: 'node', name: 'constantPdaSeedNode' }, docs: ['A constant PDA seed.'] }],
 * };
 */
export interface CategoryGroup {
    readonly kind: 'node' | 'union' | 'nestedUnion' | 'enumeration';
    readonly items: readonly CategoryGroupItem[];
}

/** One entity within a category group - its page ref plus the entity's own doc blurbs. */
export interface CategoryGroupItem {
    /** Entity refs only - the structural rootIndex/categoryIndex kinds never appear in a category group. */
    readonly ref: Extract<DocRef, { readonly kind: CategoryGroup['kind'] }>;
    readonly docs?: readonly string[];
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

/** A consumer-side emitted file - contains file path and string content. */
export interface DocFile {
    readonly path: string;
    readonly content: string;
}
