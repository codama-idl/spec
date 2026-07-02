import type { CategorySpec, EnumerationSpec, NestedUnionSpec, NodeSpec, Spec, UnionSpec } from '../api';

/** Configuration for the docs generator */
export interface DocConfig {
    /** Maps refs and categories to locations */
    readonly pathConfig: PathConfig;
    /** Link strategy for href computation (absolute, relative).  */
    readonly linkStrategy: LinkStrategy;
    /** Root page overrides */
    readonly root?: { readonly title: string; readonly description: string };
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

/** The navigation tree of a DocModel - top-level root refs plus grouped categories. */
export interface Navigation {
    readonly root: readonly DocRef[];
    readonly categories: readonly NavCategory[];
}

/** A navigation group - a category name and the ordered refs filed under it. */
export interface NavCategory {
    readonly name: string;
    readonly pages: readonly DocRef[];
}

/** The complete generator output - every rendered page plus the navigation tree. */
export interface DocModel {
    readonly pages: readonly DocPage[];
    readonly navigation: Navigation;
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

/**
 * Maps refs and categories to on-disk locations, all extension-less.
 *
 * @example
 * ```ts
 * const localDocs: PathConfig = {
 *     categoryDir: (category) => `${category.name}Nodes`, // 'pdaSeed' -> 'pdaSeedNodes'
 *     fileName: (ref) => displayName(ref), // node ref -> PascalCased 'ConstantPdaSeedNode'
 *     indexFileName: 'README',
 * };
 * ```
 */
export interface PathConfig {
    /** Transform directory name for a category, '' means the docs root. Example: category 'pdaSeed' -> 'pdaSeedNodes'. */
    categoryDir: (category: CategorySpec) => string;
    /** Transform basename for a ref. Example: node ref constantPdaSeedNode -> 'ConstantPdaSeedNode'. */
    fileName: (ref: DocRef) => string;
    /** Define basename for index pages. Example: 'README' or 'index' or 'landing'. */
    indexFileName: string;
}

/** Computes the href from one page to another, given both nav entries. */
export type LinkStrategy = (from: NavEntry, to: NavEntry) => string;

/** Markup renderer interface for documentation - each method renders one block. */
export interface MarkupRenderer {
    heading(level: number, content: string): string;
    paragraph(content: string): string;
    table(head: readonly string[], rows: readonly (readonly string[])[]): string; // padded GitHub-style
    codeBlock(language: string, code: string): string;
    list(ordered: boolean, items: readonly string[]): string;
    code(value: string): string;
    link(text: string, href: string): string;
    bold(content: string): string;
    italic(content: string): string;
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
