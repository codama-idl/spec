import type { DocRef, DocRefKey } from './types';

/** Uppercases the first character only. Inputs are lowerCamelCase identifiers, so this yields PascalCase. */
export function pascalCase(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/** The pascal-cased display name for a ref (e.g. 'typeNode' -> 'TypeNode'). */
export function displayName(ref: DocRef): string {
    return pascalCase(refName(ref));
}

/** The raw name of a DocRef entity. */
export function refName(ref: DocRef): string {
    if (ref.kind === 'rootIndex') {
        return 'root';
    }
    if (ref.kind === 'categoryIndex') {
        return ref.category;
    }
    return ref.name;
}

/** Builds the canonical `<kind>:<name>` key for a DocRef - disambiguates same-named entities across kinds. */
export function docRefKey(ref: DocRef): DocRefKey {
    return `${ref.kind}:${refName(ref)}`;
}
