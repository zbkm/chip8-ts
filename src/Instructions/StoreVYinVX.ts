import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Store the value of register VY in register VX - 8XY0
 */
export class StoreVYinVX extends BaseInstruction {
    mask: number = 0xF00F;
    value: number = 0x8000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        di.vr.values[instruction[1]] = di.vr.values[instruction[2]];
    }
}