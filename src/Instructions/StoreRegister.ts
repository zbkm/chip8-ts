import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI} from "../types.ts";
import type {Instruction} from "../Instruction.ts";

/**
 * Store number NN in register VX - 6XNN
 */
export class StoreRegister extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0x6000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction.x] = instruction.nn;
    }
}