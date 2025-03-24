import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Add the value NN to register VX - 7XNN
 */
export class AddToRegister extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0x7000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction.x] = (
            di.vr.values[instruction.x] + instruction.nn
        ) & 0xFF;
    }
}