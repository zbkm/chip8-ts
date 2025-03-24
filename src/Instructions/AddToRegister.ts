import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

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
        di.vr.values[instruction[1]] = (
            di.vr.values[instruction[1]] + ((instruction[2] << 4) | instruction[3])
        ) & 0xFF;
    }
}