import { attribute, defineNode, union } from '../../../api';

export const constantValueNode = defineNode('constantValueNode', {
    docs: 'A typed constant: a type node paired with a concrete value node.',
    attributes: [
        attribute('type', union('TypeNode'), {
            docs: 'The type of the constant.',
        }),
        attribute('value', union('ValueNode'), {
            docs: 'The concrete value of the constant.',
        }),
    ],
});
