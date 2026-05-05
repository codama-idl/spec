/**
 * Render a `NodeSpec` to a `Fragment` containing the full
 * `export interface <Name> { … }` declaration plus accumulated imports.
 *
 * Self-referential nodes (whose attributes reference the same kind being
 * declared) need a small dance: TypeScript rejects a generic default that
 * refers to the interface being declared (`TX extends FooNode[] = FooNode[]`
 * inside `interface FooNode<TX>`). The fix is a type alias outside the
 * interface (`type SelfFooNode = FooNode;`) used in the constraint and
 * default.
 */

import { type AttributeSpec, isChildAttribute, type NodeSpec, type TypeExpr } from '@codama/spec';
import { type Fragment, fragment, mergeFragments } from '@codama-internal/fragment';

import type { Layout, Location } from './layout';
import { pascalCase } from './naming';
import { type AttributeRendering, renderAttribute, renderKindLine } from './renderAttribute';
import { renderJsDoc } from './renderDocs';

export interface RenderNodeOptions {
    readonly layout: Layout;
    readonly currentLocation: Location;
    /**
     * Forwarded to `renderAttribute`. See its docs.
     */
    readonly narrowableDataAttributes?: ReadonlySet<string>;
    /**
     * Per-node override of the generic-parameter emission order. Keys are
     * node kinds; values list the source attribute names whose generic
     * params should appear in this exact order. The renderer asserts the
     * override's set equals the set of attributes the spec actually lifts
     * for the node — neither more nor fewer — otherwise the override is
     * out of sync and we throw rather than silently drop generics.
     */
    readonly genericParamOrder?: ReadonlyMap<string, readonly string[]>;
}

export function renderNode(node: NodeSpec, options: RenderNodeOptions): Fragment {
    const interfaceName = pascalCase(node.kind);
    const selfAlias = isSelfReferential(node) ? `Self${interfaceName}` : null;
    const renderedAttrs: AttributeRendering[] = node.attributes.map(attr =>
        renderAttribute(node.kind, attr, options, {
            narrowableDataAttributes: options.narrowableDataAttributes,
            selfAlias,
        }),
    );

    const liftedAttrs = renderedAttrs.filter(r => r.genericParam !== undefined);
    const orderedGenerics = orderGenerics(node.kind, liftedAttrs, options.genericParamOrder);
    const genericsBlock = renderGenericsBlock(orderedGenerics);

    const dataLines = renderedAttrs.filter(r => !r.isChild).map(r => r.bodyLine);
    const childLines = renderedAttrs.filter(r => r.isChild).map(r => r.bodyLine);
    const bodyLines: Fragment[] = [renderKindLine(node.kind)];
    if (dataLines.length > 0) {
        bodyLines.push(fragment``);
        bodyLines.push(fragment`    // Data.`);
        bodyLines.push(...dataLines);
    }
    if (childLines.length > 0) {
        bodyLines.push(fragment``);
        bodyLines.push(fragment`    // Children.`);
        bodyLines.push(...childLines);
    }
    const body = mergeFragments(bodyLines, parts => parts.join('\n'));

    const aliasPrefix = selfAlias ? fragment`type ${selfAlias} = ${interfaceName};\n\n` : fragment``;
    const docComment = node.docs ? renderJsDoc(node.docs) : fragment``;
    return fragment`${aliasPrefix}${docComment}export interface ${interfaceName}${genericsBlock} {\n${body}\n}\n`;
}

/**
 * Apply the per-node generic-emission order from `genericParamOrder`.
 * The override's set of attribute names must equal the lifted set
 * exactly — neither more nor fewer — otherwise the override is out of
 * sync with the spec and we throw rather than silently drop generics.
 */
function orderGenerics(
    nodeKind: string,
    liftedAttrs: AttributeRendering[],
    genericParamOrder: ReadonlyMap<string, readonly string[]> | undefined,
): Fragment[] {
    const override = genericParamOrder?.get(nodeKind);
    if (!override) {
        return liftedAttrs.map(r => r.genericParam!);
    }
    const byAttribute = new Map(liftedAttrs.map(r => [r.attributeName, r.genericParam!]));
    const overrideSet = new Set(override);
    const liftedSet = new Set(byAttribute.keys());
    const missingFromOverride = [...liftedSet].filter(n => !overrideSet.has(n));
    const unknownInOverride = override.filter(n => !liftedSet.has(n));
    if (missingFromOverride.length > 0 || unknownInOverride.length > 0) {
        const parts: string[] = [];
        if (missingFromOverride.length > 0) {
            parts.push(`missing lifted attribute(s) ${JSON.stringify(missingFromOverride)}`);
        }
        if (unknownInOverride.length > 0) {
            parts.push(`unknown attribute(s) ${JSON.stringify(unknownInOverride)}`);
        }
        throw new Error(`genericParamOrder for "${nodeKind}" is out of sync with the spec: ${parts.join('; ')}.`);
    }
    return override.map(name => byAttribute.get(name)!);
}

function renderGenericsBlock(generics: Fragment[]): Fragment {
    if (generics.length === 0) return fragment``;
    return mergeFragments(generics, parts => {
        const indented = parts.map(p => `    ${p},`).join('\n');
        return `<\n${indented}\n>`;
    });
}

/**
 * A node is self-referential when any child attribute's type tree contains
 * a `node` reference matching the node's own kind.
 */
function isSelfReferential(node: NodeSpec): boolean {
    return node.attributes.some(attr => isChildAttribute(attr.type) && typeExprReferencesKind(attr.type, node.kind));
}

function typeExprReferencesKind(expr: TypeExpr, kind: string): boolean {
    switch (expr.kind) {
        case 'node':
            return expr.name === kind;
        case 'array':
            return typeExprReferencesKind(expr.of, kind);
        case 'tuple':
            return expr.items.some(item => typeExprReferencesKind(item, kind));
        // `union` and `nestedTypeNode` could in principle resolve to self,
        // but in practice they always go through a named alias that breaks
        // the circular dependency chain on the TS side.
        default:
            return false;
    }
}

// Re-export for downstream consumers (e.g. tests, alternative drivers).
export type { AttributeSpec };
