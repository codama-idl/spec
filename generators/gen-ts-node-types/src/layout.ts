/**
 * Layout strategy: where each named TS declaration lives in the generated
 * `js/node-types/src/generated/` tree, and how to produce a relative
 * import path between two such locations.
 *
 * The mapping is derived from the spec wherever possible — e.g., a node's
 * category is computed by inspecting which `RegisteredXxxNode` union it
 * belongs to. Hand-curated overrides exist only for unions whose category
 * isn't unambiguously derivable from their members.
 */

import type { Spec, UnionMember, UnionSpec } from '@codama/spec';

import { pascalCase } from './naming';

/**
 * A path inside `generated/`, expressed without a leading slash and
 * without a file extension. Examples: `'AccountNode'`,
 * `'typeNodes/StructTypeNode'`, `'shared/brands'`.
 */
export type Location = string;

export interface Layout {
    /** Where each node interface file lives. */
    readonly nodeKindToLocation: ReadonlyMap<string, Location>;
    /** Where each union file lives. */
    readonly unionNameToLocation: ReadonlyMap<string, Location>;
    /** Where each enumeration file lives. */
    readonly enumerationNameToLocation: ReadonlyMap<string, Location>;
    /** Locations of fixed shared types. */
    readonly sharedLocations: SharedLocations;
}

export interface SharedLocations {
    readonly camelCaseString: Location;
    readonly pascalCaseString: Location;
    readonly kebabCaseString: Location;
    readonly snakeCaseString: Location;
    readonly titleCaseString: Location;
    readonly version: Location;
    readonly codamaVersion: Location;
    readonly nestedTypeNode: Location;
    readonly node: Location;
    readonly nodeKind: Location;
}

/**
 * The closed set of subdirectories the layout may place files into.
 * Defined as a string-literal union (rather than a runtime object) since
 * the values are only ever consumed structurally — at the type level for
 * `CategorySubdir`, and as plain string literals at every call site.
 */
type Subdir =
    | 'contextualValueNodes'
    | 'countNodes'
    | 'discriminatorNodes'
    | 'linkNodes'
    | 'pdaSeedNodes'
    | 'shared'
    | 'typeNodes'
    | 'valueNodes';

/**
 * The subset of subdirectories that hold node-category content.
 * Used as the value type of `UNION_LOCATIONS` and the result of
 * `categorySubdirOf`.
 */
type CategorySubdir = Exclude<Subdir, 'shared'>;

/**
 * Maps category-registered union name to the subdirectory whose nodes it
 * groups. Used to derive node placement from spec data.
 */
const CATEGORY_REGISTRY_UNION: Record<CategorySubdir, string> = {
    typeNodes: 'RegisteredTypeNode',
    valueNodes: 'RegisteredValueNode',
    linkNodes: 'RegisteredLinkNode',
    pdaSeedNodes: 'RegisteredPdaSeedNode',
    countNodes: 'RegisteredCountNode',
    discriminatorNodes: 'RegisteredDiscriminatorNode',
    contextualValueNodes: 'RegisteredContextualValueNode',
};

/**
 * Hand-curated assignment of each declared union to its subdirectory.
 * Most can be derived from members — but some helper unions span multiple
 * categories (e.g., `InstructionByteDeltaValue` mixes link nodes and value
 * nodes), so an explicit table avoids guessing.
 *
 * Top-level (no subdirectory) is signalled by an empty string.
 */
