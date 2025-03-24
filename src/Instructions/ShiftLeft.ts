import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        const value = di.vr.values[instruction.y];
        di.vr.values[instruction.x] = (value << 1) & 0xFF;
        di.vr.values[0xF] = (value & 0x80) ? 1 : 0; // shifted bit. 0x80 - 0b10000000 - MSb
    }
}