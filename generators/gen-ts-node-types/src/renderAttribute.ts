/**
 * Render a single `AttributeSpec` as one of:
 *   - A line in an interface body referring to a generic param (for child
 *     attributes, and for data attributes flagged as narrowable).
 *   - A line in an interface body with the type inlined (for the rest).
 *
 * Plus, for the lifted attributes, the corresponding generic-param
 * declaration (constraint + default).
 *
 * Lifting policy: every child attribute lifts; in addition, any
 * `${nodeKind}:${attribute}` listed in `options.narrowableDataAttributes`
 * lifts even if it is data. The Data-vs-Children section assignment in
 * the rendered interface body still tracks `isChildAttribute`,
 * independent of whether the attribute is lifted.
 */

import { type AttributeSpec, isChildAttribute, type TypeExpr } from '@codama/spec';
import { type Fragment, fragment } from '@codama-internal/fragment';

import { genericParamName } from './naming';
import { renderJsDoc } from './renderDocs';
import { renderTypeExpr, type RenderTypeExprContext } from './renderTypeExpr';

export interface AttributeRendering {
    /** The source attribute name; used by `renderNode` to apply per-node generic ordering. */
    readonly attributeName: string;
    /**
     * The line of interface body for this attribute, e.g.
     * `readonly name: CamelCaseString;` or `readonly data: TData;`.
     */
    readonly bodyLine: Fragment;
    /**
     * The corresponding generic-param declaration (constraint + default),
     * present iff this attribute was lifted to a generic.
     */
    readonly genericParam?: Fragment;
    /**
     * Whether this attribute belongs in the `// Children.` body section.
     * Computed from the type tree (`isChildAttribute`); independent of
     * whether the attribute lifted to a generic.
     */
    readonly isChild: boolean;
    /** Whether this attribute is optional (`optional: true` in the spec). */
    readonly isOptional: boolean;
}

export interface RenderAttributeOptions {
    /**
     * For self-referential nodes (e.g. `instructionNode.subInstructions`
     * referencing `instructionNode`), TypeScript rejects a generic default
     * that names the interface being declared. The renderer substitutes
     * an outside alias (`SelfFooNode`) for self-references in generic
     * constraints to break the cycle.
     */
    readonly selfAlias?: string | null;
    /**
     * Set of `${nodeKind}:${attribute}` keys whose data attribute should
     * be lifted to a generic param even though the spec classifies it as
     * data. Empty / omitted means the default "lift only children" rule
     * applies. The set is owned by the caller (typically a per-major
     * driver like `v1.ts`); the renderer never mutates it.
     */
    readonly narrowableDataAttributes?: ReadonlySet<string>;
}

export function renderAttribute(
    nodeKind: string,
    attr: AttributeSpec,
    ctx: RenderTypeExprContext,
    options: RenderAttributeOptions = {},
): AttributeRendering {
    const isOptional = attr.optional === true;
    const isChild = isChildAttribute(attr.type);
    const narrowable = options.narrowableDataAttributes ?? EMPTY_SET;
    const liftToGeneric = isChild || narrowable.has(`${nodeKind}:${attr.name}`);
    const typeFragment = renderTypeExpr(attr.type, ctx);
    // The interface body indents by 4 spaces; attribute JSDoc lives at
    // the same indent as the line it documents.
    const docPrefix = attr.docs ? renderJsDoc(attr.docs, '    ') : fragment``;
    const optionalMark = isOptional ? '?' : '';

    if (liftToGeneric) {
        const generic = genericParamName(attr.name);
        const baseFragment =
            options.selfAlias && typeExprReferencesKind(attr.type, nodeKind)
                ? renderTypeExprWithSelfAlias(attr.type, ctx, nodeKind, options.selfAlias)
                : typeFragment;
        const constraint = isOptional ? fragment`${baseFragment} | undefined` : baseFragment;
        const genericParam = fragment`${generic} extends ${constraint} = ${constraint}`;
        const bodyLine = fragment`${docPrefix}    readonly ${attr.name}${optionalMark}: ${generic};`;
        return { attributeName: attr.name, bodyLine, genericParam, isChild, isOptional };
    }

    const bodyLine = fragment`${docPrefix}    readonly ${attr.name}${optionalMark}: ${typeFragment};`;
    return { attributeName: attr.name, bodyLine, isChild, isOptional };
}

const EMPTY_SET: ReadonlySet<string> = new Set();

/** Convenience: produce a no-op `kind` discriminator line. */
export function renderKindLine(kind: string): Fragment {
    return fragment`    readonly kind: '${kind}';`;
}

// ---------------------------------------------------------------------------
// Self-reference handling
// ---------------------------------------------------------------------------

function typeExprReferencesKind(expr: TypeExpr, kind: string): boolean {
    switch (expr.kind) {
        case 'node':
            return expr.name === kind;
        case 'array':
            return typeExprReferencesKind(expr.of, kind);
        case 'tuple':
            return expr.items.some(item => typeExprReferencesKind(item, kind));
        default:
            return false;
    }
}

/**
 * Re-render a type expression substituting a `Self<Kind>Node` alias for
 * any direct self-reference, so the generic constraint doesn't refer to
 * the interface being declared.
 */
function renderTypeExprWithSelfAlias(
    expr: TypeExpr,
    ctx: RenderTypeExprContext,
    selfKind: string,
    selfAlias: string,
): Fragment {
    switch (expr.kind) {
        case 'node':
            if (expr.name === selfKind) return fragment`${selfAlias}`;
            // For non-self node references, fall through to the standard renderer.
            return renderTypeExpr(expr, ctx);
        case 'array': {
            const inner = renderTypeExprWithSelfAlias(expr.of, ctx, selfKind, selfAlias);
            return fragment`${inner}[]`;
        }
        case 'tuple': {
            // Not currently used for self-refs in any encoded node, but handled
            // for completeness.
            const items = expr.items.map(item => renderTypeExprWithSelfAlias(item, ctx, selfKind, selfAlias));
            const empty = items.length === 0;
            if (empty) return fragment`[]`;
            // Falls back to a naive comma-join for now.
            return fragment`[${joinFragments(items, ', ')}]`;
        }
        default:
            return renderTypeExpr(expr, ctx);
    }
}

function joinFragments(items: Fragment[], separator: string): Fragment {
    if (items.length === 0) return fragment``;
    return items.reduce((acc, item, i) => (i === 0 ? item : fragment`${acc}${separator}${item}`));
}
