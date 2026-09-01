import { attribute, defineNode, stringIdentifier } from '../../../api';
import { examples } from './AccountBumpValueNode.examples';

export const accountBumpValueNode = defineNode('accountBumpValueNode', {
    docs: ['Refers to the bump seed of a named PDA-derived account in the surrounding instruction.'],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the account whose bump seed is referenced.'],
        }),
    ],
    examples,
});
