/** Render-time string constants shared across page renderers - titles, defaults, and block delimiters in one place. */
import type { CategoryGroup } from '../types';

/** Blank line between rendered blocks (headings, tables, paragraphs). */
export const BLOCK_SEPARATOR = '\n\n';

/** Root-page title. */
export const ROOT_TITLE = 'Codama Spec';

/** Root-page description. */
export const ROOT_DESCRIPTION = 'The canonical Codama node specification.';

/**
 * The constrained string types rendered in attribute tables (`IdentifierString`, …),
 * defined once on the root page so their grammars are discoverable from the
 * generated docs alone.
 */
export const CONSTRAINED_STRINGS: readonly { name: string; definition: string }[] = [
    {
        name: 'IdentifierString',
        definition:
            'a machine key: `[A-Za-z_][A-Za-z0-9_]*` (no leading digit). No casing is mandated, but identifiers ' +
            'sharing a scope (a sibling set of the same kind) must stay unique after lowercasing and stripping ' +
            'underscores, so renderer casing conversions never collide. References match identifiers by exact ' +
            'string comparison; the folding rule governs uniqueness only.',
    },
    {
        name: 'NamespaceString',
        definition:
            'a chain of identifiers separated by single dots: `identifier ("." identifier)*` — e.g. `i18n.es`. ' +
            'A single identifier is a valid namespace. Used for plugin namespaces, which match by exact string ' +
            'comparison; the identifier folding rule does not apply.',
    },
    {
        name: 'PathString',
        definition:
            'a path expression pointing into nested data: `identifier ( "." identifier | "[" integer "]" )*` — ' +
            'e.g. `amount` or `fruits[0].banana`, with non-negative indices. Each attribute carrying a path ' +
            'documents its anchor; interpolated text templates embed the same expressions as `${root.path}` ' +
            'placeholders, where the leading root names the anchor explicitly.',
    },
    {
        name: 'SemverString',
        definition: 'a semver version string — e.g. `1.6.0`.',
    },
];

/**
 * Docs landing pages of previous spec majors, linked from the root page's version line.
 * Each release line hosts exactly one major, so older docs live on their own maintenance
 * branches; append one entry here at each major transition.
 */
export const PREVIOUS_MAJOR_DOCS: readonly { label: string; url: string }[] = [
    { label: 'v1', url: 'https://github.com/codama-idl/spec/blob/1.x/v1/docs/README.md' },
];

/** The display heading for each category group kind - a rendering concern, kept out of the CategoryGroup data. */
export const GROUP_TITLES: Record<CategoryGroup['kind'], string> = {
    node: 'Nodes',
    union: 'Unions',
    nestedUnion: 'Nested unions',
    enumeration: 'Enumerations',
};

/** Indentation unit for one list-nesting level (markdown convention: 4 spaces). */
export const LIST_INDENT = '    ';

/** Separator between rendered list lines (each item, and an item from its nested sub-list, sits on its own line). */
export const LIST_LINE_SEPARATOR = '\n';
