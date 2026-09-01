import { attribute, defineNode, stringIdentifier, union } from '../../../api';
import { examples } from './PdaSeedValueNode.examples';

export const pdaSeedValueNode = defineNode('pdaSeedValueNode', {
    docs: ['Pairs a PDA seed name with the value to substitute when deriving the PDA.'],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the seed being filled in — a `variablePdaSeedNode` of the PDA definition.'],
        }),
        attribute('value', union('pdaSeedValueValue'), {
            docs: ['The value to substitute for the seed.'],
        }),
    ],
    examples,
});
