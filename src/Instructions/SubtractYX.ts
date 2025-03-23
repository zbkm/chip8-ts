import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Set register VX to the value of VY minus VX
 * Set VF to 00 if a borrow occurs
 * Set VF to 01 if a borrow does not occur - 8XY7
 */
export class SubtractYX extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8007;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const minuend = di.vr.values[instruction[2]];
        const subtrahend = di.vr.values[instruction[1]];
        di.vr.values[0xF] = minuend > subtrahend ? 0x1 : 0x0; // 1 for not occur and 0 for occur
        di.vr.values[instruction[1]] = (minuend - subtrahend) & 0xFF;
    }
}