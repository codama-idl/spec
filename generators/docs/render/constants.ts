/** Render-time string constants shared across page renderers - titles, defaults, and block delimiters in one place. */
import type { CategoryGroup } from '../types';

/** Blank line between rendered blocks (headings, tables, paragraphs). */
export const BLOCK_SEPARATOR = '\n\n';

/** Root-page title. */
export const ROOT_TITLE = 'Codama Spec';

/** Root-page description. */
export const ROOT_DESCRIPTION = 'The canonical Codama node specification.';

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
