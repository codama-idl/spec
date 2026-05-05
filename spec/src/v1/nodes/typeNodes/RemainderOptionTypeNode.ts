import { attribute, defineNode, union } from '../../../api';

export const remainderOptionTypeNode = defineNode('remainderOptionTypeNode', {
    docs: 'A value that may be present or absent. Presence is signalled by whether any bytes remain to be read, with no explicit prefix.',
    attributes: [
        attribute('item', union('TypeNode'), {
            docs: 'The type carried by the option when present.',
        }),
    ],
});
