import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Jump to address NNN - 1NNN
 */
export class Jump extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0x1000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.pc = instruction.nnn;
    }
}