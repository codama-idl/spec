import { array, attribute, defineNode, node, optionalAttribute, union } from '../../../api';

export const pdaValueNode = defineNode('pdaValueNode', {
    docs: ['Resolves to a PDA derived from a list of seed values.'],
    attributes: [
        attribute('pda', union('PdaValuePda'), {
            docs: ['The PDA being derived — either a link to a defined PDA or an inline `pdaNode`.'],
        }),
        attribute('seeds', array(node('pdaSeedValueNode')), {
            docs: ['The seed values used to derive the PDA, paired with their seed names.'],
        }),
        optionalAttribute('programId', union('PdaValueProgramId'), {
            docs: ['The program ID used to derive the PDA. When omitted, the PDA\u2019s declared program is used.'],
        }),
    ],
});
