/**
 * Self-consistency validation for an assembled spec.
 *
 * Returns an array of human-readable error strings. An empty array means
 * the spec is internally coherent — every reference resolves, no
 * duplicate names, naming conventions hold.
 */

import type { EnumerationSpec, NodeSpec, Spec, TypeExpr, UnionSpec } from './types';

type RegistryKind = 'enumeration' | 'node' | 'union';

/**
 * The canonical camelCase identifier shape used across the spec for
 * unions and enumerations. Node kinds must also
 * end in `Node` — see `NODE_KIND_REGEX`.
 */
const CAMEL_CASE_REGEX = /^[a-z][A-Za-z0-9]*$/;
const NODE_KIND_REGEX = /^[a-z][A-Za-z0-9]*Node$/;

export function validate(spec: Spec): string[] {
    const errors: string[] = [];

    const allNodes: NodeSpec[] = [];
    const allUnions: UnionSpec[] = [];
    const allEnumerations: EnumerationSpec[] = [];
    for (const c of spec.categories) {
        allNodes.push(...c.nodes);
        allUnions.push(...c.unions);
        allEnumerations.push(...c.enumerations);
    }

    const nodeKinds = new Set(allNodes.map(n => n.kind));
    const unionNames = new Set(allUnions.map(u => u.name));
    const enumerationNames = new Set(allEnumerations.map(e => e.name));

    // Single-pass name-collision check across nodes, unions, and
    // enumerations. One error per offending name.
    const registrations = new Map<string, RegistryKind[]>();
    const record = (name: string, kind: RegistryKind): void => {
        const list = registrations.get(name);
        if (list) list.push(kind);
        else registrations.set(name, [kind]);
    };
    for (const n of allNodes) record(n.kind, 'node');
    for (const u of allUnions) record(u.name, 'union');
    for (const e of allEnumerations) record(e.name, 'enumeration');

    for (const [name, kinds] of registrations) {
        if (kinds.length > 1) errors.push(formatCollisionError(name, kinds));
    }

    // Duplicate category names.
    const seenCategories = new Set<string>();
    for (const c of spec.categories) {
        if (seenCategories.has(c.name)) {
            errors.push(`Category "${c.name}" is declared more than once.`);
        }
        seenCategories.add(c.name);
    }

    // Base-attribute validation: duplicates within the base, resolvable
    // references, and no collisions with any node's declared attributes
    // (base attributes are appended to every node by codegen targets).
    const baseAttributes = spec.base?.attributes ?? [];
    const baseAttributeNames = new Set<string>();
    for (const a of baseAttributes) {
        if (baseAttributeNames.has(a.name)) {
            errors.push(`Base attribute "${a.name}" is declared more than once.`);
        }
        baseAttributeNames.add(a.name);
        walkTypeExpr(a.type, expr =>
            checkRef(expr, `Base attribute "${a.name}":`, errors, nodeKinds, unionNames, enumerationNames),
        );
    }

    // Per-node validation.
    for (const n of allNodes) {
        if (!NODE_KIND_REGEX.test(n.kind)) {
            errors.push(`Node kind "${n.kind}" does not match the camelCase ...Node naming convention.`);
        }
        const seenAttrs = new Set<string>();
        for (const a of n.attributes) {
            if (seenAttrs.has(a.name)) {
                errors.push(`Node "${n.kind}" declares attribute "${a.name}" more than once.`);
            }
            seenAttrs.add(a.name);
            if (baseAttributeNames.has(a.name)) {
                errors.push(`Node "${n.kind}" declares attribute "${a.name}", which collides with a base attribute.`);
            }
            walkTypeExpr(a.type, expr =>
                checkRef(
                    expr,
                    `Node "${n.kind}", attribute "${a.name}":`,
                    errors,
                    nodeKinds,
                    unionNames,
                    enumerationNames,
                ),
            );
        }
    }

    // Union member resolution.
    for (const u of allUnions) {
        if (!CAMEL_CASE_REGEX.test(u.name)) {
            errors.push(`Union "${u.name}" does not match the camelCase naming convention.`);
        }
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

    // Enumeration naming.
    for (const e of allEnumerations) {
        if (!CAMEL_CASE_REGEX.test(e.name)) {
            errors.push(`Enumeration "${e.name}" does not match the camelCase naming convention.`);
        }
    }

    return errors;
}

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
    }
}

function checkRef(
    expr: TypeExpr,
    where: string,
    errors: string[],
    nodeKinds: Set<string>,
    unionNames: Set<string>,
    enumerationNames: Set<string>,
): void {
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
        case 'docs':
        case 'text':
            // text-shaped attributes implicitly reference textNode via their rich arm
            if (!nodeKinds.has('textNode')) {
                errors.push(`${where} is text-shaped but node "textNode" is not defined.`);
            }
            break;
        default:
            break;
    }
}

/**
 * Discriminator helper used by codegen, docs, and visitor-table generators.
 *
 * A "child" attribute is one whose value contains another node. Specifically,
 * any attribute whose type tree includes a `node` or `union` is treated
 * as a child — including `text` and `docs`, whose values may be
 * `textNode`s carrying plugin nodes. Note that `text` and `docs` are the
 * only child kinds whose value may also be a primitive string; consumers
 * driving traversal from this discriminator must guard that arm.
 * Optionality (the `optional` flag on the attribute itself) is
 * orthogonal to this classification.
 */
export function isChildAttribute(type: TypeExpr): boolean {
    switch (type.kind) {
        case 'anyNode':
        case 'docs':
        case 'node':
        case 'text':
        case 'union':
            return true;
        case 'array':
            return isChildAttribute(type.of);
        default:
            return false;
    }
}
