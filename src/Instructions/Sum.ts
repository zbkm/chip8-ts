import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

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
        const result = di.vr.get(instruction.x) + di.vr.get(instruction.y);
        const sumResult = result & 0xFF;
        const isOccur = result > 0xFF ? 0x1 : 0x0; // 0 for not occur and 1 for occur

        di.vr.set(instruction.x, sumResult);
        di.vr.set(0xF, isOccur);
    }
}