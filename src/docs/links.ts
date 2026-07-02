import type { LinkStrategy } from './types';

/** POSIX relative-path links between two pages, suffixed with file `extension`. */
export function relativeLinks(extension: string): LinkStrategy {
    const ext = normalizeDotExtension(extension);
    return (from, to) => {
        const rel = posixRelative(from.pathSegments.slice(0, -1), to.pathSegments);
        const prefix = rel.startsWith('.') ? '' : './';
        return `${prefix}${rel}${ext}`;
    };
}

/** POSIX relative path from a directory's segments to a target's segments (browser-safe, no node:path). */
function posixRelative(fromDir: readonly string[], to: readonly string[]): string {
    const shared = commonPrefixLength(fromDir, to);
    // climb out of each dir below the shared ancestor
    const up = Array(fromDir.length - shared).fill('..');
    // then descend into the target
    const down = to.slice(shared);
    return [...up, ...down].join('/');
}

/** Number of leading segments two paths share - the depth of their common ancestor directory. */
function commonPrefixLength(a: readonly string[], b: readonly string[]): number {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
}

/** Route-absolute links under `baseUrl`. */
export function absoluteLinks(opts: { baseUrl: string; extension?: string }): LinkStrategy {
    const base = opts.baseUrl.replace(/\/+$/, '');
    const ext = normalizeDotExtension(opts.extension);
    return (_from, to) => `${base}/${to.pathSegments.join('/')}${ext}`;
}

/** Normalizes an optional extension to a leading-dot suffix ('' when absent): 'md' | '.md' -> '.md'. */
function normalizeDotExtension(extension?: string): string {
    return extension ? `.${extension.replace(/^\.+/, '')}` : '';
}
