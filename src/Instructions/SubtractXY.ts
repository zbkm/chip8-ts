import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Add the value of register VY to register VX
 * Set VF to 01 if a carry occurs
 * Set VF to 00 if a carry does not occur - 8XY5
 */
export class SubtractXY extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8005;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const minuend = di.vr.values[instruction.x];
        const subtrahend = di.vr.values[instruction.y];
        di.vr.values[instruction.x] = (minuend - subtrahend) & 0xFF;
        di.vr.values[0xF] = minuend >= subtrahend ? 0x1 : 0x0; // 1 for not occur and 0 for occur
    }
}