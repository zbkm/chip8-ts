import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

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
        di.pc.value = (instruction[1] << 8) | (instruction[2] << 4) | instruction[3];
    }
}