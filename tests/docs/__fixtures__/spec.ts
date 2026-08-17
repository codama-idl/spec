import {
    attribute,
    defineCategory,
    defineEnumeration,
    defineNestedUnion,
    defineNode,
    defineUnion,
    node,
    string,
    union,
    variant,
} from '../../../src/api';
import type { Spec } from '../../../src/api';

const numberTypeNode = defineNode('numberTypeNode', {
    docs: ['A number type.'],
    attributes: [attribute('format', string())],
});
const typeNode = defineUnion('typeNode', { members: [node('numberTypeNode')] });
const nestedTypeNode = defineNestedUnion('nestedTypeNode', { base: union('typeNode'), wrappers: ['numberTypeNode'] });
const constantPdaSeedNode = defineNode('constantPdaSeedNode', { attributes: [attribute('value', string())] });
const pdaSeedNode = defineUnion('pdaSeedNode', { members: [node('constantPdaSeedNode')] });
const numberFormat = defineEnumeration('numberFormat', { variants: [variant('u8'), variant('u16')] });
const pdaNode = defineNode('pdaNode', { attributes: [attribute('name', string())] });
const programNode = defineNode('programNode', { attributes: [] });
const helperUnion = defineUnion('helperUnion', { members: [node('pdaNode')] });

export const typeCategory = defineCategory('type', {
    nodes: [numberTypeNode],
    unions: [typeNode],
    nestedUnions: [nestedTypeNode],
});
export const pdaSeedCategory = defineCategory('pdaSeed', { nodes: [constantPdaSeedNode], unions: [pdaSeedNode] });
export const sharedCategory = defineCategory('shared', { enumerations: [numberFormat] });
// nodes are intentionally out of alphabetical order to exercise within-group sorting
export const topLevelCategory = defineCategory('topLevel', { nodes: [programNode, pdaNode], unions: [helperUnion] });

export const SPEC: Spec = {
    version: '1.7.0',
    categories: [typeCategory, pdaSeedCategory, sharedCategory, topLevelCategory],
};
