/**
 * A symbolic import map. Imports are accumulated as references to modules
 * keyed by the identifier consumers use, then resolved to a sorted block of
 * `import { … } from '…';` lines once a final fragment is rendered.
 *
 * Each `ImportInfo` records:
 *   - `importedIdentifier` — the name exported by the source module
 *   - `usedIdentifier`     — the name used in the consuming code (may differ via aliasing)
 *   - `isType`             — whether the import is a TypeScript type-only import
 *
 * The format accepted by `parseImportInput` is:
 *   `Foo`                   — value import; used as `Foo`
 *   `type Foo`              — type-only import; used as `Foo`
 *   `Foo as Bar`            — value import aliased; used as `Bar`
 *   `type Foo as Bar`       — type-only import aliased; used as `Bar`
 */

export type ImportInput = string;
export type Module = string;
export type UsedIdentifier = string;

export interface ImportInfo {
    readonly importedIdentifier: string;
    readonly usedIdentifier: UsedIdentifier;
    readonly isType: boolean;
}

export type ImportMap = ReadonlyMap<Module, ReadonlyMap<UsedIdentifier, ImportInfo>>;

export function createImportMap(): ImportMap {
    return Object.freeze(new Map());
}

export function parseImportInput(input: ImportInput): ImportInfo {
    const matches = /^(type )?([^ ]+)(?: as (.+))?$/.exec(input);
    if (!matches) {
        return Object.freeze({
            importedIdentifier: input,
            isType: false,
            usedIdentifier: input,
        });
    }
    const [, isType, name, alias] = matches;
    return Object.freeze({
        importedIdentifier: name,
        isType: !!isType,
        usedIdentifier: alias ?? name,
    });
}

export function addToImportMap(importMap: ImportMap, module: Module, imports: ImportInput[]): ImportMap {
    if (imports.length === 0) return importMap;
    // Build the per-module map by applying the same conflict-resolution rule
    // used by `mergeImportMaps`. This guarantees that a single batch like
    // `['Foo', 'type Foo']` or `['type Foo', 'Foo']` lands as a value import,
    // independent of input order.
    const moduleMap = new Map<UsedIdentifier, ImportInfo>();
    for (const input of imports) {
        const info = parseImportInput(input);
        const existing = moduleMap.get(info.usedIdentifier);
        if (preferIncoming(existing, info)) {
            moduleMap.set(info.usedIdentifier, info);
        }
    }
    return mergeImportMaps([importMap, new Map([[module, moduleMap]])]);
}

export function removeFromImportMap(
    importMap: ImportMap,
    module: Module,
    usedIdentifiers: UsedIdentifier[],
): ImportMap {
    const next = new Map(importMap);
    const moduleMap = new Map(next.get(module));
    for (const id of usedIdentifiers) moduleMap.delete(id);
    if (moduleMap.size === 0) {
        next.delete(module);
    } else {
        next.set(module, moduleMap);
    }
    return Object.freeze(next);
}

export function mergeImportMaps(importMaps: readonly ImportMap[]): ImportMap {
    if (importMaps.length === 0) return createImportMap();
    if (importMaps.length === 1) return importMaps[0];
    const merged = new Map(importMaps[0]);
    for (const map of importMaps.slice(1)) {
        for (const [module, imports] of map) {
            const moduleMap = new Map<UsedIdentifier, ImportInfo>(
                merged.get(module) ?? new Map<UsedIdentifier, ImportInfo>(),
            );
            for (const [usedIdentifier, info] of imports) {
                const existing = moduleMap.get(usedIdentifier);
                if (preferIncoming(existing, info)) {
                    moduleMap.set(usedIdentifier, info);
                }
            }
            merged.set(module, moduleMap);
        }
    }
    return Object.freeze(merged);
}

/**
 * Decide whether an incoming `ImportInfo` should replace an existing entry
 * for the same `usedIdentifier`.
 *
 * The single rule we apply: if both refer to the same source identifier and
 * one is type-only while the other is a value import, the value import wins.
 * In every other "tied" case the existing entry stays.
 */
function preferIncoming(existing: ImportInfo | undefined, incoming: ImportInfo): boolean {
    if (!existing) return true;
    return existing.importedIdentifier === incoming.importedIdentifier && existing.isType && !incoming.isType;
}

/**
 * Render an import map as a block of TypeScript `import { … } from '…';`
 * statements. Modules are sorted with non-relative paths first, then
 * relative; within each group, alphabetical. Identifiers within each
 * module are alphabetical.
 *
 * When every import from a given module is type-only, the line is emitted
 * as `import type { … } from '…';` rather than per-identifier `type` —
 * matching the `@solana/eslint-config-solana` consolidate-type-imports
 * convention used in the published surface.
 */
export function importMapToString(importMap: ImportMap): string {
    return [...importMap.entries()]
        .sort(([a], [b]) => {
            const aRelative = a.startsWith('.') ? 1 : 0;
            const bRelative = b.startsWith('.') ? 1 : 0;
            if (aRelative !== bRelative) return aRelative - bRelative;
            return a.localeCompare(b);
        })
        .map(([module, imports]) => {
            const infos = [...imports.values()];
            const allTypeOnly = infos.length > 0 && infos.every(info => info.isType);
            const renderedIds = infos
                .map(info => formatImportInfo(info, allTypeOnly))
                .sort((a, b) => a.localeCompare(b))
                .join(', ');
            const prefix = allTypeOnly ? 'import type ' : 'import ';
            return `${prefix}{ ${renderedIds} } from '${module}';`;
        })
        .join('\n');
}

function formatImportInfo(info: ImportInfo, blockIsTypeOnly: boolean): string {
    const alias = info.importedIdentifier !== info.usedIdentifier ? ` as ${info.usedIdentifier}` : '';
    // Drop the per-identifier `type` prefix when the whole block is already
    // declared as a type-only import.
    const typePrefix = info.isType && !blockIsTypeOnly ? 'type ' : '';
    return `${typePrefix}${info.importedIdentifier}${alias}`;
}
