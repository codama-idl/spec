/**
 * Render a `TypeExpr` to a `Fragment` containing the corresponding TS
 * type expression text and any imports it depends on.
 */

import type { TypeExpr } from '@codama/spec';
import { type Fragment, fragment, mergeFragments, use } from '@codama-internal/fragment';

import { type Layout, type Location, relativeImportPath } from './layout';

export interface RenderTypeExprContext {
    readonly layout: Layout;
    /** Location of the current file relative to `generated/` (no extension). */
    readonly currentLocation: Location;
}

export function renderTypeExpr(expr: TypeExpr, ctx: RenderTypeExprContext): Fragment {
    switch (expr.kind) {
        case 'string':
            return renderStringExpr(expr, ctx);
        case 'integer':
        case 'float':
            return fragment`number`;
        case 'boolean':
            return fragment`boolean`;
        case 'literal':
            return fragment`${literalToTs(expr.value)}`;
        case 'literalUnion':
            return fragment`${renderLiteralUnion(expr.values)}`;
        case 'codamaVersion':
            return importNamed(ctx, 'CodamaVersion', ctx.layout.sharedLocations.codamaVersion, { typeOnly: true });
        case 'docs':
            return importNamed(ctx, 'Docs', ctx.layout.sharedLocations.docs, { typeOnly: true });
        case 'enumeration': {
            const target = ctx.layout.enumerationNameToLocation.get(expr.name);
            if (!target) throw new Error(`renderTypeExpr: unknown enumeration "${expr.name}"`);
            return importNamed(ctx, expr.name, target, { typeOnly: true });
        }
        case 'node': {
            const target = ctx.layout.nodeKindToLocation.get(expr.name);
            if (!target) throw new Error(`renderTypeExpr: unknown node kind "${expr.name}"`);
            return importNamed(ctx, kindToInterfaceName(expr.name), target, { typeOnly: true });
        }
        case 'union': {
            const target = ctx.layout.unionNameToLocation.get(expr.name);
            if (!target) throw new Error(`renderTypeExpr: unknown union "${expr.name}"`);
            return importNamed(ctx, expr.name, target, { typeOnly: true });
        }
        case 'nestedUnion': {
            const innerTarget = ctx.layout.nodeKindToLocation.get(expr.name);
            if (!innerTarget) throw new Error(`renderTypeExpr: unknown nestedUnion target "${expr.name}"`);
            const aliasTarget = ctx.layout.nestedUnionNameToLocation.get(expr.alias);
            if (!aliasTarget) throw new Error(`renderTypeExpr: unknown nestedUnion alias "${expr.alias}"`);
            const wrapper = importNamed(ctx, expr.alias, aliasTarget, { typeOnly: true });
            const inner = importNamed(ctx, kindToInterfaceName(expr.name), innerTarget, { typeOnly: true });
            return fragment`${wrapper}<${inner}>`;
        }
        case 'array': {
            // Emit the long form `Array<T>` rather than `T[]`: it's
            // unambiguous regardless of `T`'s shape, so an inline-union
            // element like `array(literalUnion(true, false))` doesn't
            // need extra parens to preserve precedence.
            const inner = renderTypeExpr(expr.of, ctx);
            return fragment`Array<${inner}>`;
        }
        case 'tuple': {
            if (expr.items.length === 0) return fragment`[]`;
            const items = expr.items.map(item => renderTypeExpr(item, ctx));
            return mergeFragments(items, parts => `[${parts.join(', ')}]`);
        }
    }
}

/**
 * Render a `literalUnion`'s values as a `|`-separated TS expression.
 *
 * When both `true` and `false` are present, collapse them to `boolean`
 * (placed at the start) and append the remaining literals after. This is
 * a TS-only readability normalisation; the encoded spec keeps the explicit
 * `true | false` representation so other codegen targets (e.g. Rust) can
 * still emit a 3-variant enum if they prefer.
 */
function renderLiteralUnion(values: readonly (boolean | number | string)[]): string {
    const hasTrue = values.includes(true);
    const hasFalse = values.includes(false);
    if (hasTrue && hasFalse) {
        const rest = values.filter(v => v !== true && v !== false).map(literalToTs);
        return ['boolean', ...rest].join(' | ');
    }
    return values.map(literalToTs).join(' | ');
}

function renderStringExpr(expr: Extract<TypeExpr, { kind: 'string' }>, ctx: RenderTypeExprContext): Fragment {
    if (!expr.constraint) return fragment`string`;
    if (expr.constraint === 'identifier') {
        return importNamed(ctx, 'CamelCaseString', ctx.layout.sharedLocations.camelCaseString, { typeOnly: true });
    }
    if (expr.constraint === 'version') {
        return importNamed(ctx, 'Version', ctx.layout.sharedLocations.version, { typeOnly: true });
    }
    return fragment`string`;
}

interface ImportOptions {
    readonly typeOnly?: boolean;
}

function importNamed(
    ctx: RenderTypeExprContext,
    identifier: string,
    targetLocation: Location,
    options: ImportOptions = {},
): Fragment {
    if (targetLocation === ctx.currentLocation) {
        // Same file — no import needed; just reference the identifier.
        return fragment`${identifier}`;
    }
    const path = relativeImportPath(ctx.currentLocation, targetLocation);
    const importInput = options.typeOnly ? `type ${identifier}` : identifier;
    return use(importInput, path);
}

function literalToTs(value: boolean | number | string): string {
    if (typeof value === 'string') return tsStringLiteral(value);
    return String(value);
}

/**
 * Render an arbitrary string as a single-quoted TypeScript string literal,
 * escaping every character that would otherwise terminate the literal,
 * trip the parser, or render as something other than its source form.
 *
 * Handles the full ASCII control range plus backslash, single quote, and
 * line/paragraph separators — the latter two being valid TS identifier
 * terminators that would silently break a single-line string literal.
 */
export function tsStringLiteral(value: string): string {
    let out = "'";
    for (const char of value) {
        const code = char.codePointAt(0)!;
        if (char === '\\') out += '\\\\';
        else if (char === "'") out += "\\'";
        else if (char === '\n') out += '\\n';
        else if (char === '\r') out += '\\r';
        else if (char === '\t') out += '\\t';
        else if (char === '\b') out += '\\b';
        else if (char === '\f') out += '\\f';
        else if (char === '\v') out += '\\v';
        else if (char === '\0') out += '\\0';
        else if (code === 0x2028) out += '\\u2028';
        else if (code === 0x2029) out += '\\u2029';
        else if (code < 0x20 || code === 0x7f) out += `\\x${code.toString(16).padStart(2, '0')}`;
        else out += char;
    }
    out += "'";
    return out;
}

function kindToInterfaceName(kind: string): string {
    return kind.charAt(0).toUpperCase() + kind.slice(1);
}
