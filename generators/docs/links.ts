import { relativePath } from '@codama/fragments';

import { PAGE_EXTENSION } from './constants';
import type { NavEntry } from './types';

/** POSIX relative link from one page to another, using the target's page extension. */
export function relativePageLink(from: NavEntry, to: NavEntry): string {
    const rel = relativePath(from.pathSegments.slice(0, -1).join('/'), to.pathSegments.join('/'));
    const prefix = rel.startsWith('.') ? '' : './';
    return `${prefix}${rel}${PAGE_EXTENSION}`;
}
