import { attribute, defineNode, stringIdentifier } from '../../../api';
import { examples } from './ArgumentValueNode.examples';

export const argumentValueNode = defineNode('argumentValueNode', {
    docs: ['Refers to a named argument of the surrounding instruction.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced argument.'],
        }),
    ],
    examples,
});
