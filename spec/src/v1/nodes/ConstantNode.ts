import { attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../api';

export const constantNode = defineNode('constantNode', {
    docs: 'A named constant exposed by the program: a typed value associated with a name.',
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: 'The name of the constant.',
        }),
        optionalAttribute('docs', docs(), {
            docs: 'Markdown documentation for the constant.',
        }),
        attribute('type', union('TypeNode'), {
            docs: 'The type of the constant.',
        }),
        attribute('value', union('ValueNode'), {
            docs: 'The concrete value of the constant.',
        }),
    ],
});
