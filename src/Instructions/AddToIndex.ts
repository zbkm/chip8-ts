import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        di.ir = (
            di.vr.get(instruction.x) + di.ir
        ) & 0xFFFF;
        // COSMAC VIP dont set VF on overflow
    }
}