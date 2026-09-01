import {
    address,
    array,
    attribute,
    defineNode,
    docs,
    node,
    optionalAttribute,
    stringIdentifier,
    stringVersion,
} from '../../api';
import { examples } from './ProgramNode.examples';

export const programNode = defineNode('programNode', {
    docs: [
        'A Solana program: its identity, version, accounts, instructions, defined types, PDAs, events, errors, and constants.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/37ec38ea-66df-4c08-81c3-822ef4388580)',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the program.'],
        }),
        attribute('publicKey', address(), {
            docs: ['The base58-encoded program ID.'],
        }),
        attribute('version', stringVersion(), {
            docs: ['The version of the program, in semver form.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the program.'],
        }),
        attribute('accounts', array(node('accountNode')), {
            docs: ['The accounts owned by the program.'],
        }),
        attribute('instructions', array(node('instructionNode')), {
            docs: ['The instructions exposed by the program.'],
        }),
        attribute('definedTypes', array(node('definedTypeNode')), {
            docs: ['The reusable types defined by the program.'],
        }),
        attribute('pdas', array(node('pdaNode')), {
            docs: ['The PDAs derived by the program.'],
        }),
        attribute('events', array(node('eventNode')), {
            docs: ['The events emitted by the program.'],
        }),
        attribute('errors', array(node('errorNode')), {
            docs: ['The errors returned by the program.'],
        }),
        attribute('constants', array(node('constantNode')), {
            docs: ['The constants exposed by the program.'],
        }),
    ],
    examples,
});
