/**
 * Examples for spec nodes - the shape plus the helpers used to author and validate it.
 *
 * Each node may carry a list of worked examples rendered into its docs page.
 * Authors write a snippet as a single template literal.
 * `code()` dedents it and splits it into one entry per source line,
 * so the serialized `spec.json` stores `content` as a line array.
 * That keeps committed diffs readable line-by-line.
 * Renderers rejoin the lines with `\n` before emitting a fenced block.
 *
 * ## The `<NodeName>.examples.ts` file convention:
 *
 * Examples live in a sibling file next to each node definition.
 * Each file:
 *
 * - is named after the node file with an `.examples.ts` suffix
 *   (`AmountTypeNode.ts` -> `AmountTypeNode.examples.ts`)
 * - writes each snippet as a template literal passed straight to `code()`, so the
 *   snippet reads like real code and `dedent()` strips any source indentation
 * - exports a single `DocExamples` array named `examples`
 *
 * The node file imports that array and hands it to `defineNode`:
 *
 * ```ts
 * // AmountTypeNode.examples.ts
 * import { code, example, type DocExamples } from '../../../api';
 *
 * export const examples: DocExamples = [
 *     example('2-decimals USD amount', code('typescript', `
 * amountTypeNode(numberTypeNode('u32'), 2, 'USD');
 *
 * // 0.01 USD => 0x01000000
 * `)),
 * ];
 * ```
 *
 * ```ts
 * // AmountTypeNode.ts
 * import { examples } from './AmountTypeNode.examples';
 *
 * export const amountTypeNode = defineNode('amountTypeNode', {
 *     docs: ['...'],
 *     attributes: ['...'],
 *     examples,
 * });
 * ```
 */

import type { Docs } from './types';

/** Languages the spec ships example snippets for. */
export type CodeLanguage = 'typescript' | 'rust' | 'jsonc';

/** A single code snippet for one language. */
export interface CodeBlock {
    readonly language: CodeLanguage;
    readonly content: readonly string[];
}

/**
 * One documented case for a node.
 * `docs` mirrors the node and attribute `docs` convention.
 */
export interface DocExample {
    readonly title: string;
    /** Documentation lines shown under the example title. */
    readonly docs?: Docs;
    readonly code: readonly CodeBlock[];
}

/** The example collection attached to a node through `NodeSpec.examples`. */
export type DocExamples = readonly DocExample[];

/** Options for `example()`. */
export interface ExampleOptions {
    /** Documentation lines shown under the example title. */
    readonly docs?: Docs;
}

/**
 * Build a `CodeBlock` from a template-literal snippet.
 *
 * The content is dedented then split into one entry per line.
 * Dedent removes the common leading indentation shared by all non-blank lines.
 * Use spaces, not tabs, for indentation.
 */
export function code(language: CodeLanguage, content: string): CodeBlock {
    return Object.freeze({
        language,
        content: Object.freeze(dedent(content).split('\n')),
    });
}

/**
 * Build a `DocExample` from a title and one or more code blocks.
 *
 * Pass a single `CodeBlock` for the common one-language case,
 * or an array to show the same case in several languages.
 * Optional `docs` render as prose under the title.
 */
export function example(
    title: string,
    blocks: CodeBlock | readonly CodeBlock[],
    options: ExampleOptions = {},
): DocExample {
    const list = 'language' in blocks ? [blocks] : blocks;
    return Object.freeze({
        title,
        ...(options.docs !== undefined ? { docs: Object.freeze([...options.docs]) } : {}),
        code: Object.freeze([...list]),
    });
}

/**
 * Remove the common leading indentation shared by all non-blank lines.
 * Trim a single leading newline plus any trailing whitespace.
 * Relative indentation is kept.
 * Assumes space indentation - mixing tabs and spaces makes the common prefix ambiguous.
 */
function dedent(text: string): string {
    // Drop the leading newline and trailing whitespace, then split into lines.
    const lines = text.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
    // Measure the leading-whitespace width of each non-blank line (blanks would falsely force a 0 common indent).
    const indents = lines.filter(line => line.trim().length > 0).map(line => line.match(/^[ \t]*/)?.[0].length ?? 0);
    // The shared indentation is the smallest of those widths (0 when every line is blank).
    const common = indents.length > 0 ? Math.min(...indents) : 0;
    // Strip that shared prefix from every line, keeping relative indentation intact.
    return lines.map(line => line.slice(common)).join('\n');
}
