import type {DI, Instruction} from "../types.ts";


export abstract class BaseInstruction {
    abstract mask: number;
    abstract value: number;

    /**
     * Determine if the instruction is appropriate for this class
     * @param instruction {Instruction} Instruction bytes
     */
    public matches(instruction: Instruction): boolean {
        const fullInstruction = instruction.reduce((acc, byte) => (acc << 4) | byte, 0);
        return (this.mask & fullInstruction) == this.value;
    };

    /**
     * Execute instruction
     * @param di {DI} Object with dependence
     * @param instruction {Instruction} Instruction bytes
     */
    public abstract execute(di: DI, instruction: Instruction): void;
}