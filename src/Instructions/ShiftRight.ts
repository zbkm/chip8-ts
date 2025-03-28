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
        const value = di.vr.get(instruction.y);
        const shiftedResult = value >> 1;
        const shiftedBit = value & 1; // bit shifted out - LSb

        di.vr.set(instruction.x, shiftedResult);
        di.vr.set(0xF, shiftedBit);
    }
}