import { attribute, defineNode, stringIdentifier, union } from '../../../api';

export const pdaSeedValueNode = defineNode('pdaSeedValueNode', {
    docs: ['Pairs a PDA seed name with the value to substitute when deriving the PDA.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the seed being filled in.'],
        }),
        attribute('value', union('PdaSeedValueValue'), {
            docs: ['The value to substitute for the seed.'],
        }),
    ],
});
