import { attribute, boolean, defineNode, nestedTypeNode, optionalAttribute, union } from '../../../api';

export const optionTypeNode = defineNode('optionTypeNode', {
    docs: 'A value that may be present or absent (Some/None), with an explicit numeric prefix indicating presence.',
    attributes: [
        optionalAttribute('fixed', boolean(), {
            docs: 'When `true`, the absent variant still occupies the byte size of the present variant (zero-padded). Defaults to `false`.',
        }),
        attribute('item', union('TypeNode'), {
            docs: 'The type carried by the option when present.',
        }),
        attribute('prefix', nestedTypeNode('numberTypeNode'), {
            docs: 'The numeric type used as the presence flag.',
        }),
    ],
});
