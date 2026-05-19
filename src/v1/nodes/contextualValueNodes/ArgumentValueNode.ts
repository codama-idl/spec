import { attribute, defineNode, stringIdentifier } from '../../../api';

export const argumentValueNode = defineNode('argumentValueNode', {
    docs: ['Refers to a named argument of the surrounding instruction.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced argument.'],
        }),
    ],
});
