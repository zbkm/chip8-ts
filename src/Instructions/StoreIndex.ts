import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Store memory address NNN in register I - ANNN
 */
export class StoreIndex extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0xA000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.ir.value = (instruction[1] << 8) | (instruction[2] << 4) | instruction[3];
    }
}