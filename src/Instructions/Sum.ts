import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Add the value of register VY to register VX
 * Set VF to 01 if a carry occurs
 * Set VF to 00 if a carry does not occur - 8XY4
 */
export class Sum extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8004;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const result = di.vr.values[instruction[1]] + di.vr.values[instruction[2]];
        di.vr.values[instruction[1]] = result & 0xFF;
        di.vr.values[0xF] = result > 0xFF ? 0x1 : 0x0;  // 0 for not occur and 1 for occur
    }
}