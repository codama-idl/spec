import { attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../../api';
import { examples } from './VariablePdaSeedNode.examples';

export const variablePdaSeedNode = defineNode('variablePdaSeedNode', {
    docs: ['A PDA seed whose value is provided at derivation time, identified by name.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the seed variable.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the seed variable.'],
        }),
        attribute('type', union('typeNode'), {
            docs: ['The expected type of the seed value.'],
        }),
    ],
    examples,
});
