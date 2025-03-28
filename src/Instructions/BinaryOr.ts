import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Set VX to VX OR VY - 8XY1
 */
export class BinaryOr extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8001;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const binaryOrResult = di.vr.get(instruction.x) | di.vr.get(instruction.y);
        di.vr.set(instruction.x, binaryOrResult);
    }
}