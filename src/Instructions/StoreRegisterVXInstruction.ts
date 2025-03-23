import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Store number NN in register VX - 6XNN
 */
export class StoreRegisterVXInstruction extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0x6000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction[1]] = (instruction[2] << 4) | instruction[3];
    }
}