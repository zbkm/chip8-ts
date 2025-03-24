import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Set VX to VX AND VY - 8XY2
 */
export class BinaryAnd extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8002;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction.x] = di.vr.values[instruction.x] & di.vr.values[instruction.y];
    }
}