import type { CategorySpec, Spec } from '../api';
import { docRefKey, refName } from './ref';
import type {
    CategoryGroup,
    DocRef,
    DocRefKey,
    NavCategory,
    Navigation,
    NavEntry,
    NavRegistry,
    PathConfig,
} from './types';

/** Builds navigation registry. */
export function buildNavRegistry(pathConfig: PathConfig, spec: Spec): NavRegistry {
    const entries = new Map<DocRefKey, NavEntry>();
    const paths = new Map<string, DocRefKey>();
    function register(ref: DocRef, pathSegments: string[]) {
        const key = docRefKey(ref);
        if (entries.has(key)) {
            throw new Error(`Duplicate DocRef registration: ${key}`);
        }
        // Paths must stay unique: a reused path silently overwrites a page on emit while links still resolve.
        // Could happen with invalid pathConfig or spec.
        const pathKey = pathSegments.join('/');
        const existing = paths.get(pathKey);
        if (existing) {
            throw new Error(`Duplicate DocRef path: ${pathKey} (for ${existing} and ${key})`);
        }
        paths.set(pathKey, key);
        entries.set(key, { ref, pathSegments });
    }

    register({ kind: 'rootIndex' }, [pathConfig.indexFileName]);
    for (const category of spec.categories) {
        const dir = pathConfig.categoryDir(category);
        if (hasOwnDirectory(pathConfig, category)) {
            register({ kind: 'categoryIndex', category: category.name }, toPathSegments(dir, pathConfig.indexFileName));
        }
        for (const group of categoryGroups(category)) {
            for (const { ref } of group.items) {
                register(ref, toPathSegments(dir, pathConfig.fileName(ref)));
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

/** Builds navigation. */
export function buildNavigation(pathConfig: PathConfig, spec: Spec): Navigation {
    const root: DocRef[] = [
        { kind: 'rootIndex' },
        ...spec.categories
            .filter(category => hasOwnDirectory(pathConfig, category))
            .map(category => ({ kind: 'categoryIndex', category: category.name }) as DocRef),
    ];
    const categories: NavCategory[] = spec.categories.map(category => ({
        name: category.name,
        pages: groupCategoryPages(category),
    }));
    return { root, categories };
}

/** `categoryDir` value meaning "the docs root": a category with no folder of its own. */
const DOCS_ROOT_DIR = '';

/**
 * Whether a category is rendered into its own subfolder, and so gets its own category-index page.
 * A `DOCS_ROOT_DIR` result means the category has no folder of its own.
 * And its entities live at the root and fold into the root index instead of getting a separate index page.
 */
export function hasOwnDirectory(pathConfig: PathConfig, category: CategorySpec): boolean {
    return pathConfig.categoryDir(category) !== DOCS_ROOT_DIR;
}

/** A category's pages: each `categoryGroups` group in order, alphabetical within the group. */
export function groupCategoryPages(category: CategorySpec): DocRef[] {
    return categoryGroups(category).flatMap(group => {
        return group.items.map(item => item.ref).sort(sortDocRefByName);
    });
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

function sortDocRefByName(a: DocRef, b: DocRef): number {
    return refName(a).localeCompare(refName(b));
}
