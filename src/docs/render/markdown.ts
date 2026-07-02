import { markdownTable } from 'markdown-table';

import type { MarkupRenderer } from '../types';

/**
 * The default markdown renderer.
 * Tables are padded (columns aligned, `>= 3` dashes).
 *
 * Note: this renderer is hand-rolled on purpose to stay dependency-free.
 * Markdown libraries are intentionally avoided until they are needed.
 * Revisit this decision if the renderer grows
 * */
export const markdownRenderer: MarkupRenderer = {
    heading(level, content) {
        return `${'#'.repeat(level)} ${content}`;
    },
    paragraph(content) {
        return content;
    },
    code(value) {
        const fence = backtickFence(value, 1);
        // pad when value starts/ends with a backtick - the renderer strips the single space
        const pad = value.startsWith('`') || value.endsWith('`') ? ' ' : '';
        return `${fence}${pad}${value}${pad}${fence}`;
    },
    link(text, href) {
        return `[${text}](${href})`;
    },
    bold(content) {
        return `**${content}**`;
    },
    italic(content) {
        return `_${content}_`;
    },
    list(type, items) {
        return items.map((item, index) => `${type === 'numbered' ? `${index + 1}.` : '-'} ${item}`).join('\n');
    },
    codeBlock(language, code) {
        // block fence must be >= 3 backticks and longer than any run in code
        const fence = backtickFence(code, 3);
        return `${fence}${language}\n${code}\n${fence}`;
    },
    table(head, rows) {
        if (rows.some(row => row.length !== head.length)) {
            throw new Error(`markdownRenderer.table: expected each row to have ${head.length} cells`);
        }
        return markdownTable([head.map(escapeCell), ...rows.map(row => row.map(escapeCell))]);
    },
};

/** Escape characters that would otherwise break a markdown table cell (bare pipes read as column separators). */
function escapeCell(cell: string): string {
    return cell.replace(/\|/g, '\\|');
}

/** Backtick fence at least `min` long and longer than any backtick run in content, so content cannot close it early. */
function backtickFence(content: string, min: number): string {
    const longestRun = Math.max(0, ...(content.match(/`+/g) ?? []).map(run => run.length));
    return '`'.repeat(Math.max(min, longestRun + 1));
}
