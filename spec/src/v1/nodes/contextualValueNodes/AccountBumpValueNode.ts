import { attribute, defineNode, stringIdentifier } from '../../../api';

export const accountBumpValueNode = defineNode('accountBumpValueNode', {
    docs: 'Refers to the bump seed of a named PDA-derived account in the surrounding instruction.',
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: 'The name of the account whose bump seed is referenced.',
        }),
    ],
});
