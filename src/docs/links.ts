import { relativePath } from '@codama/fragments';

import type { NavEntry } from './types';

/** POSIX relative `.mdx` link from one page to another. */
export function relativeMdxLink(from: NavEntry, to: NavEntry): string {
    const rel = relativePath(from.pathSegments.slice(0, -1).join('/'), to.pathSegments.join('/'));
    const prefix = rel.startsWith('.') ? '' : './';
    return `${prefix}${rel}.mdx`;
}
