import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Store the value of register VY shifted right one bit in register VX
 * Set register VF to the least significant bit prior to the shift
 * VY is unchanged - 8XY6
 */
export class ShiftRight extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8006;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[0xF] = di.vr.values[instruction[2]] & 1; // bit shifted out - LSb
        di.vr.values[instruction[1]] = di.vr.values[instruction[2]] >> 1;
    }
}