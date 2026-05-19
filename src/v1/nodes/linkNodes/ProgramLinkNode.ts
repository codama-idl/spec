import { attribute, defineNode, stringIdentifier } from '../../../api';

export const programLinkNode = defineNode('programLinkNode', {
    docs: ['A reference to a program by name.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced program.'],
        }),
    ],
});
