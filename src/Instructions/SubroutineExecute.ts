import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Execute subroutine starting at address NNN - 2NNN
 */
export class SubroutineExecute extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0x2000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.stack.push(di.pc.value);
        di.pc.value = (instruction[1] << 8) | (instruction[2] << 4) | instruction[3];
    }
}