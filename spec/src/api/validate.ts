/**
 * Self-consistency validation for an assembled spec.
 *
 * Returns an array of human-readable error strings. An empty array means
 * the spec is internally coherent — every reference resolves, no duplicate
 * names, naming conventions hold.
 */

import type { Spec, TypeExpr } from './types';

type RegistryKind = 'enumeration' | 'node' | 'union';

export function validate(spec: Spec): string[] {
    const errors: string[] = [];

    const nodeKinds = new Set(spec.nodes.map(n => n.kind));
    const unionNames = new Set(spec.unions.map(u => u.name));
    const enumerationNames = new Set(spec.enumerations.map(e => e.name));
    const wrappers = new Set(spec.nestedTypeNodeWrappers);

    // ---- Single-pass name-collision check -------------------------------
    //
    // Detects both within-kind duplicates ("two nodes called `accountNode`")
    // and cross-kind collisions ("there's a node and a union both called
    // `TypeNode`") in one report per offending name.

    const registrations = new Map<string, RegistryKind[]>();
    const record = (name: string, kind: RegistryKind): void => {
        const list = registrations.get(name);
        if (list) list.push(kind);
        else registrations.set(name, [kind]);
    };
    for (const n of spec.nodes) record(n.kind, 'node');
    for (const u of spec.unions) record(u.name, 'union');
    for (const e of spec.enumerations) record(e.name, 'enumeration');

    for (const [name, kinds] of registrations) {
        if (kinds.length > 1) errors.push(formatCollisionError(name, kinds));
    }

    // ---- Per-node validation --------------------------------------------

    for (const n of spec.nodes) {
        if (!/^[a-z][A-Za-z0-9]*Node$/.test(n.kind)) {
            errors.push(`Node kind "${n.kind}" does not match the camelCase ...Node naming convention.`);
        }
        const seenAttrs = new Set<string>();
        for (const a of n.attributes) {
            if (seenAttrs.has(a.name)) {
                errors.push(`Node "${n.kind}" declares attribute "${a.name}" more than once.`);
            }
            seenAttrs.add(a.name);
            walkTypeExpr(a.type, expr =>
                checkRef(expr, n.kind, a.name, errors, nodeKinds, unionNames, enumerationNames),
            );
        }
    }

    // ---- Union member resolution ----------------------------------------

    for (const u of spec.unions) {
        if (u.members.length === 0) {
            errors.push(`Union "${u.name}" has no members.`);
        }
        const seenMembers = new Set<string>();
        for (const m of u.members) {
            const key = `${m.kind}:${m.name}`;
            if (seenMembers.has(key)) {
                errors.push(`Union "${u.name}" lists member ${key} more than once.`);
            }
            seenMembers.add(key);
            if (m.kind === 'node' && !nodeKinds.has(m.name)) {
                errors.push(`Union "${u.name}" references undefined node "${m.name}".`);
            }
            if (m.kind === 'union' && !unionNames.has(m.name)) {
                errors.push(`Union "${u.name}" references undefined union "${m.name}".`);
            }
        }
    }

    // ---- nestedTypeNode wrapper sanity ----------------------------------

    for (const wrapper of wrappers) {
        if (!nodeKinds.has(wrapper)) {
            errors.push(`Nested-type-node wrapper "${wrapper}" is not a defined node.`);
        }
    }

    return errors;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCollisionError(name: string, kinds: RegistryKind[]): string {
    const counts = new Map<RegistryKind, number>();
    for (const k of kinds) counts.set(k, (counts.get(k) ?? 0) + 1);
    const breakdown = [...counts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([k, n]) => `${n} ${k}${n > 1 ? 's' : ''}`)
        .join(', ');
    return `Name "${name}" is registered ${kinds.length} times (${breakdown}); names must be unique across nodes, unions, and enumerations.`;
}

function walkTypeExpr(expr: TypeExpr, visit: (expr: TypeExpr) => void): void {
    visit(expr);
    if (expr.kind === 'array') {
        walkTypeExpr(expr.of, visit);
    } else if (expr.kind === 'tuple') {
        for (const item of expr.items) walkTypeExpr(item, visit);
    }
}

function checkRef(
    expr: TypeExpr,
    nodeKind: string,
    attrName: string,
    errors: string[],
    nodeKinds: Set<string>,
    unionNames: Set<string>,
    enumerationNames: Set<string>,
): void {
    const where = `Node "${nodeKind}", attribute "${attrName}":`;
    switch (expr.kind) {
        case 'node':
            if (!nodeKinds.has(expr.name)) {
                errors.push(`${where} references undefined node "${expr.name}".`);
            }
            break;
        case 'union':
            if (!unionNames.has(expr.name)) {
                errors.push(`${where} references undefined union "${expr.name}".`);
            }
            break;
        case 'enumeration':
            if (!enumerationNames.has(expr.name)) {
                errors.push(`${where} references undefined enumeration "${expr.name}".`);
            }
            break;
        case 'nestedTypeNode':
            if (!nodeKinds.has(expr.name)) {
                errors.push(`${where} nestedTypeNode references undefined node "${expr.name}".`);
            }
            break;
        default:
            break;
    }
}

// ---------------------------------------------------------------------------
// Child-detection (used by codegen / docs / visitor table generators)
// ---------------------------------------------------------------------------

/**
 * A "child" attribute is one whose value contains another node. Specifically,
 * any attribute whose type tree includes a `node`, `nestedTypeNode`, or
 * `union` is treated as a child. Optionality (the `optional` flag on the
 * attribute itself) is orthogonal to this classification.
 */
export function isChildAttribute(type: TypeExpr): boolean {
    switch (type.kind) {
        case 'node':
        case 'nestedTypeNode':
        case 'union':
            return true;
        case 'array':
            return isChildAttribute(type.of);
        case 'tuple':
            return type.items.some(isChildAttribute);
        default:
            return false;
    }
}
