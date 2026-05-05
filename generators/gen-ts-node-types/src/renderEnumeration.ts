/**
 * Render an `EnumerationSpec` as a TS string-literal union alias plus, when
 * present, JSDoc covering the alias and each variant.
 *
 * Produces a self-contained body fragment (no external imports needed).
 */

import type { EnumerationSpec, EnumerationVariantSpec } from '@codama/spec';
import { type Fragment, fragment } from '@codama-internal/fragment';

import { renderJsDoc } from './renderDocs';
import { tsStringLiteral } from './renderTypeExpr';

export function renderEnumeration(enumeration: EnumerationSpec): Fragment {
    const sortedVariants = [...enumeration.variants].sort((a, b) => a.name.localeCompare(b.name));
    const variantsBlock = renderVariantsBlock(sortedVariants);
    const docComment = enumeration.docs ? renderJsDoc(enumeration.docs) : fragment``;
    return fragment`${docComment}export type ${enumeration.name} =\n${variantsBlock};\n`;
}

function renderVariantsBlock(variants: readonly EnumerationVariantSpec[]): Fragment {
    const body = variants
        .map(v => {
            const value = tsStringLiteral(v.name);
            if (v.docs) {
                // `renderJsDoc` returns a fragment that already ends in a
                // newline; we drop it via `trimEnd()` so the variant body
                // joins cleanly with `\n` below.
                const docLine = renderJsDoc(v.docs, '    ').content.trimEnd();
                return `${docLine}\n    | ${value}`;
            }
            return `    | ${value}`;
        })
        .join('\n');
    return fragment`${body}`;
}
