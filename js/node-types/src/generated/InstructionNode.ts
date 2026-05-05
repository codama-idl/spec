import type { DiscriminatorNode } from './discriminatorNodes/DiscriminatorNode';
import type { InstructionAccountNode } from './InstructionAccountNode';
import type { InstructionArgumentNode } from './InstructionArgumentNode';
import type { InstructionByteDeltaNode } from './InstructionByteDeltaNode';
import type { InstructionRemainingAccountsNode } from './InstructionRemainingAccountsNode';
import type { InstructionStatusNode } from './InstructionStatusNode';
import type { CamelCaseString } from './shared/brands';
import type { OptionalAccountStrategy } from './shared/optionalAccountStrategy';

type SelfInstructionNode = InstructionNode;

/** A program instruction: its accounts, arguments, byte-delta hints, discriminators, optional status, and optional sub-instructions. */
export interface InstructionNode<
    TAccounts extends InstructionAccountNode[] = InstructionAccountNode[],
    TArguments extends InstructionArgumentNode[] = InstructionArgumentNode[],
    TExtraArguments extends InstructionArgumentNode[] | undefined = InstructionArgumentNode[] | undefined,
    TRemainingAccounts extends InstructionRemainingAccountsNode[] | undefined =
        | InstructionRemainingAccountsNode[]
        | undefined,
    TByteDeltas extends InstructionByteDeltaNode[] | undefined = InstructionByteDeltaNode[] | undefined,
    TDiscriminators extends DiscriminatorNode[] | undefined = DiscriminatorNode[] | undefined,
    TSubInstructions extends SelfInstructionNode[] | undefined = SelfInstructionNode[] | undefined,
    TStatus extends InstructionStatusNode | undefined = InstructionStatusNode | undefined,
> {
    readonly kind: 'instructionNode';

    // Data.
    /** The name of the instruction. */
    readonly name: CamelCaseString;
    /** Markdown documentation for the instruction. */
    readonly docs?: string[];
    /** How absent optional accounts are represented when serialising the instruction. */
    readonly optionalAccountStrategy?: OptionalAccountStrategy;

    // Children.
    /** The accounts the instruction operates on, in order. */
    readonly accounts: TAccounts;
    /** The serialised arguments of the instruction, in order. */
    readonly arguments: TArguments;
    /** Additional arguments exposed in the generated client API but not serialised on the wire. */
    readonly extraArguments?: TExtraArguments;
    /** Variable-length tails of accounts appended after the named account slots. */
    readonly remainingAccounts?: TRemainingAccounts;
    /** Byte-size adjustments applied when computing rent or buffer size — for instructions that resize accounts. */
    readonly byteDeltas?: TByteDeltas;
    /** Discriminators that distinguish this instruction from others. When multiple are listed, they are combined with a logical AND. */
    readonly discriminators?: TDiscriminators;
    /** The lifecycle status of the instruction. */
    readonly status?: TStatus;
    /** Inner instructions invoked through CPI as part of executing this instruction. */
    readonly subInstructions?: TSubInstructions;
}
