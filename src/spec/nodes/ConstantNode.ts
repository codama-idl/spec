import { attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../api';
import { examples } from './ConstantNode.examples';

export const constantNode = defineNode('constantNode', {
    docs: ['A named constant exposed by the program: a typed value associated with a name.'],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the constant.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the constant.'],
        }),
        attribute('type', union('typeNode'), {
            docs: ['The type of the constant.'],
        }),
        attribute('value', union('valueNode'), {
            docs: ['The concrete value of the constant.'],
        }),
    ],
    examples,
});
