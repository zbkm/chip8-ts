import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        di.ir.value = instruction.nnn;
    }
}