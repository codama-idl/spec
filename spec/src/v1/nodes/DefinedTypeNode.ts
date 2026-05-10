import { attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../api';

export const definedTypeNode = defineNode('definedTypeNode', {
    docs: ['A reusable named type that can be referenced by `definedTypeLinkNode` from elsewhere in the IDL.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the defined type.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the type.'],
        }),
        attribute('type', union('TypeNode'), {
            docs: ['The type definition.'],
        }),
    ],
});
