import type { NavEntry } from './types';

/** POSIX relative `.mdx` link from one page to another (browser-safe, no node:path). */
export function relativeMdxLink(from: NavEntry, to: NavEntry): string {
    const rel = posixRelative(from.pathSegments.slice(0, -1), to.pathSegments);
    const prefix = rel.startsWith('.') ? '' : './';
    return `${prefix}${rel}.mdx`;
}

/** POSIX relative path from a directory's segments to a target's segments. */
function posixRelative(fromDir: readonly string[], to: readonly string[]): string {
    const shared = commonPrefixLength(fromDir, to);
    const up = Array(fromDir.length - shared).fill('..');
    const down = to.slice(shared);
    return [...up, ...down].join('/');
}

/** Number of leading segments two paths share - the depth of their common ancestor directory. */
function commonPrefixLength(a: readonly string[], b: readonly string[]): number {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
}
