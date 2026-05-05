import { array, attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../api';

export const eventNode = defineNode('eventNode', {
    docs: 'A program event: its data shape and optional discriminators used to identify it on the wire.',
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: 'The name of the event.',
        }),
        optionalAttribute('docs', docs(), {
            docs: 'Markdown documentation for the event.',
        }),
        attribute('data', union('TypeNode'), {
            docs: 'The type describing the event payload.',
        }),
        optionalAttribute('discriminators', array(union('DiscriminatorNode')), {
            docs: 'Discriminators that distinguish this event from others. When multiple are listed, they are combined with a logical AND.',
        }),
    ],
});
