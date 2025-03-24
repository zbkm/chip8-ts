import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Add the value stored in register VX to register I - FX1E
 */
export class AddToIndex extends BaseInstruction {
    mask: number = 0xF0FF;
    value: number = 0xF01E;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.ir.value = (
            di.vr.values[instruction[1]] + di.ir.value
        ) & 0xFFFF;
        // COSMAC VIP dont set VF on overflow
    }
}