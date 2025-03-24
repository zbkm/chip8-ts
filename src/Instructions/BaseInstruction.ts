import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";


export abstract class BaseInstruction {
    abstract mask: number;
    abstract value: number;

    /**
     * Determine if the instruction is appropriate for this class
     * @param instruction {Instruction} Instruction bytes
     */
    public matches(instruction: Instruction): boolean {
        return (this.mask & instruction.full) == this.value;
    };

    /**
     * Execute instruction
     * @param di {DI} Object with dependence
     * @param instruction {Instruction} Instruction bytes
     */
    public abstract execute(di: DI, instruction: Instruction): void;
}