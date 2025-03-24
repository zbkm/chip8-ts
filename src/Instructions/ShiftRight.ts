import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        const value = di.vr.values[instruction.y];
        di.vr.values[instruction.x] = value >> 1;
        di.vr.values[0xF] = value & 1; // bit shifted out - LSb
    }
}