import { attribute, defineNode, node, optionalAttribute, stringIdentifier } from '../../../api';

export const definedTypeLinkNode = defineNode('definedTypeLinkNode', {
    docs: ['A reference to a defined type — possibly in a different program.'],
    attributes: [
        optionalAttribute('program', node('programLinkNode'), {
            docs: ['The program the referenced type is defined in. When omitted, the surrounding program is assumed.'],
        }),
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced defined type.'],
        }),
    ],
});
