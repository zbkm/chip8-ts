import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Set VX to VX XOR VY - 8XY3
 */
export class BinaryXor extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8003;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction[1]] = di.vr.values[instruction[1]] ^ di.vr.values[instruction[2]];
    }
}