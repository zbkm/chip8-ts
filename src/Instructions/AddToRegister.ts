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
        const registerValue = (
            di.vr.get(instruction.x) + instruction.nn
        ) & 0xFF;
        di.vr.set(instruction.x, registerValue);
    }
}