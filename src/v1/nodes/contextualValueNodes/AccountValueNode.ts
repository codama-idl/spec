import { attribute, defineNode, stringIdentifier } from '../../../api';
import { examples } from './AccountValueNode.examples';

export const accountValueNode = defineNode('accountValueNode', {
    docs: ['Refers to a named account in the surrounding instruction.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced account.'],
        }),
    ],
    examples,
});
