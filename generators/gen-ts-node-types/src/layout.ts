/**
 * Layout strategy: where each named TS declaration lives in the generated
 * `js/node-types/src/generated/` tree, and how to produce a relative
 * import path between two such locations.
 *
 * The mapping is read directly from the spec — every node, union, and
 * enumeration is filed under its parent `CategorySpec`. The generator
 * maps each category name to a TS-monorepo-flavoured subdirectory.
 */

import type { Spec } from '@codama/spec';

import { pascalCase } from './naming';

/**
 * A path inside `generated/`, expressed without a leading slash and
 * without a file extension. Examples: `'AccountNode'`,
 * `'typeNodes/StructTypeNode'`, `'shared/brands'`.
 */
export type Location = string;

export interface Layout {
    /** Where each enumeration file lives. */
    readonly enumerationNameToLocation: ReadonlyMap<string, Location>;
    /** Where each nested-union alias file lives. */
    readonly nestedUnionNameToLocation: ReadonlyMap<string, Location>;
    /** Where each node interface file lives. */
    readonly nodeKindToLocation: ReadonlyMap<string, Location>;
    /** Locations of fixed shared types. */
    readonly sharedLocations: SharedLocations;
    /** Where each union file lives. */
    readonly unionNameToLocation: ReadonlyMap<string, Location>;
}

export interface SharedLocations {
    readonly camelCaseString: Location;
    readonly codamaVersion: Location;
    readonly docs: Location;
    readonly kebabCaseString: Location;
    readonly node: Location;
    readonly nodeKind: Location;
    readonly pascalCaseString: Location;
    readonly snakeCaseString: Location;
    readonly titleCaseString: Location;
    readonly version: Location;
}

/**
 * Maps each spec category name to the TS-monorepo subdirectory the
 * generator emits its content into. The spec uses generic category
 * names (`'type'`, `'value'`, …); the TS generator translates them to
 * the conventional `typeNodes/`, `valueNodes/`, … filesystem layout.
 */
const CATEGORY_TO_DIRECTORY: Record<string, string> = {
    contextualValue: 'contextualValueNodes',
    count: 'countNodes',
    discriminator: 'discriminatorNodes',
    link: 'linkNodes',
    pdaSeed: 'pdaSeedNodes',
    shared: 'shared',
    topLevel: '',
    type: 'typeNodes',
    value: 'valueNodes',
};

function directoryForCategory(name: string): string {
    const dir = CATEGORY_TO_DIRECTORY[name];
    if (dir === undefined) {
        throw new Error(`gen-ts-node-types: unknown category "${name}". Extend CATEGORY_TO_DIRECTORY.`);
    }
    return dir;
}

export function buildLayout(spec: Spec): Layout {
    const nodeKindToLocation = new Map<string, Location>();
    const unionNameToLocation = new Map<string, Location>();
    const enumerationNameToLocation = new Map<string, Location>();
    const nestedUnionNameToLocation = new Map<string, Location>();

    for (const category of spec.categories) {
        const dir = directoryForCategory(category.name);
        for (const node of category.nodes) {
            nodeKindToLocation.set(node.kind, joinLocation(dir, pascalCase(node.kind)));
        }
        for (const union of category.unions) {
            unionNameToLocation.set(union.name, joinLocation(dir, union.name));
        }
        for (const enumeration of category.enumerations) {
            enumerationNameToLocation.set(enumeration.name, joinLocation(dir, camelCaseFromPascal(enumeration.name)));
        }
        for (const nu of category.nestedUnions) {
            nestedUnionNameToLocation.set(nu.name, joinLocation(dir, nu.name));
        }
    }

    const sharedLocations: SharedLocations = {
        camelCaseString: joinLocation('shared', 'brands'),
        codamaVersion: joinLocation('shared', 'version'),
        docs: joinLocation('shared', 'docs'),
        kebabCaseString: joinLocation('shared', 'brands'),
        node: joinLocation('', 'Node'),
        nodeKind: joinLocation('', 'Node'),
        pascalCaseString: joinLocation('shared', 'brands'),
        snakeCaseString: joinLocation('shared', 'brands'),
        titleCaseString: joinLocation('shared', 'brands'),
        version: joinLocation('shared', 'version'),
    };

    return {
        enumerationNameToLocation,
        nestedUnionNameToLocation,
        nodeKindToLocation,
        sharedLocations,
        unionNameToLocation,
    };
}

function joinLocation(subdir: string, fileName: string): Location {
    return subdir ? `${subdir}/${fileName}` : fileName;
}

function camelCaseFromPascal(name: string): string {
    if (name.length === 0) return name;
    return name.charAt(0).toLowerCase() + name.slice(1);
}

/**
 * Produce the relative import path from `currentLocation` to `targetLocation`.
 *
 * Both are paths inside `generated/` (no leading slash, no extension).
 * The result is suitable for an `import { … } from '<here>';` line.
 */
export function relativeImportPath(currentLocation: Location, targetLocation: Location): string {
    if (currentLocation === targetLocation) {
        // Self-import — caller should use a fragment without an import.
        throw new Error(`relativeImportPath: refusing to produce a self-import for "${currentLocation}"`);
    }
    const currentParts = currentLocation.split('/');
    const targetParts = targetLocation.split('/');
    // The current file's directory is everything except the last segment.
    const currentDir = currentParts.slice(0, -1);
    let common = 0;
    while (
        common < currentDir.length &&
        common < targetParts.length - 1 &&
        currentDir[common] === targetParts[common]
    ) {
        common++;
    }
    const upSteps = currentDir.length - common;
    const downParts = targetParts.slice(common);
    const ups = upSteps === 0 ? './' : '../'.repeat(upSteps);
    return `${ups}${downParts.join('/')}`;
}