const UNION_LOCATIONS: Record<string, CategorySubdir | ''> = {
    // Type-node category
    StandaloneTypeNode: 'typeNodes',
    EnumVariantTypeNode: 'typeNodes',
    TypeNode: 'typeNodes',
    RegisteredTypeNode: 'typeNodes',

    // Value-node category
    StandaloneValueNode: 'valueNodes',
    ValueNode: 'valueNodes',
    RegisteredValueNode: 'valueNodes',
    EnumValuePayload: 'valueNodes',

    // Link-node category
    RegisteredLinkNode: 'linkNodes',
    LinkNode: 'linkNodes',

    // PDA-seed-node category
    RegisteredPdaSeedNode: 'pdaSeedNodes',
    PdaSeedNode: 'pdaSeedNodes',
    ConstantPdaSeedValue: 'pdaSeedNodes',

    // Count-node category
    RegisteredCountNode: 'countNodes',
    CountNode: 'countNodes',

    // Discriminator-node category
    RegisteredDiscriminatorNode: 'discriminatorNodes',
    DiscriminatorNode: 'discriminatorNodes',

    // Contextual-value-node category
    StandaloneContextualValueNode: 'contextualValueNodes',
    ContextualValueNode: 'contextualValueNodes',
    RegisteredContextualValueNode: 'contextualValueNodes',
    InstructionInputValueNode: 'contextualValueNodes',
    ConditionalValueCondition: 'contextualValueNodes',
    ResolverDependency: 'contextualValueNodes',
    PdaSeedValueValue: 'contextualValueNodes',
    PdaValuePda: 'contextualValueNodes',
    PdaValueProgramId: 'contextualValueNodes',

    // Top-level helper unions
    InstructionByteDeltaValue: '',
    InstructionRemainingAccountsValue: '',
};

export function buildLayout(spec: Spec): Layout {
    const nodeKindToLocation = new Map<string, Location>();
    for (const node of spec.nodes) {
        const subdir = categorySubdirOf(spec, node.kind);
        const fileName = pascalCase(node.kind);
        nodeKindToLocation.set(node.kind, joinLocation(subdir, fileName));
    }

    const unionNameToLocation = new Map<string, Location>();
    for (const union of spec.unions) {
        const subdir = UNION_LOCATIONS[union.name];
        if (subdir === undefined) {
            throw new Error(
                `gen-ts-node-types: union "${union.name}" has no subdirectory mapping. Add an entry to UNION_LOCATIONS.`,
            );
        }
        unionNameToLocation.set(union.name, joinLocation(subdir, union.name));
    }

    const enumerationNameToLocation = new Map<string, Location>();
    for (const enumeration of spec.enumerations) {
        const fileName = camelCaseFromPascal(enumeration.name);
        enumerationNameToLocation.set(enumeration.name, joinLocation('shared', fileName));
    }

    const sharedLocations: SharedLocations = {
        camelCaseString: joinLocation('shared', 'brands'),
        pascalCaseString: joinLocation('shared', 'brands'),
        kebabCaseString: joinLocation('shared', 'brands'),
        snakeCaseString: joinLocation('shared', 'brands'),
        titleCaseString: joinLocation('shared', 'brands'),
        version: joinLocation('shared', 'version'),
        codamaVersion: joinLocation('shared', 'version'),
        nestedTypeNode: joinLocation('typeNodes', 'NestedTypeNode'),
        node: joinLocation('', 'Node'),
        nodeKind: joinLocation('', 'Node'),
    };

    return {
        nodeKindToLocation,
        unionNameToLocation,
        enumerationNameToLocation,
        sharedLocations,
    };
}

function joinLocation(subdir: Subdir | '', fileName: string): Location {
    return subdir ? `${subdir}/${fileName}` : fileName;
}

function camelCaseFromPascal(name: string): string {
    if (name.length === 0) return name;
    return name.charAt(0).toLowerCase() + name.slice(1);
}

/**
 * Determines which subdirectory a node belongs to by inspecting the
 * spec's `RegisteredXxxNode` unions. Returns an empty string for
 * top-level nodes.
 */
function categorySubdirOf(spec: Spec, kind: string): CategorySubdir | '' {
    for (const [subdir, unionName] of Object.entries(CATEGORY_REGISTRY_UNION) as [CategorySubdir, string][]) {
        const union = spec.unions.find(u => u.name === unionName);
        if (union && unionContainsKind(spec, union, kind)) return subdir;
    }
    return '';
}

function unionContainsKind(spec: Spec, union: UnionSpec, kind: string): boolean {
    const visited = new Set<string>();
    const stack: UnionMember[] = [...union.members];
    while (stack.length > 0) {
        const m = stack.pop()!;
        if (m.kind === 'node') {
            if (m.name === kind) return true;
        } else if (m.kind === 'union') {
            if (visited.has(m.name)) continue;
            visited.add(m.name);
            const inner = spec.unions.find(u => u.name === m.name);
            if (inner) stack.push(...inner.members);
        }
    }
    return false;
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
