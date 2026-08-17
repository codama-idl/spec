import { markdownTable } from 'markdown-table';

import type { ListItem, MarkupRenderer } from '../types';
import { LIST_INDENT, LIST_LINE_SEPARATOR } from './constants';

/**
 * The default markdown renderer.
 * Tables are padded (columns aligned, `>= 3` dashes).
 *
 * Note: this renderer is hand-rolled on purpose to stay dependency-free.
 * Markdown libraries are intentionally avoided until they are needed. (currently only markdownTable is used)
 * Revisit this decision if the renderer grows.
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
        return renderList(type, items, 0);
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
    prose(value) {
        // Spec docs are authored as markdown, so they pass through unchanged.
        return value;
    },
};

/** Escape characters that would otherwise break a markdown table cell (bare pipes read as column separators). */
function escapeCell(cell: string): string {
    return cell.replace(/\|/g, char => `\\${char}`);
}

/** Renders a (possibly nested) list, indenting each level by 4 spaces per markdown's nested-bullet convention. */
function renderList(type: 'bulleted' | 'numbered', items: readonly ListItem[], depth: number): string {
    const indent = LIST_INDENT.repeat(depth);
    return items
        .map((item, index) => {
            const marker = type === 'numbered' ? `${index + 1}.` : '-';
            // leaf, or a node with no children -> a plain line
            if (typeof item === 'string' || item.children.length === 0) {
                const content = typeof item === 'string' ? item : item.content;
                return `${indent}${marker} ${content}`;
            }
            return `${indent}${marker} ${item.content}${LIST_LINE_SEPARATOR}${renderList(type, item.children, depth + 1)}`;
        })
        .join(LIST_LINE_SEPARATOR);
}

/** Backtick fence at least `min` long and longer than any backtick run in content, so content cannot close it early. */
function backtickFence(content: string, min: number): string {
    const longestRun = Math.max(0, ...(content.match(/`+/g) ?? []).map(run => run.length));
    return '`'.repeat(Math.max(min, longestRun + 1));
}
