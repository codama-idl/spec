/**
 * Shared JSDoc rendering for every entity in the generated tree.
 *
 * The format is intentionally minimal: a single-line doc renders as a
 * one-line block (`slash-star-star … star-slash`); a multi-line doc
 * renders as a multi-line block with one starred line per source line.
 *
 * Both forms accept an optional `indent` prefix so the same helper can
 * cover top-of-file docs (no indent), interface body docs (4-space
 * indent), enumeration variant docs (4-space indent), etc.
 *
 * The returned fragment always ends in a newline so callers can drop it
 * directly above whatever it documents without further bookkeeping.
 */

import { type Fragment, fragment } from '@codama-internal/fragment';

export function renderJsDoc(text: string, indent: string = ''): Fragment {
    const lines = text.split(/\n/).map(line => sanitizeCommentBody(line.trimEnd()));
    if (lines.length === 1) {
        return fragment`${indent}/** ${lines[0]} */\n`;
    }
    const body = lines.map(line => `${indent} * ${line}`.trimEnd()).join('\n');
    return fragment`${indent}/**\n${body}\n${indent} */\n`;
}

/**
 * Defang any embedded `*\/` sequence inside a doc body so it cannot
 * terminate the surrounding block comment.
 *
 * The replacement (`*\/`) is one extra backslash compared to the original;
 * inside a comment the backslash has no special meaning, so the text reads
 * unchanged to humans while the parser no longer sees a comment terminator.
 */
function sanitizeCommentBody(line: string): string {
    return line.replace(/\*\//g, '*\\/');
}
