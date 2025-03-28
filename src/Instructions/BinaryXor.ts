import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        const binaryXorResult = di.vr.get(instruction.x) ^ di.vr.get(instruction.y);
        di.vr.set(instruction.x, binaryXorResult);
    }
}