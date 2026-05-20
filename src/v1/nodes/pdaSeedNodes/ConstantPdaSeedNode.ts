import { attribute, defineNode, union } from '../../../api';

export const constantPdaSeedNode = defineNode('constantPdaSeedNode', {
    docs: ['A PDA seed with a constant value (e.g. a UTF-8 string or a fixed byte sequence).'],
    attributes: [
        attribute('type', union('typeNode'), {
            docs: ['The type of the seed value.'],
        }),
        attribute('value', union('constantPdaSeedValue'), {
            docs: ['The constant value to use as the seed — either a literal value or the program ID placeholder.'],
        }),
    ],
});
