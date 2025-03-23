import {BaseInstruction} from "./BaseInstruction.ts";
import type {DI, Instruction} from "../types.ts";

/**
 * Skip the following instruction if the value of register VX is not equal to NN - 4XNN
 */
export class SkipIfVXNotEqualsNN extends BaseInstruction {
    mask: number = 0xF000;
    value: number = 0x4000;

    /**
     * @inheritDoc
     */
    execute(di: DI, instruction: Instruction): void {
        const vx = di.vr.values[instruction[1]];
        if (vx !== ((instruction[2] << 4) | instruction[3])) {
            di.pc.value += 2;
        }
    }
}