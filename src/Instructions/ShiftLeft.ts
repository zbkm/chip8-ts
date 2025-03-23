import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Store the value of register VY shifted left one bit in register VX
 * Set register VF to the most significant bit prior to the shift
 * VY is unchanged - 8XYE
 */
export class ShiftLeft extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x800E;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[0xF] = (di.vr.values[instruction[2]] & 0x80) ? 1 : 0; // shifted bit. 0x80 - 0b10000000 - MSb
        di.vr.values[instruction[1]] = (di.vr.values[instruction[2]] << 1) & 0xFF;
    }
}