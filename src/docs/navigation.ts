import type { CategorySpec, Spec } from '../api';
import { docRefKey, pascalCase, refName } from './ref';
import type { CategoryGroup, DocRef, DocRefKey, NavEntry, NavRegistry } from './types';

/** Index page basename - Fumadocs treats a folder's `index` file as its landing page, served at the folder URL. */
const INDEX_FILE_NAME = 'index';

/** `categoryDir` value meaning "the docs root": a category with no folder of its own. */
const DOCS_ROOT_DIR = '';

/** Directory for a category: the docs root for topLevel, else `<name>Nodes` (e.g. 'pdaSeed' -> 'pdaSeedNodes'). */
function categoryDir(category: CategorySpec): string {
    return category.name === 'topLevel' ? DOCS_ROOT_DIR : `${category.name}Nodes`;
}

/** Basename for a ref page - the PascalCased entity name (e.g. node constantPdaSeedNode -> 'ConstantPdaSeedNode'). */
function fileName(ref: DocRef): string {
    return pascalCase(refName(ref));
}

/** Builds navigation registry. */
export function buildNavRegistry(spec: Spec): NavRegistry {
    const entries = new Map<DocRefKey, NavEntry>();
    const paths = new Map<string, DocRefKey>();
    function register(ref: DocRef, pathSegments: string[]) {
        const key = docRefKey(ref);
        if (entries.has(key)) {
            throw new Error(`Duplicate DocRef registration: ${key}`);
        }
        // Paths must stay unique: a reused path silently overwrites a page on emit while links still resolve.
        const pathKey = pathSegments.join('/');
        const existing = paths.get(pathKey);
        if (existing) {
            throw new Error(`Duplicate DocRef path: ${pathKey} (for ${existing} and ${key})`);
        }
        paths.set(pathKey, key);
        entries.set(key, { ref, pathSegments });
    }

    register({ kind: 'rootIndex' }, [INDEX_FILE_NAME]);
    for (const category of spec.categories) {
        const dir = categoryDir(category);
        if (hasOwnDirectory(category)) {
            register({ kind: 'categoryIndex', category: category.name }, toPathSegments(dir, INDEX_FILE_NAME));
        }
        for (const group of categoryGroups(category)) {
            for (const { ref } of group.items) {
                register(ref, toPathSegments(dir, fileName(ref)));
            }
        }
    }
    return {
        entries: [...entries.values()],
        lookup(ref) {
            const found = entries.get(docRefKey(ref));
            if (!found) {
                throw new Error(`Unresolved DocRef: ${docRefKey(ref)}`);
            }
            return found;
        },
    };
}

/**
 * The single source of "which entities a category holds", split into per-kind groups in listing order.
 * Reused by the registry, navigation, and category index.
 */
export function categoryGroups(category: CategorySpec): CategoryGroup[] {
    return [
        { kind: 'node', items: toCategoryGroupItems('node', category.nodes, node => node.kind) },
        { kind: 'union', items: toCategoryGroupItems('union', category.unions, union => union.name) },
        {
            kind: 'nestedUnion',
            items: toCategoryGroupItems('nestedUnion', category.nestedUnions, nestedUnion => nestedUnion.name),
        },
        {
            kind: 'enumeration',
            items: toCategoryGroupItems('enumeration', category.enumerations, enumeration => enumeration.name),
        },
    ];
}

/**
 * Whether a category is rendered into its own subfolder, and so gets its own category-index page.
 * topLevel has no folder of its own, so its entities live at the root and fold into the root index.
 */
export function hasOwnDirectory(category: CategorySpec): boolean {
    return categoryDir(category) !== DOCS_ROOT_DIR;
}

function toCategoryGroupItems<T extends { docs?: readonly string[] }>(
    kind: CategoryGroup['kind'],
    items: readonly T[],
    nameOf: (item: T) => string,
): CategoryGroup['items'] {
    return items.map(item => ({
        ref: { kind, name: nameOf(item) },
        docs: item.docs,
    }));
}

function toPathSegments(dir: string, basename: string): string[] {
    return dir ? [dir, basename] : [basename];
}
