import { attribute, boolean, defineNode, nestedUnion, optionalAttribute, union } from '../../../api';
import { examples } from './OptionTypeNode.examples';

export const optionTypeNode = defineNode('optionTypeNode', {
    docs: ['A value that may be present or absent (Some/None), with an explicit numeric prefix indicating presence.'],
    attributes: [
        optionalAttribute('fixed', boolean(), {
            docs: [
                'When `true`, the absent variant still occupies the byte size of the present variant (zero-padded). Defaults to `false`.',
                'Must only be set to `true` when the `item` type is of fixed size.',
            ],
        }),
        attribute('item', union('typeNode'), {
            docs: ['The type carried by the option when present.'],
        }),
        attribute('prefix', nestedUnion('nestedTypeNode', 'numberTypeNode'), {
            docs: [
                'The numeric type used as the presence flag.',
                'A prefix value of `1` means the item is present and follows the prefix; a value of `0` means the item is absent and nothing further is serialised.',
            ],
        }),
    ],
    examples,
});
