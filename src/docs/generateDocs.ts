import type { Spec } from '../api';
import { relativePageLink } from './links';
import { buildNavRegistry, hasOwnDirectory } from './navigation';
import {
    markdownRenderer,
    renderCategoryIndexPage,
    renderEnumPage,
    renderNestedUnionPage,
    renderNodePage,
    renderRootIndexPage,
    renderUnionPage,
} from './render';
import type { RenderCtx } from './render';
import type { DocModel, DocPage, DocRef } from './types';

/** Turns a Spec into a DocModel. */
export function generateDocs(spec: Spec): DocModel {
    const registry = buildNavRegistry(spec);
    function link(from: DocRef, to: DocRef): string {
        return relativePageLink(registry.lookup(from), registry.lookup(to));
    }
    const ctx: RenderCtx = { markup: markdownRenderer, registry, link };

    const pages: DocPage[] = [];
    for (const category of spec.categories) {
        for (const node of category.nodes) {
            pages.push(renderNodePage(node, ctx));
        }
        for (const union of category.unions) {
            pages.push(renderUnionPage(union, ctx));
        }
        for (const nestedUnion of category.nestedUnions) {
            pages.push(renderNestedUnionPage(nestedUnion, ctx));
        }
        for (const enumeration of category.enumerations) {
            pages.push(renderEnumPage(enumeration, ctx));
        }
        if (hasOwnDirectory(category)) {
            // topLevel shares the root index
            pages.push(renderCategoryIndexPage(category, ctx));
        }
    }
    pages.push(renderRootIndexPage(spec, ctx));

    return { pages };
}
