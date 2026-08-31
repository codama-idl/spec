import { attribute, defineNode, stringIdentifier } from '../../../api';
import { examples } from './ProgramLinkNode.examples';

export const programLinkNode = defineNode('programLinkNode', {
    docs: ['A reference to a program by name.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the referenced program.'],
        }),
    ],
    examples,
});
