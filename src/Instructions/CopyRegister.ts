import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Store the value of register VY in register VX - 8XY0
 */
export class CopyRegister extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction.x] = di.vr.values[instruction.y];
    }
}